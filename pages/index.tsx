import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CardinalTwitterIdentityResolver } from '@dialectlabs/identity-cardinal';
import { DialectDappsIdentityResolver } from '@dialectlabs/identity-dialect-dapps';
import { SNSIdentityResolver } from '@dialectlabs/identity-sns';
import {
  AptosConfigProps,
  DialectAptosSdk,
  DialectAptosWalletAdapter,
} from '@dialectlabs/react-sdk-blockchain-aptos';
import {
  DialectSolanaSdk,
  DialectSolanaWalletAdapter,
  SolanaConfigProps,
} from '@dialectlabs/react-sdk-blockchain-solana';
import {
  BottomChat,
  ChatNavigationHelpers,
  ConfigProps,
  defaultVariables,
  DialectNoBlockchainSdk,
  DialectThemeProvider,
  DialectUiManagementProvider,
  IncomingThemeVariables,
  useDialectUiId,
} from '@dialectlabs/react-ui';
import { useWallet as useAptosWallet } from '@manahippo/aptos-wallet-adapter';
import {
  useConnection as useSolanaConnection,
  useWallet as useSolanaWallet,
} from '@solana/wallet-adapter-react';
import { SolanaWalletButton } from '../components/SolanaWallet';
import {
  solanaWalletToDialectWallet,
} from '../utils/wallet';
import { CivicIdentityResolver } from '@dialectlabs/identity-civic';
import { SendTransactionRequest } from "../components/SendTransactionRequest"
import { SendTransactionRequestSo } from "../components/SendTransactionRequest2"
import { SendTransactionRequestSe } from "../components/SendTransactionRequest3"
import { useMemo } from "react";
import { Keypair } from "@solana/web3.js";


// TODO: Use useTheme instead of explicitly importing defaultVariables
export const themeVariables: IncomingThemeVariables = {
  dark: {
    bellButton:
      'w-12 h-12 shadow-xl shadow-neutral-800 border border-neutral-600 hover:shadow-neutral-700',
    slider:
      'sm:rounded-t-3xl shadow-xl shadow-neutral-900 sm:border-t sm:border-l sm:border-r border-neutral-800',
  },
  light: {
    bellButton:
      'w-12 h-12 shadow-md hover:shadow-lg shadow-neutral-300 hover:shadow-neutral-400 text-teal',
    slider:
      'sm:border-t sm:border-l sm:border-r border-border-light shadow-lg shadow-neutral-300 sm:rounded-t-3xl',
    colors: {
      textPrimary: 'text-dark',
    },
    button: `${defaultVariables.light.button} border-none bg-pink`,
    highlighted: `${defaultVariables.light.highlighted} bg-light border border-border-light`,
    input: `${defaultVariables.light.input} border-b-teal focus:ring-teal text-teal`,
    iconButton: `${defaultVariables.light.iconButton} hover:text-teal hover:opacity-100`,
    avatar: `${defaultVariables.light.avatar} bg-light`,
    messageBubble: `${defaultVariables.light.messageBubble} border-none bg-blue text-black`,
    sendButton: `${defaultVariables.light.sendButton} bg-teal`,
  },
};

