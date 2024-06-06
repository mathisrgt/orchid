import { useState, useEffect, useMemo } from "react";
import {
  useTable,
  Column,
  TableInstance,
  HeaderGroup,
  Cell,
  Row,
} from "react-table";
import { Button, Card, Spacer } from "@nextui-org/react";
import Image from "next/image";
import logo from "../public/logo_no.png";

import { Transaction as SuiTransaction } from "@mysten/sui/transactions";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

export interface Transaction {
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

  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  // Get BALANCE
  const account = useCurrentAccount();
  let content;

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat().format(balance);
  };

  if (account !== null && account !== undefined) {
    const { data, isPending, isError, error, refetch } = useSuiClientQuery(
      "getAllBalances",
      { owner: account.address }
    );

    if (isPending) {
      content = <div>Loading...</div>;
    } else if (isError) {
      content = <div>Error: {error.message}</div>;
    } else {
      const totalBalanceStr = data.length > 0 ? data[0].totalBalance : "0"; // I PUT [0] DEPEND ON THE TOKEN !!! THE BEST IS TO SELECT THE TOKEN NAME
      const totalBalance = parseInt(totalBalanceStr, 10) / 10 ** 9;
      content = formatBalance(totalBalance);
    }
  } else {
    content = <div>Not connected</div>;
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }

    const cachedTransactions = localStorage.getItem("validTransactions");
    if (cachedTransactions) {
      const validTransactions: Transaction[] = JSON.parse(cachedTransactions);
      setTransactions(validTransactions);
      calculatePoints(validTransactions);
    }
  }, []);

  const calculatePoints = async (validTransactions: Transaction[]) => {
    const totalSpent = validTransactions.reduce(
      (sum, transaction) => sum + Math.abs(transaction.value),
      0
    );
    const roundedPoints = Math.round(totalSpent);
    setPoints(roundedPoints);

    // Envoyer une requête POST au backend pour minter les tokens
    await mintTokens(roundedPoints);
  };

  const mintTokens = async (points: number) => {
    try {
      const response = await fetch("/api/mintTokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ points, transactions }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Tokens minted successfully:", data);
      } else {
        console.error("Failed to mint tokens");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const claimPoints = async () => {
    if (account !== null) {
      console.log("This call use the EOA.");

      const tx = new SuiTransaction();

      tx.moveCall({
        arguments: [
          tx.object(
            "0x3f4f9666b313ff320f7b4df8e7e820ecc960bb92da9fcaf0f5f1f11684473f95"
          ), // Tresury Cap
          tx.object(
            "0x0fed44912487d6faaeb3cdfc5b53f6d0d69940b69e03533e97e7e762eff0e633"
          ), // Transaction Registry
          tx.pure.string("25-01-2024 10:32:21"), // Timestamp
          tx.pure.string("0948094809480984"), // Card number
          tx.pure.u64(1293), // Amount
          tx.pure.address(account.address), // Receiver address
        ],
        target: `0x087296ac5350b47df0e9b4aa8ba4f1c0f4224b8ef5589a39d79d7df9f2f5fecf::orchid::claim`,
      });

      try {
        signAndExecute(
          {
            transaction: tx,
          },
          {
            onSuccess: async ({ digest }) => {
              const tx = await suiClient.waitForTransaction({
                digest,
                options: {
                  showEffects: true,
                },
              });

              console.log("Transaction: ", tx);

              // The first created object in this Transaction should be the new Counter
              // const objectId = tx.effects?.created?.[0]?.reference?.objectId;
              // if (objectId) {
              //   props.onCreated(objectId);
              // }
            },
          }
        );
      } catch (error) {
        console.log("Error: ", error);
      }

      // if (accessToken) {
      //   fetch(
      //     `https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/users/me/transactions?limit=1000`,
      //     {
      //       method: "GET",
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log("data from getTransaction:", data);

      //       // Filter transactions based on the criteria
      //       const validTransactions = data.transactions.filter(
      //         (transaction: Transaction) => transaction.wording === "MONOPRIX"
      //       );
      //       setTransactions(validTransactions);

      //       // Store valid transactions in the cache
      //       localStorage.setItem(
      //         "validTransactions",
      //         JSON.stringify(validTransactions)
      //       );

      //       // Calculate and set points
      //       calculatePoints(validTransactions);
      //     })
      //     .catch((error) => {
      //       console.error("Error:", error);
      //     });
      // } else {
      //   console.log(
      //     "Impossible to call Transaction function: access token is undefined."
      //   );
      // }
    } else {
      console.log("This call use the zkLogin account.");

      try {
        const response = await fetch("/api/mintToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1293,
            transaction: {
              timestamp: "25-01-2024 10:32:21",
              cardNumber: "0948094809480984",
              amount: 1293,
              receiver:
                "0xbdc977c979c9ba1d7a3f4db86db6da37fd01295f327bf4467d615f55ed2d3bc4",
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Token minted successfully:", data);
        } else {
          console.error("Failed to mint token");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const columns: Column<Transaction>[] = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Description",
        accessor: "wording",
      },
      {
        Header: "Amount",
        accessor: "value",
        Cell: ({ value }: { value: number }) => Math.abs(value),
      },
    ],
    []
  );

  const data = useMemo(() => transactions, [transactions]);

  const tableInstance: TableInstance<Transaction> = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-orchid">
      <Image
        src={logo}
        alt="Orchid Logo"
        width={100}
        height={100}
        className="mb-2"
      />
      <Card className="w-full max-w-sm p-6 bg-white bg-opacity-30 shadow-md backdrop-blur-md rounded-2xl mb-4">
        <h2 className="text-center mb-4 text-lg font-bold text-white">
          Your Points
        </h2>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold text-white">Points: {points}</p>
          <Button
            className="bg-custom-orange px-5 text-white shadow-lg rounded-lg"
            onClick={claimPoints}
          >
            Claim Points
          </Button>
        </div>
      </Card>
      <Card className="w-full max-w-sm p-1 bg-white bg-opacity-30 shadow-md backdrop-blur-md rounded-2xl">
        <h2 className="text-center mb-4 text-lg font-bold text-white">
          Transactions
        </h2>
        <table {...getTableProps()} className="table-auto w-full text-white">
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<Transaction>) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="text-center px-5"
                  >
                    {column.render("Header")}
                  </th>
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
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="text-center p-2"
                    >
                      {cell.render("Cell")}
                    </td>
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
