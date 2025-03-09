const hre = require("hardhat");

async function main() {
  //獲取 transaction 工場
  const transactionFactory = await hre.ethers.getContractFactory("Transactions");
  //部署 transaction
  const transactionContract = await transactionFactory.deploy();
  //等待 部署 完成
  await transactionContract.waitForDeployment();
  console.log("Transaction contract deployed to:", await transactionContract.getAddress());
}

(async()=>{
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()
