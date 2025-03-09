import React from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const style = {
  wrapper: `text-white h-96 w-72 flex flex-col justify-center items-center`,
  title: `font-semibold text-xl mb-12`,
  detail: `font-semibold mb-12 text-xs my-12 text-gray-400`,
};

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const TransactionLoader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Transaction in progress...</div>
      <RingLoader color={"#fff"} loading={true} css={cssOverride} size={50} />
      <div className={style.detail}>Estimated time: 30 seconds...</div>
    </div>
  );
};

export default TransactionLoader;
