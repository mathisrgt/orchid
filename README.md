# Orchid

## Overview 🌟

Orchid is a cutting-edge loyalty rewards decentralized application (dApp) tailored for the retail sector. It eliminates the need for traditional loyalty accounts and cards, allowing customers to make cross-brand payments seamlessly using the Sui blockchain. By leveraging this innovative platform, users can earn and use loyalty points across different brands, all while maintaining robust privacy and security.

## Table of Contents 📑
- [Problem Statement](#problem-statement-%EF%B8%8F)
- [Solution](#solution-)
- [Advantages](#advantages-)
- [Product](#product-%EF%B8%8F)
- [Strategy](#strategy-)

## Demo
https://github.com/mathisrgt/orchid/assets/116173196/f9e33622-368e-452a-b996-bdbaee7df9db

## Problem Statement ⚠️

In today's retail environment, customers and businesses face several challenges:

1. **Physical Support**: Traditional loyalty programs often rely on physical cards and accounts, which can be inconvenient and cumbersome for users.
2. **Data Privacy**: Maintaining user privacy while tracking loyalty and transactions is a significant concern.
3. **Transaction Tracking**: Ensuring accurate and secure tracking of loyalty points across multiple brands.
4. **Interoperability**: Facilitating cross-brand loyalty points usage without compromising user experience.

Initially, we began developing Orchid in React Native, as evidenced by the different branches in our GitHub repository. However, we faced significant challenges, particularly with implementing zkLogin. React Native's current state of integration with Sui was insufficient for our needs, and our team's unfamiliarity with React Native further compounded the difficulties. As a result, we pivoted to creating a highly responsive web application optimized for mobile use. Implementing zkLogin here was also challenging, but we succeeded, and we also integrated a wallet connection feature.

## Solution 📜

Orchid provides a revolutionary solution that addresses these challenges head-on. By leveraging the Sui blockchain, Orchid ensures:

- **No More Loyalty Cards**: Users can collect and redeem loyalty points without needing physical cards.
- **No User Accounts Needed**: Using zkLogin, we achieve account abstraction, ensuring privacy while eliminating the need for traditional user accounts.
- **Retroactive Point Collection**: Users can collect loyalty points for past purchases.
- **Universal Claim and Use**: Loyalty points can be claimed and used across any store and platform within the Orchid ecosystem.

## Advantages 💎

- **Enhanced Privacy & Security**: Orchid uses zkLogin to safeguard user data, ensuring maximum confidentiality and security.
- **User Empowerment**: Users manage their loyalty programs without compromising their privacy, using an intuitive and secure interface.
- **Innovative Financial Interaction**: By bridging traditional financial systems with blockchain technology, Orchid offers a new way to substantiate loyalty in both Web2 and Web3 environments.

## Product 🛠️

Orchid’s product is built on a modular system, allowing loyalty points from one brand to be spent at another with potential rebates. Users can also mint tokens for brands not yet in the ecosystem, ensuring flexibility and future-proofing their loyalty points.

#### Architecture Diagram
[Sui_Orchid_Architecture.pdf](https://github.com/user-attachments/files/15519252/Sui_Orchid_Architecture.pdf)

## Strategy 🔎

### Loyalty Token for Each Brand

When you make a purchase in a store, you earn loyalty points based on the amount spent. These points are represented as tokens on the Sui blockchain.

### Non-Transferable, No Fiat

The loyalty tokens are non-transferable and not subject to market dynamics, ensuring their value remains stable and directly tied to the loyalty program.

### Modularity

Loyalty points from one brand can be spent at another, with possible rebates, enhancing their utility and value for users.

### Mint Now, Use Later

Users can mint tokens for brands not yet in the ecosystem, ensuring they are ready to leverage new partnerships as they arise.


