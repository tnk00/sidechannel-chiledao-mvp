<template>
  <Transition name="slide-down">
    <div v-if="show" class="dialog-wallet" @click="onClickOutside">
      <div class="dialog-background"></div>
      <div class="wallet-modal-container">      
        <div class="wallet-modal" ref="content">
          <header class="wallet-modal-header item align-items-center">
              <div class="item-body"><span class="heading-line-height is-size-7 font-weight-medium">Connected</span></div>
              <!-- <div class="item-end">
                <button class="button is-small is-outlined has-icon-only radius-rounded" @click="emit('close')">
                  <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17.293 5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707l-.068-.076A1 1 0 0 1 6.63 5.225l.076.068L12 10.586l5.293-5.293Z" />
                    </svg>                      
                  </span>
                </button>
              </div> -->
          </header>
          <div class="wallet-modal-body">
            <div class="wallet-modal-scroller text-center">            
                <figure class="avatar mx-auto mb-2"><img src="/avatar.png" alt=""></figure>
                <h4 class="title is-size-7 mb-0">Wallet Name</h4>
                <span class="is-size-8 text-break">{{ shortenAddress(walletAddress) }}</span>            
            </div>          
          </div>
          <footer class="wallet-modal-footer text-center">
            <button class="button is-small is-outlined">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M9.293 10.293a1 1 0 1 1 1.414 1.414L8.914 13.5l1.586 1.586 1.793-1.793a1 1 0 1 1 1.414 1.414L11.914 16.5l.793.793a1 1 0 0 1 0 1.414l-2.3 2.3a3.401 3.401 0 0 1-4.814 0L5 20.414l-2.293 2.293a1 1 0 1 1-1.414-1.414L3.586 19l-.593-.593a3.405 3.405 0 0 1-.995-2.24L1.994 16a3.4 3.4 0 0 1 1-2.408l2.299-2.3.073-.066a1 1 0 0 1 1.341.067l.793.793 1.793-1.793ZM20.006 8a1.4 1.4 0 0 0-.412-.991l-.001-.002-2.6-2.6h-.002a1.4 1.4 0 0 0-1.982 0h-.002L13.414 6 18 10.586l1.593-1.593v-.002l.093-.101a1.399 1.399 0 0 0 .32-.89ZM4 16.138a1.402 1.402 0 0 0 .312.752l.093.101.001.002 2.6 2.6h.002l.101.093a1.399 1.399 0 0 0 1.881-.092l.002-.001L10.586 18 6 13.414l-1.593 1.593v.002a1.4 1.4 0 0 0-.413.99l.007.139ZM22.006 8a3.401 3.401 0 0 1-1 2.406v.001l-2.299 2.3a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414l2.3-2.3a3.4 3.4 0 0 1 4.814 0l.593.593 2.293-2.293a1 1 0 1 1 1.414 1.414L20.414 5l.592.592.116.12A3.402 3.402 0 0 1 22.006 8Z" />
                </svg>
              </span>
              <span>Disconnect Wallet</span>
            </button>
          </footer>
        </div>      
      </div>
    </div>
  </Transition>
</template>


<script setup>
const emit = defineEmits(['close'])
const props = defineProps({
  show: Boolean
})
const content = ref(null)
const walletAddress = '5CcaNGZ3G8W5ZrgLJCfSNV58Z8nL3G8W5Zr' // Example address
const shortenAddress = useShortenAddress()

function close() {
  emit('close')
}

function onClickOutside(e) {
  if (content.value && !content.value.contains(e.target)) {
    close()
  }
}

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<style lang="scss" scoped>
  // https://vuejs.org/guide/built-ins/transition.html
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.15s cubic-bezier(0.0, 0.0, 0.2, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>