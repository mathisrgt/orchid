import { useState, useEffect } from 'react';
import { Button, Card, Spacer } from '@nextui-org/react';
import Image from 'next/image';
import logo from '../public/logo_no.png';
import revolutLogo from '../public/revolut_logo.png';

interface Bank {
  name: string;
  accessToken: string;
}

export default function BankConnection({ onAuthenticate }: { onAuthenticate: () => void }) {
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    const storedBanks = localStorage.getItem('banks');
    if (storedBanks) {
      setBanks(JSON.parse(storedBanks));
    }
  }, []);

  const addBankAccount = () => {
    onAuthenticate();
    const url = `https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-orchid">
      <Image src={logo} alt="Orchid Logo" width={100} height={100} className="mb-2" />
      <p className="text-center text-white mb-8">Connect your bank to see how much you can earn !</p>
      <Card className="w-full max-w-sm p-6 bg-white bg-opacity-30 shadow-md backdrop-blur-md rounded-2xl">
        <h2 className="text-center mb-4 text-lg font-bold text-white">Bank Connection</h2>
        <Button radius="full" className="mb-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-xl" onClick={addBankAccount}>
          Add Account
        </Button>
        <Spacer y={1} />
        <div>
          {banks.length > 0 ? (
            banks.map((bank, index) => (
              <Card key={index} className="mb-2 p-4 w-full bg-opacity-20 backdrop-blur-md text-white rounded-2xl flex flex-row">
                <Image src={revolutLogo} alt="Revolut Logo" width={24} height={24} className="mr-2" />
                <p className="font-bold">{bank.name}</p>
              </Card>
            ))
          ) : (
            <p className="text-center text-white">No banks connected</p>
          )}
        </div>
      </Card>
    </div>
  );
}
