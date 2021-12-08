const main = async () => {
    const [sender, friend] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", sender.address);

    console.log(`Contract signed between ${sender.address} and ${friend.address}`)

    let totalWave;
    totalWave = await waveContract.getTotalWaves();
  
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    totalWave = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(friend).wave();
    await waveTxn.wait();

    totalWave = await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();