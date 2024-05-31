module orchid::orchid {
    use sui::coin::{Self, TreasuryCap};
    use sui::token::{Self};
    use std::string::String;

    const EClaimedTransaction: u64 = 0;

    public struct ORCHID has drop {}

    public struct Transaction has key, store {
        id: UID,
        timestamp: String,
        card_number: String,
        amount: u64,
    }

    public struct TransactionRegistry has key, store {
        id: UID,
        transactions: vector<Transaction>,
    }

    fun init(otw: ORCHID, ctx: &mut TxContext) {
        let (treasury_cap, coin_metadata) = coin::create_currency(
            otw,
            0,
            b"ORD",
            b"Orchid Token",
            b"Token for Loyalty",
            option::none(),
            ctx
        );

        let registry = TransactionRegistry {
            id: object::new(ctx),
            transactions: vector::empty<Transaction>(),
        };

        transfer::public_freeze_object(coin_metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
        transfer::public_transfer(registry, tx_context::sender(ctx));
    }

    fun is_duplicate_transaction(transactions: &vector<Transaction>, timestamp: &String, card_number: &String, amount: u64): bool {
        let len = vector::length(transactions);
        let mut i = 0;

        while(i < len) {
            let txn = vector::borrow(transactions, i);

            if (&txn.timestamp == timestamp && &txn.card_number == card_number && txn.amount == amount) {
                return true
            };

            i = i + 1;        
        };

        return false
    }

    public entry fun claim(
        cap: &mut TreasuryCap<ORCHID>,
        registry: &mut TransactionRegistry,
        timestamp: String, 
        card_number: String, 
        amount: u64,
        receiver: address,
        ctx: &mut TxContext
    ) {
        assert!(!is_duplicate_transaction(&registry.transactions, &timestamp, &card_number, amount), EClaimedTransaction);

        let transaction = Transaction {
            id: object::new(ctx),
            timestamp,
            card_number,
            amount,
        };

        vector::push_back(&mut registry.transactions, transaction);

        let token = token::mint(cap, amount, ctx);
        let req = token::transfer(token, receiver, ctx);

        token::confirm_with_treasury_cap(cap, req, ctx);
    }

    public entry fun burn(
        cap: &mut TreasuryCap<ORCHID>,
        amount: sui::token::Token<orchid::orchid::ORCHID>,
    ) {
        token::burn(cap, amount);
    }
}