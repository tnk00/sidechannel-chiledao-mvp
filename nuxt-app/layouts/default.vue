<template>
  <div class="app-wrap">
    <div class="app-container">
      <div class="app-top">
        <AppNavbar  @open-wallet-modal="openWalletModal" />
      </div>
      <div class="app-main">
        <slot />
      </div>
      <div class="app-bottom">
        <AppFooter />
      </div>
    </div>
  </div>
  <WalletConnectModal :show="showWallet" @close="closeWalletModal" />
</template>

<script setup>
  const showWallet = ref(false)

  function openWalletModal() {
    showWallet.value = true
  }

  function closeWalletModal() {
    showWallet.value = false
  }
</script>