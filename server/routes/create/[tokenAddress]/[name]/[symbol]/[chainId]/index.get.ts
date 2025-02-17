import { ethers } from "ethers";
import abi from "./abi.json";

const supertoken_factory_mainnet_proxy = '0x0422689cc4087b6B7280e0a7e7F655200ec86Ae1';
const supertoken_factory_polygon_proxy = '0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34';
const supertoken_factory_gnosis_proxy = '0x23410e2659380784498509698ed70E414D384880';
const supertoken_factory_optimism_proxy = '0x8276469A443D5C6B7146BED45e2abCaD3B6adad9';
const supertoken_factory_arbitrum_proxy = '0x1C21Ead77fd45C84a4c916Db7A6635D0C6FF09D6';
const supertoken_factory_avalanche_proxy = '0x464AADdBB2B80f3Cb666522EB7381bE610F638b4';
const supertoken_factory_bsc_proxy = '0x8bde47397301F0Cd31b9000032fD517a39c946Eb';
const supertoken_factory_base_proxy = '0xe20B9a38E0c96F61d1bA6b42a61512D56Fea1Eb3';
const supertoken_factory_goerli_proxy = '0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2';
const supertoken_factory_mumbai_proxy = '0x200657E2f123761662567A1744f9ACAe50dF47E6';
const supertoken_factory_optimism_goerli_proxy = '0x9aCc39d15e3f168c111a1D4F80271a9E526c9a9F';
const supertoken_factory_arbitrum_goerli_proxy = '0x9aCc39d15e3f168c111a1D4F80271a9E526c9a9F';
const supertoken_factory_avalanche_fuji_proxy = '0xA25dbEa94C5824892006b30a629213E7Bf238624';

const contractMap = {
  1: supertoken_factory_mainnet_proxy,
  10: supertoken_factory_optimism_proxy,
  56: supertoken_factory_bsc_proxy,
  100: supertoken_factory_gnosis_proxy,
  137: supertoken_factory_polygon_proxy,
  8453: supertoken_factory_base_proxy,
  42161: supertoken_factory_arbitrum_proxy,
  43114: supertoken_factory_avalanche_proxy,
  5: supertoken_factory_goerli_proxy,
  420: supertoken_factory_optimism_goerli_proxy,
  43113: supertoken_factory_avalanche_fuji_proxy,
  80001: supertoken_factory_mumbai_proxy,
  421613: supertoken_factory_arbitrum_goerli_proxy,
};

export default eventHandler(async (event) => {
  const { tokenAddress, name, symbol, chainId } = event.context.params;
  const contractAddress = contractMap[chainId];

  if (!contractAddress) {
    throw new Error("Unsupported chainId");
  }

  const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const data = contract.interface.encodeFunctionData('createERC20Wrapper', [tokenAddress, 1, name, symbol]);

  return JSON.stringify({ data });
});