function AuthedHome() {
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  const { ui, open, close, navigation } = useDialectUiId<ChatNavigationHelpers>(
    'dialect-bottom-chat'
  );

  return (
    <>
      <div className="flex flex-col h-screen bg-white dark:bg-black">
        <div className="flex flex-row justify-end p-2 items-center space-x-2 mr-4">
          <SolanaWalletButton />
          <button className="btn-primary">
          <Link
                
                href='https://dialapp.page.link/download'
              >
                Join the Waitlist! 🟣
              </Link></button>
        </div>
        <div className="h-full text-2xl flex flex-col justify-center items-center">
          <div>
            <div className="text-sm space-x-2 flex justify-center">
            <div className="w-full max-w-sm bg-black border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-4">
    <div className="flex flex-col items-center py-10 px-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/pfp/soju.png" alt="soju"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">@0xSoju</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Master of DeFi</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  open();

                  navigation?.showCreateThread('4iNr6EePYbrrDHw6GHVTVnEsCWEhNpNhnM7mCafe8Ya9');
                }}
              >
                Chat with @0xSoju
              </button>
              <SendTransactionRequestSo reference={reference} />
        </div>
    </div>
            </div>
            <div className="w-full max-w-sm bg-black border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-4">
    <div className="flex flex-col items-center py-10 px-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/pfp/chris.png" alt="chris"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Chris</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Founder @saydialect</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  open();

                  navigation?.showCreateThread('7eHqQn6H7RNAEzv1vzPKn1VURpMARqU33ctvBPhQNfUm');
                }}
              >
                Chat with Chris
              </button>
              <SendTransactionRequestSo reference={reference} />
        </div>
    </div>
            </div>
            <div className="w-full max-w-sm bg-black border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-4">
    <div className="flex flex-col items-center py-10 px-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/pfp/selina.jpeg" alt="selina"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Selina</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Ecosystem @saydialect</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  open();

                  navigation?.showCreateThread('ULX6c9oGH4MhruAWDmLkr6Wp1yAh2pNZfb93JSWAkcU');
                }}
              >
                Chat with Selina
              </button>
              <SendTransactionRequestSo reference={reference} />
        </div>
    </div>
            </div>
              
            </div>
          </div>
        </div>
        <BottomChat dialectId="dialect-bottom-chat" />
      </div>
    </>
  );
}

export default function Home(): JSX.Element {
  const { connection: solanaConnection } = useSolanaConnection();
  const solanaWallet = useSolanaWallet();
  const aptosWallet = useAptosWallet();

  const [dialectSolanaWalletAdapter, setDialectSolanaWalletAdapter] =
    useState<DialectSolanaWalletAdapter | null>(null);
  const [dialectAptosWalletAdapter, setDialectAptosWalletAdapter] =
    useState<DialectAptosWalletAdapter | null>(null);

  

  useEffect(() => {
    setDialectSolanaWalletAdapter(solanaWalletToDialectWallet(solanaWallet));
  }, [solanaWallet]);



  const DialectProviders: React.FC<{ children: React.ReactNode }> = useCallback(
    (props: { children: React.ReactNode }) => {
      const dialectConfig: ConfigProps = {
        environment: 'production',
        dialectCloud: {
          tokenStore: 'local-storage',
        },
        identity: {
          resolvers: [
            new DialectDappsIdentityResolver(),
            new SNSIdentityResolver(solanaConnection),
            new CardinalTwitterIdentityResolver(solanaConnection),
            new CivicIdentityResolver(solanaConnection),
          ],
        },
      };

      if (dialectSolanaWalletAdapter) {
        const solanaConfig: SolanaConfigProps = {
          wallet: dialectSolanaWalletAdapter,
        };

        return (
          <DialectSolanaSdk config={dialectConfig} solanaConfig={solanaConfig}>
            {props.children}
          </DialectSolanaSdk>
        );
      }
      if (dialectAptosWalletAdapter) {
        const aptosConfig: AptosConfigProps = {
          wallet: dialectAptosWalletAdapter,
        };

        return (
          <DialectAptosSdk config={dialectConfig} aptosConfig={aptosConfig}>
            {props.children}
          </DialectAptosSdk>
        );
      }
      
      return <DialectNoBlockchainSdk>{props.children}</DialectNoBlockchainSdk>;
    },
    [
      solanaConnection,
      dialectAptosWalletAdapter,
      dialectSolanaWalletAdapter,
    ]
  );

  return (
    <DialectProviders>
      <DialectUiManagementProvider>
        <DialectThemeProvider theme="dark" variables={themeVariables}>
          <AuthedHome />
        </DialectThemeProvider>
      </DialectUiManagementProvider>
    </DialectProviders>
  );
}