module orchid::orchid {
    use std::option;
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::coin::{Self, TreasuryCap};
    use sui::tx_context::{Self, TxContext};

    use sui::token::{Self, ActionRequest, Token};

    use std::address;
    use std::string::String;
    use std::vector;

    const EClaimedTransaction: u64 = 0;

    /// The OTW for the Token / Coin.
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
            0, // no decimals
            b"ORD", // symbol
            b"Orchid Token", // name
            b"Token for Loyalty", // description
            option::none(), // url
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

    public fun claim(
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

    public fun burn(
        cap: &mut TreasuryCap<ORCHID>,
        amount: sui::token::Token<orchid::orchid::ORCHID>,
    ) {
        token::burn(cap, amount);
    }
}
