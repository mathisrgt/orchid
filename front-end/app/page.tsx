"use client";

import { useState, useEffect, Suspense } from "react";

import dynamic from "next/dynamic";
const ZkLoginButton = dynamic(() => import("@/components/zkLoginButton"), {
  ssr: false,
});

import { ConnectButton } from "@mysten/dapp-kit";
import BankConnection from "../components/BankConnection";
import Dashboard from "../components/Dashboard";
import Offers from "../components/Offers";
import NavBar from "../components/NavBar";
import SearchParamsHandler from "../components/SearchParamsHandler";
import Image from "next/image";
import logo from "../public/logo_no.png";

interface Bank {
  name: string;
  accessToken: string;
}

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState<string>("home");
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleAuthenticate = (code: string) => {
    const isAuthenticating = localStorage.getItem("authenticating") === "true";
    if (code && isAuthenticating) {
      const data = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      };

      fetch(
        `https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/token/access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Access Token:", data.access_token);
          localStorage.setItem("accessToken", data.access_token);
          setAccessToken(data.access_token);

          const newBank: Bank = {
            name: "Revolut",
            accessToken: data.access_token,
          };
          const storedBanks = localStorage.getItem("banks");
          const banks = storedBanks ? JSON.parse(storedBanks) : [];
          banks.push(newBank);
          localStorage.setItem("banks", JSON.stringify(banks));

          localStorage.setItem("authenticating", "false"); // Reset authenticating state
        })
        .catch((error) => {
          console.error("Error:", error);
          localStorage.setItem("authenticating", "false"); // Reset authenticating state
        });
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "bankConnection":
        return (
          <BankConnection
            onAuthenticate={() =>
              localStorage.setItem("authenticating", "true")
            }
          />
        );
      case "dashboard":
        return <Dashboard />;
      case "offers":
        return <Offers />;
      case "home":
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <Image
              src={logo}
              alt="Orchid Logo"
              width={200}
              height={200}
              className="mb-4"
            />
            <p className="text-white text-3xl font-bold mb-4">
              Welcome to Orchid
            </p>
            <p className="text-white text-lg mb-8">
              Orchid is a physical-free, interoperable loyalty program designed
              to keep you engaged and rewarded.
            </p>
            <div className="flex items-center space-x-2 mb-28">
              <Image
                src="/logo_sui.png"
                alt="Sui Logo"
                width={18}
                height={18}
              />
              <p className="text-custom-blue text-sm font-semibold">
                Powered by Sui
              </p>
            </div>
            <ConnectButton />
            <ZkLoginButton />
          </div>
        );
    }
  };

  return (
    <main className="bg-gradient-orchid min-h-screen relative pb-16">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsHandler onAuth={handleAuthenticate} />
      </Suspense>
      {renderComponent()}
      <NavBar
        currentComponent={currentComponent}
        setCurrentComponent={setCurrentComponent}
      />
    </main>
  );
}
