import { useState, useEffect, useMemo } from 'react';
import { useTable, Column, TableInstance, HeaderGroup, Cell, Row } from 'react-table';
import { Button, Card, Spacer } from '@nextui-org/react';
import Image from 'next/image';
import logo from '../public/logo_no.png';

interface Transaction {
  id: number;
  wording: string;
  date: string;
  value: number;
  type: string;
}

export default function Dashboard() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }

    const cachedTransactions = localStorage.getItem('validTransactions');
    if (cachedTransactions) {
      const validTransactions: Transaction[] = JSON.parse(cachedTransactions);
      setTransactions(validTransactions);
      calculatePoints(validTransactions);
    }
  }, []);

  const calculatePoints = async (validTransactions: Transaction[]) => {
    const totalSpent = validTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.value), 0);
    const roundedPoints = Math.round(totalSpent);
    setPoints(roundedPoints);

    // Envoyer une requête POST au backend pour minter les tokens
    await mintTokens(roundedPoints);
  };

  const mintTokens = async (points: number) => {
    try {
      const response = await fetch('/api/mintTokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Tokens minted successfully:', data);
      } else {
        console.error('Failed to mint tokens');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const claimPoints = () => {
    if (accessToken) {
      fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/users/me/transactions?limit=1000`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(data => {
          console.log('data from getTransaction:', data);

          // Filter transactions based on the criteria
          const validTransactions = data.transactions.filter((transaction: Transaction) =>
            transaction.wording === "MONOPRIX"
          );
          setTransactions(validTransactions);

          // Store valid transactions in the cache
          localStorage.setItem('validTransactions', JSON.stringify(validTransactions));

          // Calculate and set points
          calculatePoints(validTransactions);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log("Impossible to call Transaction function: access token is undefined.");
    }
  };

  const columns: Column<Transaction>[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Description',
        accessor: 'wording',
      },
      {
        Header: 'Amount',
        accessor: 'value',
        Cell: ({ value }: { value: number }) => Math.abs(value),
      },
    ],
    []
  );

  const data = useMemo(() => transactions, [transactions]);

  const tableInstance: TableInstance<Transaction> = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-orchid">
      <Image src={logo} alt="Orchid Logo" width={100} height={100} className="mb-2" />
      <Card className="w-full max-w-sm p-6 bg-white bg-opacity-30 shadow-md backdrop-blur-md rounded-2xl mb-4">
        <h2 className="text-center mb-4 text-lg font-bold text-white">Your Points</h2>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold text-white">Points: {points}</p>
          <Button className="bg-custom-orange px-5 text-white shadow-lg rounded-lg" onClick={claimPoints}>
            Claim Points
          </Button>
        </div>
      </Card>
      <Card className="w-full max-w-sm p-1 bg-white bg-opacity-30 shadow-md backdrop-blur-md rounded-2xl">
        <h2 className="text-center mb-4 text-lg font-bold text-white">Transactions</h2>
        <table {...getTableProps()} className="table-auto w-full text-white">
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<Transaction>) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()} key={column.id} className="text-center px-5">{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: Row<Transaction>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell: Cell<Transaction>) => (
                    <td {...cell.getCellProps()} key={cell.column.id} className="text-center p-2">{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
