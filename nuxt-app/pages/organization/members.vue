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
      <h2 class="title is-size-3">3 Members</h2>            
      <ul class="list has-divider">
        <li class="list-item">
          <div class="columns align-items-center">
            <div class="column">
              <div class="d-flex align-items-center">
                <span class="icon is-small text-muted mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 21v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0ZM15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm2 0A5 5 0 1 1 7 7a5 5 0 0 1 10 0Z"/>
                  </svg>
                </span>
                <span class="is-size-7 text-muted">Allan Koryzma</span>
                <span class="badge is-muted ml-2">Owner</span>
              </div>
            </div>                  
            <div class="column"><span class="is-size-7 text-muted">5CcaNGZ3G8W5ZrgLJCfSNV58Z8nL3G8W5Zr</span></div>
            <div class="column is-narrow">
              <button class="button is-small is-muted is-clear has-icon-only radius-rounded" title="More">
                <span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
                  </svg>                      
                </span>
              </button>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="columns align-items-center">
            <div class="column">
              <div class="d-flex align-items-center">
                <span class="icon is-small text-muted mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 21v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0ZM15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm2 0A5 5 0 1 1 7 7a5 5 0 0 1 10 0Z"/>
                  </svg>
                </span>
                <span class="is-size-7 text-muted">Allan Koryzma</span>
              </div>
            </div>                  
            <div class="column"><span class="is-size-7 text-muted">5CcaNGZ3G8W5ZrgLJCfSNV58Z8nL3G8W5Zr</span></div>
            <div class="column is-narrow">
              <button class="button is-small is-muted is-clear has-icon-only radius-rounded" title="More">
                <span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
                  </svg>                      
                </span>
              </button>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="columns align-items-center">
            <div class="column">
              <div class="d-flex align-items-center">
                <span class="icon is-small text-muted mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 21v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0ZM15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm2 0A5 5 0 1 1 7 7a5 5 0 0 1 10 0Z"/>
                  </svg>
                </span>
                <span class="is-size-7 text-muted">Allan Koryzma</span>
              </div>
            </div>                  
            <div class="column"><span class="is-size-7 text-muted">5CcaNGZ3G8W5ZrgLJCfSNV58Z8nL3G8W5Zr</span></div>
            <div class="column is-narrow">
              <button class="button is-small is-muted is-clear has-icon-only radius-rounded" title="More">
                <span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
                  </svg>                      
                </span>
              </button>
            </div>
          </div>
        </li>
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