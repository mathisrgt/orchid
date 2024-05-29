"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ConnectButton } from "@mysten/dapp-kit";
import BankConnection from '../components/BankConnection';
import NavBar from '../components/NavBar';
import { Button } from '@nextui-org/react';

interface Bank {
  name: string;
  accessToken: string;
}

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState<string>('home');
  const [accessToken, setAccessToken] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const isAuthenticating = localStorage.getItem('authenticating') === 'true';
    if (code && isAuthenticating) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      };

      fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/token/access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Access Token:', data.access_token);
          localStorage.setItem('accessToken', data.access_token);
          setAccessToken(data.access_token);

          const newBank: Bank = { name: 'Boursorama', accessToken: data.access_token };
          const storedBanks = localStorage.getItem('banks');
          const banks = storedBanks ? JSON.parse(storedBanks) : [];
          banks.push(newBank);
          localStorage.setItem('banks', JSON.stringify(banks));

          localStorage.setItem('authenticating', 'false');  // Reset authenticating state
        })
        .catch((error) => {
          console.error('Error:', error);
          localStorage.setItem('authenticating', 'false');  // Reset authenticating state
        });
    }
  }, [searchParams]);

  const handleAuthenticate = () => {
    localStorage.setItem('authenticating', 'true');
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'bankConnection':
        return <BankConnection onAuthenticate={handleAuthenticate} />;
      case 'home':
      default:
        return (
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <p className="text-white text-lg font-bold">Welcome to Orchid</p>
            <ConnectButton />
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