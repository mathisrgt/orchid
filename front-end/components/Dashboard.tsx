import { useState, useEffect, useMemo } from 'react';
import { useTable, Column, TableInstance, HeaderGroup, Cell, Row } from 'react-table';
import { Button, Card } from '@nextui-org/react';

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

  const calculatePoints = (validTransactions: Transaction[]) => {
    const totalSpent = validTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.value), 0);
    const roundedPoints = Math.round(totalSpent);
    setPoints(roundedPoints);
    // %%%%%%%%% MINT TOKENS %%%%%%%%%
    // Add logic to call the blockchain to mint tokens here
    // ...
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
      <Card className="w-full max-w-sm p-4 bg-white bg-opacity-80 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">Points</p>
          <Button variant="light" onClick={claimPoints}>Claim Points</Button>
        </div>
        <p>Total Points: {points}</p>
      </Card>
      <Card className="w-full max-w-sm p-4 bg-white bg-opacity-80">
        <p className="text-lg font-bold mb-4">Transactions</p>
        <table {...getTableProps()} className="table-auto w-full">
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<Transaction>) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column: Column<Transaction>) => (
                  <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
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
                    <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
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
