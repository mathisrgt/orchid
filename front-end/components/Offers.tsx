import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';

interface Product {
  id: number;
  name: string;
  description: string;
  cost: number; // The cost in points
  img: string;  // Image URL for the product
}

const sampleProducts: Product[] = [
  { id: 1, name: "Orange", description: "Description of Product 1", cost: 50, img: "/orange.png" },
  { id: 2, name: "Ipad", description: "Description of Product 2", cost: 10000, img: "/ipad.png" },
  { id: 3, name: "Yogurt", description: "Description of Product 3", cost: 150, img: "/Yaourt.png" },
];

export default function Offers() {
  const [balance, setBalance] = useState<number>(0);

  const claimProduct = async (product: Product) => {
    // Envoyer une requête POST pour réclamer le produit
    await claimProductOnBackend(product.id, product.cost);
    console.log(`Claimed: ${product.name}`);
  };

  const claimProductOnBackend = async (productId: number, cost: number) => {
    try {
      const response = await fetch('/api/claimProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, cost }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product claimed successfully:', data);
      } else {
        console.error('Failed to claim product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-orchid">
      <Image src="/logo_no.png" alt="Orchid Logo" width={100} height={100} className="mb-2" />
      <p className="text-center text-white mb-8">Browse our exclusive offers and claim your rewards!</p>
      <Card className="w-full max-w-md p-3 bg-white bg-opacity-30 shadow-md backdrop-blur-md rounded-2xl mb-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-white">Available Offers</p>
          <p className="text-lg font-bold text-white">Balance: {balance} points</p>
        </div>
      </Card>
      <div className="flex flex-col gap-4">
        {sampleProducts.map((product) => (
          <Card
            key={product.id}
            shadow="sm"
            isPressable
            onPress={() => claimProduct(product)}
            className="w-full mb-4 px-10 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl"
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                width="100%"
                alt={product.name}
                className="object-cover h-[140px] rounded-t-2xl"
                src={product.img}
              />
            </CardBody>
            <CardFooter className="text-small flex justify-between items-center">
                <b>{product.name}</b>
                <p className="text-default-500">{product.cost} points</p>
              </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
