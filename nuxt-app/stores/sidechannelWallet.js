import { defineStore } from 'pinia'

export const useSidechannelWalletStore = defineStore('sidechannelWallet', () => {

    const address = ref('14KQVFpAEBfyxm7gPtp4fbKBj6Uq1smFk1bnMAGtW6HmVbnD');
    
    return {
        address,
    }
})