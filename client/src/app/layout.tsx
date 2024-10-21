"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navabar from "@/components/navbar";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { baseSepolia} from '@reown/appkit/networks'
import { Network } from "@aptos-labs/ts-sdk";
import { PropsWithChildren } from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

import { useEffect } from "react";
import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'


const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '62fccbffedd9f0104be57bbc0d68f4a0'

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [baseSepolia]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wallets = [new PetraWallet()];
  return (
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
  

    <html lang="en">
      <body className={inter.className}>
        <Navabar />
  
        <main>  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider></main>
        <Toaster />
      </body>
      </html>
          </WagmiProvider>
  );
}
