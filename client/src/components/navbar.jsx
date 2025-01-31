"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

import Link from "next/link"

import { Blocks, Zap, Shield, Users, ArrowRight, CheckCircle, Twitter } from "lucide-react"

const Navabar = () => {
   const { address, isConnected, caipAddress, status } = useAppKitAccount()

  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      fetch(`https://streamads-python-backend.onrender.com/twitter_status?wallet_address=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.new) {
            router.push("/onboarding/user");
          } else {
            if (router.pathname === "/onboarding/user") {
              router.push("/user/campaign");
            }
          }
        })
        .catch(error => {
          console.error("Error fetching Twitter status:", error);
        });
    }
  }, [address])

  return (
      <div>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-center cursor-pointer">
        <Blocks className="h-6 w-6 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900" onClick={() => router.push("/")}>StreamAD</span>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/#features">
          Features
        </Link>
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/#how-it-works">
          How It Works
        </Link>
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/#faqs">
          FAQs
        </Link>
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/#">
        </Link>
      </nav>
      <div className="">
    <w3m-button />
      </div>
      </header>
      </div>
  );
};

export default Navabar;
