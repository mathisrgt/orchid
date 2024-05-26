"use client";

import Image from "next/image";

import { ConnectButton } from "@mysten/dapp-kit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Orchid</h1>
      <ConnectButton />
    </main>
  );
}
