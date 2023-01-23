import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionSignature, Connection } from '@solana/web3.js';
import axios from 'axios';

import { FC, useCallback } from 'react';


type SendTransactionRequestProps = {
  reference: PublicKey,
};

export const SendTransactionRequest: FC<SendTransactionRequestProps> = ({ reference }) => {
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  const onClick = useCallback(async () => {
    

    let signature: TransactionSignature = '';
    try {
      // Request the transaction from transaction request API
      const { data } = await axios.post(`/api/send?network=mainnet-beta&reference=${reference.toBase58()}`, {
        account: publicKey
      }, {
        // Don't throw for 4xx responses, we handle them
        validateStatus: (s) => s < 500
      });

      const response = data 

      if ('error' in response) {
        console.error(`Failed to fetch transaction! ${response.error}`);
        return;
      }

      const message = response.message;
      

      // De-serialize the returned transaction
      const transaction = Transaction.from(Buffer.from(response.transaction, 'base64'));

      // Debug: log current and expected signers of the transaction
      // The API can return a partially signed transaction
      console.log('Fetched transaction', transaction);
      const currentSigners = transaction.signatures.filter(k => k.signature !== null).map(k => k.publicKey.toBase58());
      const expectedSigners = transaction.instructions.flatMap(i => i.keys.filter(k => k.isSigner).map(k => k.pubkey.toBase58()));
      console.log({ currentSigners, expectedSigners });

      // Send the transaction
      await sendTransaction(transaction, connection);
    } catch (error: any) {
      console.error(`Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, connection, reference, sendTransaction, connection]);

  return (
    <div>
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onClick} disabled={!publicKey}
      >
        <div className="hidden group-disabled:block ">
          Wallet not connected
        </div>
        <span className="block group-disabled:hidden" >
          Tip Me Bonk!
        </span>
        <img
      src="/bonk.png"
      width={40}
      height={40}
    />
      </button>
    </div>
  );
};