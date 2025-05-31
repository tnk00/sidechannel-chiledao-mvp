<template>
<section class="section">
  <div class="container">
    <SectionHeader :breadcrumbs="breadcrumbs" />
    <SectionNav>
      <template #filters>
        <li class="list-item"><a href="#" class="list-link is-active">All</a></li>
        <li class="list-item"><a href="#" class="list-link">Draft</a></li>
        <li class="list-item"><a href="#" class="list-link">Active</a></li>
        <li class="list-item"><a href="#" class="list-link">Completed</a></li>
        <li class="list-item"><a href="#" class="list-link">Paused</a></li>
      </template>
      <template #actions>
        <li class="list-item">
          <NuxtLink to="/workstreams/new" class="button is-primary">New workstream</NuxtLink>
        </li>
      </template>
    </SectionNav>

    <div class="grid grid-auto-rows">
      <div class="grid-item" v-for="ws in workstreams" :key="ws.slug">
        <div class="bg-subtle radius-large p-4 p-5-tablet h-100">
          <h3 class="title is-size-4"><NuxtLink :to="`/workstreams/${ws.slug}`" class="text-contrasted">{{ ws.title }}</NuxtLink></h3>
          <!-- <span class="badge is-accent">Active</span> -->
          <span v-if="ws.status" class="badge" :class="getWorkstreamBadge(ws.status).class">
            {{ getWorkstreamBadge(ws.status).text }}
          </span>
        </div>
      </div>
    </div>      
  </div>
</section>
</template>

<script setup>
  import { useWorkstreamsStore } from '~/stores/workstreams'
  const sectionTitle = ref('Workstreams');
  const workstreamsStore = useWorkstreamsStore()
  const workstreams = workstreamsStore.workstreams

  const getWorkstreamBadge = (status) => {
    const map = {
      active: { text: 'Active', class: 'is-accent' },
      draft: { text: 'Draft', class: 'is-muted' },
      completed: { text: 'Completed', class: 'is-muted' }
    }
    return map[status] || { text: 'Unknown', class: '' }
  }

  const breadcrumbs = computed(() => [
    { text: sectionTitle },
  ])

  useSeoMeta({
    title: sectionTitle,
    description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>