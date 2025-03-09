"use client";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "@/lib/constants";
import { client } from "@/lib/sanityClient";


declare global {
  interface Window {
    ethereum: any;
  }
}
interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionContext = React.createContext("Transaction");

export const TransactionProvider: React.FC<TransactionProviderProps> = ({children}) => {

  const [currentAccount, setCurrentAccount] = useState<any | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ addressTo: "", amount: "" });
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  useEffect(() => {
    saveUser();
  }, [currentAccount]);

  useEffect(() => {
    getTransactionHistory();
  }, [isLoading, currentAccount]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("請先安裝MetaMask插件");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (!accounts) {
      alert("請先登入MetaMask");
      return;
    }
    setCurrentAccount(accounts[0]);
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      alert("請先安裝MetaMask插件");
      return;
    }
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      console.log("setCurrentAccount(accounts[0])执行了✔✔✔🙌🙌🙌", accounts[0]);
      console.log("wallet is already connected✔✔✔🙌🙌🙌");
    } else {
      console.log("No authorized account found");
      setCurrentAccount(undefined);
    }
  };

  const sendTransaction = async () => {
    const getEthereumContract = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(contractAddress, contractABI, signer);
    };

    const saveTransaction = async (
      txHash: string,
      amount: any,
      fromAddress: string = currentAccount,
      toAddress: string
    ) => {
      //这里一定要和sanity的defineField中的name对应起来（大小写）
      const txDoc: any = {
        _id: txHash,
        _type: "transaction",
        fromAddress: fromAddress,
        toAddress: toAddress,
        timeStamp: new Date().toISOString(),
        txHash: txHash,
        amount: parseFloat(amount),
      };
      console.log("🦃saveTransaction执行了！！！txDoc:", txDoc);

      await client.createIfNotExists(txDoc);
      console.log("🦃🦃createOrReplace执行了！！！");

      await client
        .patch(currentAccount)
        .setIfMissing({ transaction: [] })
        .insert("after", "transaction[-1]", [
          {
            _key: txHash,
            _ref: txHash,
            _type: "reference",
          },
        ])
        .commit();
      console.log(
        "🦃🦃🦃client.patch().setIfMissing().insert().commit()执行了！！！"
      );

      return;
    };

    try {
      if (!window.ethereum) {
        return alert("請先安裝MetaMask插件");
      }
      const { addressTo, amount } = formData;
      const transactionContract: any = await getEthereumContract();
      const parseAmount = ethers.parseEther(amount);

      const txResponse = await transactionContract.publicTransaction(
        addressTo,
        parseAmount,
        `Transferring ETH ${parseAmount} to ${addressTo}`,
        `TRANSFER`,
        {
          value: parseAmount,
        }
      );

      setIsLoading(true);

      await txResponse.wait();

      await saveTransaction(txResponse.hash, amount, currentAccount, addressTo);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.warn("❗❗❗ ❗❗❗ ❗❗❗", error);
    }
  };

  const saveUser = async () => {
    if (!currentAccount) return;
    const userDoc = {
      _id: currentAccount,
      _type: "user",
      address: currentAccount,
    };
    await client.createIfNotExists(userDoc);
  };

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
    if (name === "amount") {
      console.log("amount🦃:", ethers.parseEther(e.target.value));
    }
  };

  const getTransactionHistory = async () => {
    if (!isLoading && currentAccount) {
      console.log("TransactionHistory执行😀😀");
      const query = `*[_type == "user" && _id == "${currentAccount}"] {"transactionList": transaction[]->{amount,toAddress,timeStamp,txHash}|order(timeStamp desc)[0..4]}`;
      const clientRes = await client.fetch(query);
      console.log("clientRes😀😀", clientRes);
      setTransactionHistory(clientRes[0].transactionList);
      console.log(
        "TransactionHistory执行完毕😀😀",
        clientRes[0].transactionList
      );
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        sendTransaction,
        handleChange,
        formData,
        isLoading,
        transactionHistory,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
