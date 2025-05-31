<template>
  <section class="section">
    <div class="container">
      <SectionHeader :breadcrumbs="breadcrumbs">
        <template #actions>
          <li class="list-item">
            <NuxtLink to="/payouts" class="button is-small is-muted is-outlined has-icon-only radius-rounded" title="Back">
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
        <h2 class="title is-size-2 mb-4">Confirm payment</h2>
        <p>You're about to send a total of <b>407 DOT</b> (~USD $1,860) to 2 addresses. Are you sure you want to proceed with this transaction?</p>
        <ul class="list has-divider">
              <div class="list-item">
                <div class="columns">
                  <div class="column">
                    <div class="d-flex align-items-center">
                      <span class="icon is-small text-muted mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M18 13a1 1 0 0 0 0 2h3v-2h-3ZM5 8c-.344 0-.681-.063-1-.176V19a1 1 0 0 0 1 1h15v-3h-2a3 3 0 0 1 0-6h2V8H5Zm0-4a1 1 0 0 0 0 2h13V4H5Zm15 2a2 2 0 0 1 2 2v3.27A2 2 0 0 1 23 13v2a2 2 0 0 1-1 1.73V20a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h13a2 2 0 0 1 2 2v2Z"/>
                        </svg>                      
                      </span>
                      <span class="text-muted is-size-7">Allan Koryzma</span>
                    </div>
                  </div>
                  <div class="column">
                    <span class="text-muted is-size-7">TAS-64</span>
                  </div>
                  <div class="column is-narrow">234 DOT</div>
                </div>
              </div>
              <div class="list-item">
                <div class="columns">
                  <div class="column">
                    <div class="d-flex align-items-center">
                      <span class="icon is-small text-muted mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M18 13a1 1 0 0 0 0 2h3v-2h-3ZM5 8c-.344 0-.681-.063-1-.176V19a1 1 0 0 0 1 1h15v-3h-2a3 3 0 0 1 0-6h2V8H5Zm0-4a1 1 0 0 0 0 2h13V4H5Zm15 2a2 2 0 0 1 2 2v3.27A2 2 0 0 1 23 13v2a2 2 0 0 1-1 1.73V20a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h13a2 2 0 0 1 2 2v2Z"/>
                        </svg>                      
                      </span>
                      <span class="text-muted is-size-7">Allan Koryzma</span>
                    </div>
                  </div>
                  <div class="column">
                    <span class="text-muted is-size-7">TAS-63</span>
                  </div>
                  <div class="column is-narrow">173 DOT</div>
                </div>
              </div>
        </ul>
        <div class="item">
          <div class="item-end ml-auto">
            <ul class="list-inline has-gap-small mt-6">
              <li class="list-item">
                <NuxtLink to="/payouts" class="button is-muted is-outlined">Cancel</NuxtLink>
              </li>
              <li class="list-item">
                <button class="button is-primary" type="submit">Send payment</button>
              </li>
            </ul>
          </div>
        </div>            
      </div> 
    </div>
  </section>
</template>

<script setup>
  const sectionTitle = ref('Confirm payment');

  const breadcrumbs = computed(() => [
    { text: "Payouts", to: '/payouts' },
    { text: "Confirm" }
  ])

  useSeoMeta({
    title: sectionTitle
    // description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>