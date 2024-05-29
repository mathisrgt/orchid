import { Button, Card, Spacer } from '@nextui-org/react';

export default function BankConnection() {
  const addBankAccount = () => {
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
          <p>No banks connected</p>
        </div>
      </Card>
    </div>
  );
}
