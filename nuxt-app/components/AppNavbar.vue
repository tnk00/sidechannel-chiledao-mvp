<template>
  <div class="navbar" id="main-navbar">
    <div class="container is-fluid">
      <div class="navbar-start">
        <NuxtLink to="/" class="navbar-brand" title="Home">
          sidechannel
        </NuxtLink>
        <span class="is-size-4 is-size-3-tablet">ChileDAO</span>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <ul class="list-inline d-none d-flex-widescreen">
            <li class="list-item" v-for="page in pages" :key="page.path">
              <NuxtLink :to="page.path" class="navbar-link" :class="{ 'is-active': isActive(page.path) }">
                {{ page.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>  
        <div class="navbar-item">
          <button class="button is-accent has-icon-only radius-rounded" title="Connect wallet" @click="emit('open-wallet-modal')">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18 13a1 1 0 0 0 0 2h3v-2h-3ZM5 8c-.344 0-.681-.063-1-.176V19a1 1 0 0 0 1 1h15v-3h-2a3 3 0 0 1 0-6h2V8H5Zm0-4a1 1 0 0 0 0 2h13V4H5Zm15 2a2 2 0 0 1 2 2v3.27A2 2 0 0 1 23 13v2a2 2 0 0 1-1 1.73V20a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h13a2 2 0 0 1 2 2v2Z"/>
              </svg>                      
            </span>
          </button>
        </div>
        <button class="menu-button ml-3 d-block d-none-widescreen">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>
          </svg> 
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute()

  const pages = [
    { name: 'Workstreams', path: '/' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Payouts', path: '/payouts' },
    { name: 'Organization', path: '/organization' }
  ]

  const isActive = (pagePath) => {
    if (pagePath === '/') {
      // Home (Workstreams) debe estar activo en / y cualquier subruta de /workstreams
      return route.path === '/' || route.path.startsWith('/workstreams')
    }
    return route.path.startsWith(pagePath)
  }

  const emit = defineEmits(['open-wallet-modal'])
</script>