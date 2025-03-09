// 'use client'
import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
import { useRouter,useSearchParams } from "next/navigation";
import { TransactionContext } from "@/context/TransactionContext";



const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10,11,13,0.8)",
  },
};

const _Modal = ({children}) => {
  const { isLoading, currentAccount } = useContext(TransactionContext);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    Modal.setAppElement(document.body);
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`);
    } else {
      router.push(`/`);
    }
  }, [isLoading]);

  return (
    <Modal isOpen={searchParams.has("loading")} style={customStyles}>
        {children}
    </Modal>
  )
};

export default _Modal;
