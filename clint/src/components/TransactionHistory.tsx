import React, { useContext, useState, useEffect } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import { client } from "@/lib/sanityClient";
import { FiArrowUpRight } from "react-icons/fi";

const style = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  etherscanLink: `flex items-center text-[#2172e5]`,
};

const TransactionHistory = () => {
  const { transactionHistory } = useContext(TransactionContext);

  return (
    <div className={style.wrapper}>
      <div>
        {transactionHistory &&
          transactionHistory?.map((transaction, index) => (
            <div className={style.txHistoryItem} key={index}>
              <div className={style.txDetails}>
                {transaction.amount} eth Ξ sent to{" "}
                <span className={style.toAddress}>
                  {transaction.toAddress.slice(0, 7)} ... {transaction.toAddress.slice(35)}
                </span>{" "}
              </div>
              on{""}
              <div className={style.txTimestamp}>
                {new Date(transaction.timeStamp).toLocaleString()}
              </div>
              <div className={style.etherscanLink}>
                <a
                  href={`https://holesky.etherscan.io/tx/${transaction.txHash}`}
                  target='_blank'
                  rel='noreferrer'
                  className={style.etherscanLink}
                >
                  View on Etherscan
                  <FiArrowUpRight />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
