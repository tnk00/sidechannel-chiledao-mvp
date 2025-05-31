<template>
  <section class="section">
    <div class="container">
      <SectionHeader :breadcrumbs="breadcrumbs" />
      <SectionNav>
        <template #filters>
          <li class="list-item"><a href="#" class="list-link is-active">Pending</a></li>
          <li class="list-item"><a href="#" class="list-link">Paid</a></li>
          <li class="list-item"><a href="#" class="list-link">Archived</a></li>
        </template>
        <template #actions>
          <li class="list-item">
            <button class="button is-muted is-clear">
              <span class="icon">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9H5v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9Zm-5 2a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2h4ZM3 4v3h18V4H3Zm20 3a2 2 0 0 1-2 2v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3Z"/></svg>
              </span>
              <span>Archive</span>
            </button>
          </li>
          <li class="list-item">
            <NuxtLink to="/payouts/confirm-payment" class="button is-primary">New payment</NuxtLink>
          </li>
        </template>
      </SectionNav>

      <div v-if="scoredTasks.length" class="items has-gap-small">          
        <div v-for="task in scoredTasks" :key="task.id" class="item bg-subtle radius-medium p-3 p-4-tablet">
          <div class="item-body d-flex flex-column">
            <div class="flex-grow-1">
              <h3 class="title is-size-5 mb-2"><NuxtLink :to="`/workstreams/${task.workstreamSlug}/${task.id}`" class="text-contrasted">{{ task.title }}</NuxtLink></h3>
            </div>
            <div>
              <ul class="list-inline has-gap-small is-size-7">
                <li class="list-item">
                  <div class="d-flex align-items-center">
                    <span class="dot mr-1" :class="getPriorityDotClass(task.priority)"></span>
                    <span class="text-muted text-uppercase">{{ task.id }}</span>
                  </div>                      
                </li>
                <li class="list-item">
                  <span v-if="task.status" class="badge" :class="getTaskBadge(task.status).class">
                    {{ getTaskBadge(task.status).text }}
                  </span>
                </li>
                <li class="list-item">
                  <div class="d-flex align-items-center">
                    <span class="icon is-small text-muted mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M18 21v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0ZM15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm2 0A5 5 0 1 1 7 7a5 5 0 0 1 10 0Z"/>
                      </svg>
                    </span>
                    <span class="text-muted">{{ task.assignee }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-end ml-4 d-flex align-items-center">
            <div class="task-reward" v-if="task.score">
              <div class="score">
                <ul class="list is-size-7">
                  <li class="list-item">{{ task.score.valueAdded }} <span class="text-muted">(V)</span></li>
                  <li class="list-item">{{ task.score.complexity }} <span class="text-muted">(C)</span></li>
                  <li class="list-item">{{ task.score.scope }} <span class="text-muted">(S)</span></li>
                </ul>
              </div>
              <div class="score-total">
                <div class="line-height-1 is-size-2">{{ task.score.total }}</div>
                <span class="heading-line-height">Reward</span>
              </div>
            </div>
            <div class="task-reward" v-else="task.score">
              <div class="score-total">
                <div class="line-height-1 is-size-2">-</div>
                <span class="heading-line-height">Reward</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="unscoredTasks.length" class="mt-7">
        <h2 class="title is-size-3">Awaiting evaluation</h2>
        <div class="items has-gap-small">          
          <div v-for="task in unscoredTasks" :key="task.id" class="item bg-subtle radius-medium p-3 p-4-tablet">
            <div class="item-body d-flex flex-column">
              <div class="flex-grow-1">
                <h3 class="title is-size-5 mb-2"><NuxtLink :to="`/workstreams/${task.workstreamSlug}/${task.id}`" class="text-contrasted">{{ task.title }}</NuxtLink></h3>
              </div>
              <div>
                <ul class="list-inline has-gap-small is-size-7">
                  <li class="list-item">
                    <div class="d-flex align-items-center">
                      <span class="dot mr-1" :class="getPriorityDotClass(task.priority)"></span>
                      <span class="text-muted text-uppercase">{{ task.id }}</span>
                    </div>                      
                  </li>
                  <li class="list-item">
                    <span v-if="task.status" class="badge" :class="getTaskBadge(task.status).class">
                      {{ getTaskBadge(task.status).text }}
                    </span>
                  </li>
                  <li class="list-item">
                    <div class="d-flex align-items-center">
                      <span class="icon is-small text-muted mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M18 21v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0ZM15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm2 0A5 5 0 1 1 7 7a5 5 0 0 1 10 0Z"/>
                        </svg>
                      </span>
                      <span class="text-muted">{{ task.assignee }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item-end ml-4 d-flex align-items-center">
              <div class="task-reward" v-if="task.score">
                <div class="score">
                  <ul class="list is-size-7">
                    <li class="list-item">{{ task.score.valueAdded }} <span class="text-muted">(V)</span></li>
                    <li class="list-item">{{ task.score.complexity }} <span class="text-muted">(C)</span></li>
                    <li class="list-item">{{ task.score.scope }} <span class="text-muted">(S)</span></li>
                  </ul>
                </div>
                <div class="score-total">
                  <div class="line-height-1 is-size-2">{{ task.score.total }}</div>
                  <span class="heading-line-height">Reward</span>
                </div>
              </div>
              <div class="task-reward" v-else="task.score">
                <div class="score-total">
                  <div class="line-height-1 is-size-2">-</div>
                  <span class="heading-line-height">Reward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  const sectionTitle = ref('Payouts')
  const workstreamsStore = useWorkstreamsStore()
  const { allTasks } = storeToRefs(workstreamsStore)

    
  const scoredTasks = computed(() =>
    allTasks.value.filter(task => task.score)
  )

  const unscoredTasks = computed(() =>
    allTasks.value.filter(task => !task.score)
  )

  const getTaskBadge = (status) => {
    const map = {
      pending: { text: 'Pending', class: 'is-muted' },
      'in-progress': { text: 'In Progress', class: 'is-primary' },
      done: { text: 'Done', class: 'is-success' }
    }
    return map[status] || { text: 'Unknown', class: '' }
  }

  const getPriorityDotClass = (priority) => {
    const map = {
      high: 'is-alert',
      medium: 'is-warning',
      low: 'is-muted'
    }
    return map[priority] || 'is-muted'
  }

    const breadcrumbs = computed(() => [
      { text: sectionTitle },
    ])

  useSeoMeta({
    title: sectionTitle
    // description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>
