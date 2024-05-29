"use client";

import { useState } from 'react';
import { ConnectButton } from "@mysten/dapp-kit";
import BankConnection from '../components/BankConnection';
import NavBar from '../components/NavBar';
import { Button } from '@nextui-org/react';

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState<string>('home');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'bankConnection':
        return <BankConnection />;
      case 'home':
      default:
        return (
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-white">Welcome to Orchid</h1>
            <ConnectButton />
            <Button variant="light" onClick={() => setCurrentComponent('bankConnection')}>
              Go to Bank Connection
            </Button>
          </div>
        );
    }
  };

  return (
    <main className="bg-gradient-orchid min-h-screen relative pb-16">
      {renderComponent()}
      <NavBar currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />
    </main>
  );
}
