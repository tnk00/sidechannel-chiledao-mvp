<template>
  <div class="app-wrap">
    <div class="app-container">
      <div class="app-top">
        <AppNavbar />
      </div>
      <div class="app-main">
        <slot />
      </div>
      <div class="app-bottom">
        <AppFooter />
      </div>
    </div>
  </div>
</template>