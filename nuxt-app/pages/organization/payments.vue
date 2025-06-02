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
      <div class="columns mb-7">
        <div class="column is-4">
          <div class="field">
            <label class="label">Payment token</label>
            <div class="control">
              <select class="select">
                <option selected>DOT</option>
                <option>CHILE</option>
              </select>
            </div>
          </div>
        </div>
      </div>
        <h2 class="title is-size-3">Token reward ranges</h2>
        <p>These are the token ranges assigned to basic, intermediate, and advanced contributions.</p>
        <h3 class="title is-size-4">Basic tasks</h3>
        <div class="columns mb-4">
          <div class="column is-4">
            <div class="field">
              <label class="label">Minimum reward</label>
              <div class="control">
                <input class="input" type="text" placeholder="0" value="5">
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">Maximum reward</label>
              <div class="control">
                <input class="input" type="text" placeholder="0" value="50">
              </div>
            </div>
          </div>
        </div>
        <h3 class="title is-size-4">Intermediate tasks</h3>
        <div class="columns mb-4">
          <div class="column is-4">
            <div class="field">
              <label class="label">Minimum reward</label>
              <div class="control">
                <input class="input" type="text" placeholder="0" value="50">
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">Maximum reward</label>
              <div class="control">
                <input class="input" type="text" placeholder="0" value="250">
              </div>
            </div>
          </div>
        </div>
        <h3 class="title is-size-4">Advanced tasks</h3>
        <div class="columns">
          <div class="column is-4">
            <div class="field">
              <label class="label">Minimum reward</label>
              <div class="control">
                <input class="input" type="text" placeholder="0" value="250">
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">Maximum reward</label>
              <div class="control">
                <input class="input" type="text" placeholder="0.0" value="1000">
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