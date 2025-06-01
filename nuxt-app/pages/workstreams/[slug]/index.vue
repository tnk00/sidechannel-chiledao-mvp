<template>
  <section class="section">
    <div class="container">
      <SectionHeader :breadcrumbs="breadcrumbs">
        <template #actions>
          <li class="list-item">
            <button class="button is-small is-muted is-outlined has-icon-only radius-rounded" title="More">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
                </svg>                      
              </span>
            </button>
          </li>
          <li class="list-item">
            <NuxtLink to="/" class="button is-small is-muted is-outlined has-icon-only radius-rounded" title="Back">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.293 4.293a1 1 0 1 1 1.414 1.414L7.414 11H19a1 1 0 1 1 0 2H7.414l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-7-7a1 1 0 0 1 0-1.414l7-7Z"/>
                </svg>                      
              </span>
            </NuxtLink>
          </li>
        </template>
      </SectionHeader>

      <SectionNav>
        <template #filters>
          <li class="list-item"><a href="#" class="list-link is-active">All</a></li>
          <li class="list-item"><a href="#" class="list-link">Pending</a></li>
          <li class="list-item"><a href="#" class="list-link">In progress</a></li>
          <li class="list-item"><a href="#" class="list-link">Done</a></li>
        </template>
        <template #actions>
          <li class="list-item">
            <button class="button is-primary is-clear">
              <span class="icon">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M2 21v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H5.414l.541.541.31.286A8.749 8.749 0 0 0 12.003 20 7.999 7.999 0 0 0 20 12a1 1 0 1 1 2 0 10 10 0 0 1-10 10h-.004a10.75 10.75 0 0 1-7.05-2.67l-.393-.363L4 18.414V21a1 1 0 1 1-2 0Zm0-9A10 10 0 0 1 12 2h.004l.519.015a10.75 10.75 0 0 1 6.53 2.655l.394.363.553.553V3a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 1 1 0-2h2.586l-.541-.541-.31-.286A8.75 8.75 0 0 0 11.996 4 8 8 0 0 0 4 12a1 1 0 1 1-2 0Z"/></svg>
              </span>
              <span>AI Evaluation</span>
            </button>
          </li>
          <li class="list-item">
            <NuxtLink :to="`/workstreams/${route.params.slug}/new-task`" class="button is-primary">New task</NuxtLink>
          </li>
        </template>
      </SectionNav>

      <p v-if="!workstream?.tasks?.length" class="text-center">No tasks available yet. Add a new one to get started.</p>

      <div v-else class="items has-gap-small">          
        <div v-for="task in workstream?.tasks" :key="task.id" class="item bg-subtle radius-medium p-3 p-4-tablet">
          <div class="item-body d-flex flex-column">
            <div class="flex-grow-1">
              <h3 class="title is-size-5 mb-2"><NuxtLink :to="`/workstreams/${slug}/${task.id}`" class="text-contrasted">{{ task.title }}</NuxtLink></h3>
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
                <!-- 
                Version con loader:
                <div class="line-height-1 is-size-2"><span class="loader"></span></div> 
                -->
                <span class="heading-line-height">Reward</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useWorkstreamsStore } from '~/stores/workstreams'
  const route = useRoute()
  const slug = route.params.slug
  const workstreamsStore = useWorkstreamsStore()
  const workstream = workstreamsStore.getBySlug(slug)
  const sectionTitle = ref('Workstreams')
  const sectionSubtitle = ref(workstream?.title || '')

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
    { text: sectionTitle, to: '/' },
    { text: sectionSubtitle }
  ])

  useSeoMeta({
    title: sectionSubtitle.value
      ? `${sectionTitle.value} - ${sectionSubtitle.value}`
      : sectionTitle.value
  })

</script>