import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { type Keypair } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";
import { Secp256r1Keypair } from "@mysten/sui/keypairs/secp256r1";
import { Transaction } from "@mysten/sui/transactions";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { points, transactions } = data;

    const kp_derive_0 = Ed25519Keypair.deriveKeypair(
      process.env.PRIVATE_KEY + ""
    );
    const pk = kp_derive_0.getPublicKey();

    const sender = pk.toSuiAddress();

    const txb = new Transaction();

    txb.setSender(sender);
    txb.setGasPrice(5);
    txb.setGasBudget(50000);
    txb.moveCall({
      arguments: [],
      target: `sui::orchid::claim`,
    });

    const bytes = await txb.build();
    const serializedSignature = (await kp_derive_0.signTransaction(bytes))
      .signature;

    // expect(
    //   await kp_derive_0
    //     .getPublicKey()
    //     .verifyTransaction(bytes, serializedSignature)
    // ).toEqual(true);

    const client = new SuiClient({ url: getFullnodeUrl("devnet") });

    let res = client.executeTransactionBlock({
      transactionBlock: bytes,
      signature: serializedSignature,
    });

    console.log("Result of Sui Call to Orchid Contract: ", res);

    return NextResponse.json({ success: true, points, res }, { status: 200 });
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
