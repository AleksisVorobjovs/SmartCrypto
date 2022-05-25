//deploys one instance of the contract when called
const main = async () => {
  const factory = await hre.ethers.getContractFactory("Transactions");
  const contract = await factory.deploy();

  await contract.deployed();

  console.log("Transactions address: ", contract.address);
};
//runs a main contract deploy function
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();