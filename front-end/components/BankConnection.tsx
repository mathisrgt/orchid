import { useState, useEffect } from 'react';
import { Button, Card, Spacer } from '@nextui-org/react';

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
        <Card className="w-full max-w-sm p-4 bg-white bg-opacity-80">
          <p className="text-center mb-4 text-lg font-bold">Bank Connection</p>
          <Button variant="light" className="mb-4" onClick={addBankAccount}>
            Add Account
          </Button>
          <Spacer y={1} />
          <div>
            {banks.length > 0 ? (
              banks.map((bank, index) => (
                <Card key={index} className="mb-2 p-2">
                  <p className="font-bold">{bank.name}</p>
                </Card>
              ))
            ) : (
              <p>No banks connected</p>
            )}
          </div>
        </Card>
      </div>
    );
  }