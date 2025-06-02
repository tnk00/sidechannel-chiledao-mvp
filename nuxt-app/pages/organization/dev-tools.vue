<template>
<section class="section">
  <div class="container">
    <SectionHeader :breadcrumbs="breadcrumbs" />
    <SectionNav>
      <template #filters>
        <li class="list-item"><NuxtLink to="/organization" class="list-link" :class="{ 'is-active': route.path === '/organization' }">Details</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/payments" class="list-link" :class="{ 'is-active': route.path === '/organization/payments' }">Payments</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/artificial-intelligence" class="list-link" :class="{ 'is-active': route.path === '/organization/artificial-intelligence' }">Artificial Intelligence</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/members" class="list-link" :class="{ 'is-active': route.path === '/organization/members' }">Members</NuxtLink></li>
        <li class="list-item"><NuxtLink to="/organization/dev-tools" class="list-link" :class="{ 'is-active': route.path === '/organization/dev-tools' }">Dev Tools</NuxtLink></li>
      </template>
    </SectionNav>
    <div class="block pt-5">
      <h2 class="title is-size-3">Dev Tools</h2>
      <ul class="list">
        <li class="list-item"><button class="button is-small is-muted is-outlined">Add funds to wallet</button></li>
        <li class="list-item"><NuxtLink to="https://contracts.onpop.io/contract/14KQVFpAEBfyxm7gPtp4fbKBj6Uq1smFk1bnMAGtW6HmVbnD" class="button is-small is-muted is-outlined">Contract Address</NuxtLink></li>
      </ul> 
    </div>
  </div>
</section>
</template>

<script setup>
  const sectionTitle = ref('Organization');
  const route = useRoute()

  const breadcrumbs = computed(() => [
    { text: sectionTitle },
  ])

  useSeoMeta({
    title: sectionTitle
    // description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>