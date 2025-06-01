#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod sidechannel_contract {
    use ink::prelude::vec::Vec;
    // use ink::storage::Mapping;

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
    #[ink(storage)]
    pub struct SidechannelContract {
        /// Creator of the organization (who deployed the contract)
        creator: AccountId,
        /// Actual organization owners
        owners: Vec<AccountId>,
    }

    impl Default for SidechannelContract {
        fn default() -> Self {
            Self::new()
        }
    }

    impl SidechannelContract {
        /// Constructor that initializes the contract
        /// `creator` is who deployed the contract
        #[ink(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            Self {
                creator: caller,
                owners: Vec::from([caller]),  // creator is first owner
            }
        }

        /// Getters
        /// Returns the creator of the organization.
        #[ink(message)]
        pub fn get_creator(&self) -> AccountId {
            self.creator
        }

        /// Returns the list of owners of the organization.
        #[ink(message)]
        pub fn get_owners(&self) -> Vec<AccountId> {
            self.owners.clone()
        }

        /// Add a new owner to the organization.
        /// Only an owner can add a new owner.
        #[ink(message)]
        pub fn add_owner(&mut self, new_owner: AccountId) -> Result<(), Error> {
            self.ensure_owner()?;
            if self.owners.contains(&new_owner) {
                return Err(Error::OwnerAlreadyExists);
            }
            self.owners.push(new_owner);
            Ok(())
        }

        /// Make a payment. Only an owner can make a payment.
        /// Payment is made with the native token of the chain.
        #[ink(message)]
        pub fn make_payment(&mut self, to: AccountId, amount: Balance) -> Result<(), Error> {
            self.ensure_owner()?;
            if amount == 0 {
                return Err(Error::TransferFailed);
            }

            // The contract must have enough balance to make the payment
            if Self::env().balance() < amount {
                return Err(Error::InsufficientFunds);
            }

            // Make the transfer
            let transfer_result = Self::env().transfer(to, amount);
            if transfer_result.is_err() {
                return Err(Error::TransferFailed);
            }

            // // Emit new sent event
            // Self::env().emit_event(Sent {
            //     from: Self::env().account_id(),  // the contract's account ID
            //     to,
            //     amount,
            // });

            Ok(())
        }
        /// Checks that the caller is an owner of the organization.
        fn ensure_owner(&self) -> Result<(), Error> {
            let caller = Self::env().caller();
            if !self.owners.contains(&caller) {
                return Err(Error::Unauthorized);
            }
            Ok(())
        }
    }

    /// Errors that the contract can return.
    #[derive(Debug, PartialEq, Eq)]
    #[ink::scale_derive(Encode, Decode, TypeInfo)]
    pub enum Error {
        /// The caller is not authorized for the action.
        Unauthorized,
        /// Insufficient funds in contract.
        InsufficientFunds,
        /// Fail in token transfer.
        TransferFailed,
        /// Owner already in the list of owners.
        OwnerAlreadyExists,
        /// Can’t remove the last owner.
        CannotRemoveLastOwner,
        /// Owner tried to being deleted does is not found in owners list.
        OwnerNotFound,
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        // use ink::env::{
        //     test::{
        //         self,
        //     },
        //     DefaultEnvironment,
        //     Environment,
        // };
        use ink::env::{
            call::utils::ArgumentList,
            test,
        };

        const WALLET: [u8; 32] = [7; 32];

        /// Auxiliar function to set the caller of the contract.
        fn set_caller(sender: AccountId) {
            ink::env::test::set_caller::<Environment>(sender);
        }

        fn default_accounts() -> test::DefaultAccounts<Environment> {
            ink::env::test::default_accounts::<Environment>()
        }

        fn build_contract() -> SidechannelContract {
            // Set the contract's address as `WALLET`.
            let callee: AccountId = AccountId::from(WALLET);
            ink::env::test::set_callee::<ink::env::DefaultEnvironment>(callee);

            let accounts = default_accounts();
            set_caller(accounts.alice);
            return SidechannelContract::new();
        }

        /// Get the balance of an account.
        fn get_current_balance(account_id: AccountId) -> Balance {
            test::get_account_balance::<Environment>(account_id).unwrap_or_default()
        }

        /// We test a simple use case of our contract.
        #[ink::test]
        fn new_contract_works() {
            let accounts = default_accounts();
            set_caller(accounts.alice);
            let contract = SidechannelContract::new();

            assert_eq!(contract.get_creator(), accounts.alice);
            assert_eq!(contract.get_owners(), vec![accounts.alice]);
        }

        /// We test that we can add a new owner to the organization.
        #[ink::test]
        fn add_owner_works() {
            // Invoke `Flipper::flip()` from Bob's account
            // let call_builder = ink_e2e::create_call_builder::<Flipper>(acc_id);
            // let flip = call_builder.flip();
            // let _flip_res = client.call(&ink_e2e::bob(), &flip).submit().await?;

            let accounts = default_accounts();
            set_caller(accounts.alice);
            let mut contract = SidechannelContract::new();

            // Add Bob as an owner
            assert!(contract.add_owner(accounts.bob).is_ok());
            assert_eq!(contract.get_owners(), vec![accounts.alice, accounts.bob]);

            // Try to add Alice again, should fail
            assert!(contract.add_owner(accounts.alice).is_err());
        }

        /// We can make a payment from the contract.
        #[ink::test]
        fn make_payment_works() {
            let accounts = default_accounts();
            set_caller(accounts.alice);

            // Simulate initial balance
            let mut contract = build_contract();  // builds contract in WALLET address
            let contract_id = AccountId::from(WALLET);
            const CONTRACT_INITIAL_BALANCE: Balance = 1000000;
            test::set_account_balance::<Environment>(contract_id, CONTRACT_INITIAL_BALANCE);
            
            // Check initial balances
            let alice_balance_before = get_current_balance(accounts.alice);
            let bob_balance_before = get_current_balance(accounts.bob);

            // Payment from Alice to Bob
            let payment_amount: Balance = 100;
            assert_eq!(contract.make_payment(accounts.bob, payment_amount), Ok(()));

            // Check balances after payment
            let alice_balance_after = get_current_balance(accounts.alice);
            let bob_balance_after = get_current_balance(accounts.bob);
            let contract_balance_after = get_current_balance(contract_id);

            assert_eq!(alice_balance_after, alice_balance_before);
            assert_eq!(bob_balance_after, bob_balance_before + payment_amount);
            assert_eq!(contract_balance_after, CONTRACT_INITIAL_BALANCE - payment_amount);
        }

        /// Only owners can make payments.
        #[ink::test]
        fn make_payment_only_owner_works() {
            let accounts = default_accounts();
            set_caller(accounts.alice);
            let mut contract = SidechannelContract::new();

            // Add Bob as an owner
            assert!(contract.add_owner(accounts.bob).is_ok());

            // Charlie is not owner, he should not be able to make a payment
            set_caller(accounts.charlie);
            let payment_amount: Balance = 100;
            assert!(contract.make_payment(accounts.django, payment_amount).is_err());
        }
    }


    /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
    ///
    /// When running these you need to make sure that you:
    /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
    /// - Are running a Substrate node which contains `pallet-contracts` in the background
    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// A helper function used for calling contract messages.
        use ink_e2e::ContractsBackend;

        /// The End-to-End test `Result` type.
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        /// We test that we can read and write a value from the on-chain contract.
        #[ink_e2e::test]
        async fn new_contract_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let mut constructor = SidechannelContractRef::new();
            let contract = client
                .instantiate("sidechannel_contract", &ink_e2e::bob(), &mut constructor)
                .submit()
                .await
                .expect("instantiate failed");
            let mut call_builder = contract.call_builder::<SidechannelContract>();

            let get_creator = call_builder.get_creator();
            let get_result = client.call(&ink_e2e::bob(), &get_creator).dry_run().await?;
            assert!(matches!(get_result.return_value(), &ink_e2e::bob()));

            // // When
            // let flip = call_builder.flip();
            // let _flip_result = client
            //     .call(&ink_e2e::bob(), &flip)
            //     .submit()
            //     .await
            //     .expect("flip failed");

            // // Then
            // let get = call_builder.get();
            // let get_result = client.call(&ink_e2e::bob(), &get).dry_run().await?;
            // assert!(matches!(get_result.return_value(), true));

            Ok(())
        }
    }
}
