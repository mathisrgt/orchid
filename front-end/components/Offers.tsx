import { useState } from 'react';
import { Button, Card } from '@nextui-org/react';

interface Product {
  id: number;
  name: string;
  description: string;
  cost: number; // The cost in points
}

const sampleProducts: Product[] = [
  { id: 1, name: "Product 1", description: "Description of Product 1", cost: 50 },
  { id: 2, name: "Product 2", description: "Description of Product 2", cost: 100 },
  { id: 3, name: "Product 3", description: "Description of Product 3", cost: 150 },
];

export default function Offers() {
  const [balance, setBalance] = useState<number>(0);

  const claimProduct = (product: Product) => {
    // Commentaire: Vérifier la balance sur la blockchain
    // if (balance >= product.cost) {
    //   // Logic to claim the product
    //   console.log(`Claimed: ${product.name}`);
    // } else {
    //   console.log(`Not enough points to claim: ${product.name}`);
    // }
    console.log(`Claim product: ${product.name}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-orchid">
      <Card className="w-full max-w-md p-4 bg-white bg-opacity-80 mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold">Available Offers</p>
          <p className="text-lg font-bold">Balance: {balance} points</p>
        </div>
        {sampleProducts.map(product => (
          <Card key={product.id} className="w-full mb-4">
            <div className="p-4">
              <p className="text-lg font-bold">{product.name}</p>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm font-bold">Cost: {product.cost} points</p>
              <Button variant="light" onClick={() => claimProduct(product)} disabled={balance < product.cost}>
                Claim
              </Button>
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
}
