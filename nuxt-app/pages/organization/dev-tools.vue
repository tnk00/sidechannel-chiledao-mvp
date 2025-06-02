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
      <h2 class="title is-size-3">Dev Tools</h2>
      <ul class="list">
        <li class="list-item"><button @click="showModal = true" class="button is-small is-muted is-outlined">Add funds to wallet</button></li>
        <li class="list-item">
          <NuxtLink
            to="https://contracts.onpop.io/contract/14KQVFpAEBfyxm7gPtp4fbKBj6Uq1smFk1bnMAGtW6HmVbnD"
            class="button is-small is-muted is-outlined"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contract Address
          </NuxtLink>
        </li>
      </ul>
      <div>
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-content">
            <h2>Recargar billetera ChileDAO</h2>
            <p class="modal-description">
              Introduce el monto y la frase semilla para recargar la billetera de la organización.
            </p>

            <form @submit.prevent="handleChargeWallet">
              <div class="form-group">
                <label for="amount">Monto a recargar:</label>
                <input
                  type="number"
                  id="amount"
                  v-model.number="amount"
                  min="0.0001"
                  step="0.0001"
                  required
                  :disabled="isLoading || isFinished"
                />
              </div>

              <div class="form-group">
                <label for="seedPhrase">Frase semilla:</label>
                <input
                  type="password"
                  id="seedPhrase"
                  v-model="seedPhrase"
                  placeholder="Recargar billetera ChileDAO"
                  required
                  :disabled="isLoading || isFinished"
                />
                <p v-if="seedPhraseError" class="error-message">{{ seedPhraseError }}</p>
              </div>

              <div class="modal-actions">
                <button
                  type="submit"
                  :disabled="isLoading || isFinished || !amount || !seedPhrase"
                  class="submit-button"
                >
                  <span v-if="isLoading">Enviando...</span>
                  <span v-else>Enviar</span>
                </button>
                <button
                  type="button"
                  @click="closeModal"
                  :disabled="isLoading"
                  class="cancel-button"
                >
                  Cancelar
                </button>
              </div>
            </form>

            <div v-if="isLoading" class="status-message loading">
              <div class="spinner"></div>
              <p>Transacción en proceso...</p>
              <p>Transfiriendo {{ amount }} (raw: {{amountInPlanck}}) de {{ keyPairAddress }} a {{ organizationAddress }}</p>
            </div>

            <div v-if="isFinished" class="status-message finished">
              <svg class="check-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
              </svg>
              <p>¡Transacción finalizada!</p>
              <p>Hash de la transacción: {{ finalizedHex }}</p>
              <button @click="resetModal" class="reset-button">Cerrar</button>
            </div>

            <div v-if="errorMessage" class="status-message error">
              <p>Error: {{ errorMessage }}</p>
              <button @click="resetModal" class="reset-button">Cerrar</button>
            </div>

            <div v-if="apiError" class="status-message error">
              <p>Error de conexión a la API: {{ apiError }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
  import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
  import { ContractPromise } from '@polkadot/api-contract';
  import sidechannelMetadata from '../../../sidechannel_contract/target/ink/sidechannel_contract.json';

  // console.log('sidechannelMetadata', sidechannelMetadata);
  const sectionTitle = ref('Organization');
  const route = useRoute()

  const breadcrumbs = computed(() => [
    { text: sectionTitle },
  ])

  const wsProvider = new WsProvider("wss://rpc2.paseo.popnetwork.xyz");
  const api = await ApiPromise.create({ provider: wsProvider });
  // Verify the connection by getting the chain's genesis hash
  console.log('Genesis Hash:', api.genesisHash.toHex());

  const sidechannelWalletStore = useSidechannelWalletStore();
  const organizationAddress = sidechannelWalletStore.address;

  const sidechannelWallet = ref({address: '', balance: null, nonce: null });

  // Variables reactivas para el estado del componente
  const showModal = ref(false);
  const amount = ref(null);
  const seedPhrase = ref('');
  const seedPhraseError = ref('');
  const isLoading = ref(false);
  const isFinished = ref(false);
  const errorMessage = ref('');
  const unsubscribe = ref(null); // Para guardar la función de unsubscribe
  const finalizedHex = ref(null);
  const keyPairAddress = ref('');


  // // Hook de ciclo de vida para inicializar la API
  // onMounted(async () => {
  //   await initializeApi();
  // });

  // // Hook de ciclo de vida para limpiar el unsubscribe
  // onUnmounted(() => {
  //   if (unsubscribe.value) {
  //     unsubscribe.value();
  //   }
  // });

  const handleChargeWallet = async () => {
    // if (!api.value) {
    //   errorMessage.value = 'API not initialized. Please try again.';
    //   return;
    // }
    if (!amount.value || amount.value <= 0) {
      errorMessage.value = 'Please enter a valid amount.';
      return;
    }
    
    seedPhraseError.value = '';
    
    isLoading.value = true;
    isFinished.value = false;
    errorMessage.value = '';

    try {
      const keyring = new Keyring({ type: 'sr25519' });
      // Usar la frase semilla introducida por el usuario
      const keyPair = keyring.addFromUri(seedPhrase.value.trim());
      keyPairAddress.value = keyPair.address;

      // Obtener los decimales de la cadena para la conversión
      // const amountInPlanck = amount * Math.pow(10, 10); // Asumiendo que la cadena usa 10 decimales
      const amountInPlanck = 10000000000;

      console.log(`Attempting to transfer ${amount.value} (raw: ${amountInPlanck}) from ${keyPair.address} to ${organizationAddress}`);

      const txHash = await api.tx.balances
        .transferKeepAlive(sidechannelWalletStore.address, amountInPlanck) // 1 DOT in planck
        .signAndSend(keyPair, ({ status }) => {
          if (status.isInBlock) {
            console.log(`Transaction included in block: ${status.asInBlock.toHex()}`);
          } else if (status.isFinalized) {
            finalizedHex.value = status.asFinalized.toHex();
            console.log(`Transaction finalized at block hash: ${status.asFinalized.toHex()}`);
            isLoading.value = false;
            isFinished.value = true;
          }
          else if (status.isError) {
            console.error('Transaction error:', status.toHuman());
            isLoading.value = false;
            errorMessage.value = `Transaction failed: ${status.type}`;
          }
        });
      // Show the hash
      console.log(`Transaction sent`);

    } catch (error) {
      console.error('Error during transaction preparation/send:', error);
      isLoading.value = false;
      errorMessage.value = `Failed to send transaction: ${error.message}`;
    }
  };

  const closeModal = () => {
    if (isLoading.value) {
      if (!confirm('La transacción está en curso. ¿Deseas cancelar el seguimiento?')) {
        return;
      }
      if (unsubscribe.value) {
        unsubscribe.value();
      }
    }
    resetModal();
  };

  const resetModal = () => {
    showModal.value = false;
    amount.value = null;
    seedPhrase.value = '';
    seedPhraseError.value = '';
    isLoading.value = false;
    isFinished.value = false;
    errorMessage.value = '';
    if (unsubscribe.value) {
      unsubscribe.value = null;
    }
  };


  // const value = 10000; // only for payable messages, call will fail otherwise
  // const gasLimit = 3000n * 1000000n;
  // const storageDepositLimit = null;

  // const suri = process.env.SURI || '//Alice';
  // const keyring = new Keyring({ type: 'sr25519' });
  // const keyPair = keyring.addFromUri(suri);

  // // After `await ApiPromise.create({ provider });`
  // console.log('Available Pallets:', Object.keys(api.tx));
  // if (api.tx.balances) {
  //   console.log('Available Balances functions:', Object.keys(api.tx.balances));
  // } else {
  //   console.log('Balances pallet not found!');
  // }

  // // Sign and send a transfer from Alice to Bob
  // const txHash = await api.tx.balances
  //   .transferKeepAlive(sidechannelWalletStore.address, 1000000000n) // 1 DOT in planck
  //   .signAndSend(keyPair, ({ status }) => {
  //     if (status.isInBlock) {
  //       console.log(`Transaction included in block: ${status.asInBlock.toHex()}`);
  //     } else if (status.isFinalized) {
  //       console.log(`Transaction finalized at block hash: ${status.asFinalized.toHex()}`);
  //       process.exit(); // Exit the process once the transaction is finalized
  //     }
  //   });
  // // Show the hash
  // console.log(`Transaction sent with hash: ${txHash.toHex()}`);

  // // The address is the actual on-chain address as ss58 or AccountId object.
  // const contract = new ContractPromise(api, sidechannelMetadata, sidechannelWalletStore.address);

  // // Send the transaction, like elsewhere this is a normal extrinsic
  // // with the same rules as applied in the API (As with the read example,
  // // additional params, if required can follow - here only one is needed)
  // const options = { storageDepositLimit: storageDepositLimit, gasLimit: gasLimit }

  // const { gasRequired, storageDeposit, result, output } = await contract.query.getOwners(
  //   // The address to submit the query from (can be any account, doesn't need to be funded for query)
  //   sidechannelWalletStore.address,//alicePair.address,
  //   options
  // );

  // console.log('result', result);
  // console.log('result events:', result.events);
  // console.log('output', output);
  // console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
  // console.log(`gasRequired ${gasRequired.toString()}`);
  // console.log(`storageDeposit ${storageDeposit.toString()}`);

  // if (result.isOk) {
  //   // The actual return value of your getOwners function is in `output`
  //   const owners = output.toHuman(); // Or .toJSON(), .toString(), etc., depending on the type
  //   console.log('Owners:', owners);
  // } else {
  //   console.error('Error querying owners:', result.asErr);
  // }


  useSeoMeta({
    title: sectionTitle
    // description: 'Explore the workstreams of ChileDAO, including active, draft, and completed projects.',
  })
</script>

<style scoped>
/* Los estilos son los mismos que en la respuesta anterior */
.charge-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.charge-button:hover {
  background-color: #0056b3;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fefefe;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
}

.modal-description {
  color: #666;
  margin-bottom: 20px;
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333; /* Cambiado a negro puro */
}

.form-group input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333; /* Cambiado a negro puro */
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.error-message {
  color: #dc3545;
  font-size: 0.85em;
  margin-top: 5px;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.submit-button, .cancel-button, .reset-button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
}

.submit-button:hover:not(:disabled) {
  background-color: #218838;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
}

.cancel-button:hover:not(:disabled) {
  background-color: #c82333;
}

.cancel-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.reset-button {
  background-color: #6c757d;
  color: white;
  border: none;
  margin-top: 15px;
}

.reset-button:hover {
  background-color: #5a6268;
}

/* Status Messages */
.status-message {
  margin-top: 25px;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.loading {
  background-color: #e0f7fa;
  color: #007bff;
}

.finished {
  background-color: #d4edda;
  color: #28a745;
  flex-direction: column; /* Para centrar el check y el texto */
}

.error {
  background-color: #f8d7da;
  color: #dc3545;
  flex-direction: column;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.check-icon {
  width: 40px;
  height: 40px;
  color: #28a745;
  margin-bottom: 10px;
}
</style>