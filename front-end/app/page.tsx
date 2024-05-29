"use client";

import Image from "next/image";

import { ConnectButton } from "@mysten/dapp-kit";
import ZkLoginButton from "@/components/zkLoginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Orchid</h1>
      <ZkLoginButton />
      <ConnectButton />
    </main>
  );
}
