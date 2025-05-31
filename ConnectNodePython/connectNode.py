import os
from dotenv import load_dotenv
from substrateinterface import SubstrateInterface, Keypair

# Reference: https://docs.polkadot.com/develop/toolkit/api-libraries/py-substrate-interface/
# Keypair: https://jamdottech.github.io/py-polkadot-sdk/reference/keypair/#substrateinterface.keypair.Keypair.verify

load_dotenv()


# The first step is to establish a connection to a Polkadot SDK-based node. You can connect to either a local or remote node:
# Connect to a node using websocket
substrate = SubstrateInterface(
    # For local node: "ws://127.0.0.1:9944"
    # For Polkadot: "wss://rpc.polkadot.io"
    # For Kusama: "wss://kusama-rpc.polkadot.io"
    # For Paseo Testnet: "wss://paseo.rpc.amforc.com"
    # For Paseo Asset Hub: "wss://sys.ibp.network/asset-hub-paseo"
    url="wss://sys.ibp.network/asset-hub-paseo"
)

# Verify connection
print("Connected to chain: {chain}".format(chain=substrate.chain))

# Get account address from environment variable
acc_addr = os.getenv('ACCOUNT_ADDRESS')
print('Account address:', acc_addr)


# Here's an example of how to check an account's balance and other details:
# Query account balance and info
account_info = substrate.query(
    module="System",  # The pallet name
    storage_function="Account",  # The storage item
    params=[acc_addr],  # Account address in SS58 format
)

# Access account details from the result
free_balance = account_info.value["data"]["free"]
reserved = account_info.value["data"]["reserved"]
nonce = account_info.value["nonce"]

print(
    """
    Account Details:
    - Free Balance: {free_balance}
    - Reserved: {reserved} 
    - Nonce: {nonce}
    """.format(
        free_balance=free_balance,
        reserved=reserved,
        nonce=nonce
    )
)

# Get dest address from environment variable
dest_addr = os.getenv('DEST_ADDRESS')
print('Dest address:', dest_addr)

# Here's how to create and submit a balance transfer:
# Compose the transfer call
call = substrate.compose_call(
    call_module="Balances",  # The pallet name
    call_function="transfer_keep_alive",  # The extrinsic function
    call_params={
        'dest': dest_addr,  # Recipient's address
        'value': '10000000000'  # Amount in smallest unit (e.g., Planck for DOT) 1 DOT = 10^10 Planck, 1 PAS = 10000000000 (10^10) units
    }
)

# Create a keypair for signing
suri = os.getenv('SURI')
keypair = Keypair.create_from_uri(suri)
print('Account address as obtained from suri: {addr}'.format(addr=keypair.ss58_address))

# Create a signed extrinsic
extrinsic = substrate.create_signed_extrinsic(
    call=call, keypair=keypair  # Your keypair for signing
)

# Submit and wait for inclusion
receipt = substrate.submit_extrinsic(
    extrinsic, wait_for_inclusion=True  # Wait until the transaction is in a block
)

if receipt.is_success:
    print(
        f"""
        Transaction successful:
        - Extrinsic Hash: {receipt.extrinsic_hash}
        - Block Hash: {receipt.block_hash}
        """
    )
else:
    print(f"Transaction failed: {receipt.error_message}")

