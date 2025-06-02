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
              <!-- <input class="input" type="text" placeholder="Name" value="ChileDAO"> -->
              <p>ChileDAO</p>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Wallet Address</label>
            <div class="control">
              <!-- <input class="input" type="text" value={{ sidechannelWallet.vaule.address }} disabled> -->
              <p>{{ sidechannelWallet.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block pt-5">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Balance</label>
            <div class="control">
              <!-- <input class="input" type="text" value={{ sidechannelWallet.vaule.balance.free }} disabled> -->
              <p>{{ sidechannelWallet.balance.free * Math.pow(10, -10) }} DOT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
  import { ApiPromise, WsProvider } from '@polkadot/api';

  const sectionTitle = ref('Organization');
  const sidechannelWallet = ref({address: '', balance: null, nonce: null });
  const route = useRoute()
  console.log('sidechannelWallet', sidechannelWallet.value);

  const breadcrumbs = computed(() => [
    { text: sectionTitle },
  ])

  const wsProvider = new WsProvider("wss://rpc2.paseo.popnetwork.xyz");
  const api = await ApiPromise.create({ provider: wsProvider });
  // Verify the connection by getting the chain's genesis hash
  console.log('Genesis Hash:', api.genesisHash.toHex());

  const sidechannelWalletStore = useSidechannelWalletStore();
  sidechannelWallet.value.address = sidechannelWalletStore.address;
  
  // Retrieve the account balance & nonce via the system module
  const { nonce, data: balance } = await api.query.system.account(sidechannelWalletStore.address);
  console.log(`balance of ${balance.free} and a nonce of ${nonce}`);
  
  sidechannelWallet.value.balance = balance;
  sidechannelWallet.value.nonce = nonce;

  useSeoMeta({
    title: sectionTitle
    // description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>