<template>
  <section class="section">
    <div class="container">
      <SectionHeader :breadcrumbs="breadcrumbs">
        <template #actions>
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
      <div class="block pt-5">
        <h2 class="title is-size-2 mb-4">New workstream</h2>
        <div class="columns">
          <div class="column is-12-mobile mb-3">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input class="input" type="text" placeholder="Name">
              </div>
            </div>
          </div>
          <div class="column is-4-mobile">
            <div class="field">
              <label class="label">Status</label>
              <div class="control">
                <select class="select">
                  <option selected>Draft</option>
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Paused</option>
                </select>
              </div>
            </div>     
          </div>
        </div>
        <div class="item">
          <div class="item-end ml-auto">
            <ul class="list-inline has-gap-small mt-6">
              <li class="list-item">
                <NuxtLink to="/" class="button is-muted is-outlined">Cancel</NuxtLink>
              </li>
              <li class="list-item">
                <button class="button is-primary" type="submit">Create workstream</button>
              </li>
            </ul>
          </div>
        </div>            
      </div>  
    </div>
  </section>
</template>

<script setup>
  const sectionTitle = ref('New workstream')

  const breadcrumbs = computed(() => [
    { text: "Workstreams", to: '/' },
    { text: "New" }
  ])

  useSeoMeta({
    title: sectionTitle,
    // description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>