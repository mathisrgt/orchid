import { useState } from 'react';
import { Button, Card, Spacer } from '@nextui-org/react';

export default function BankConnection() {
  const [banks, setBanks] = useState<string[]>([]);

  const addBankAccount = () => {
    const newBank = `Bank ${banks.length + 1}`;
    setBanks([...banks, newBank]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-orchid">
      <Card className="w-full max-w-sm p-4 bg-white bg-opacity-80">
        <p className="text-center h1 mb-4">Bank Connection</p>
        <Button variant="light" className="mb-4" onClick={addBankAccount}>
          Add Account
        </Button>
        <Spacer y={1} />
        <div>
          {banks.length > 0 ? (
            banks.map((bank, index) => (
              <Card key={index} className="mb-2">
                <p>{bank}</p>
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
