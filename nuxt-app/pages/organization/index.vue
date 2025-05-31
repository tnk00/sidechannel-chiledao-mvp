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
      </template>
    </SectionNav>
    <div class="block pt-5">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Organization Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Name" value="ChileDAO">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Wallet Address</label>
            <div class="control">
              <input class="input" type="text" value="5CcaNGZ3G8W5ZrgLJCfSNV58Z8nL..." disabled>
            </div>
          </div>
        </div>
      </div>
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