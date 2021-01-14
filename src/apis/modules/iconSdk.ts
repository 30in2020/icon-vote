// @ts-ignore
import IconService from "icon-sdk-js";
import Config from "../../constants/config";

const ICON_NETWORK = Config.NODE_URL + "api/v3";
const Provider = new IconService.HttpProvider(ICON_NETWORK);
const iconService = new IconService(Provider);
const { IconBuilder, IconConverter, IconUtil } = IconService;

export { iconService, IconBuilder, IconConverter, IconUtil };

const getBalance = async (address: string) =>
  await iconService.getBalance(address).execute();

const sendTransaction = async (rawTransaction: any) =>
  await iconService
    .sendTransaction({
      getProperties: () => rawTransaction,
      getSignature: () => rawTransaction.signature,
    })
    .execute();

const call = async (methodName: string, params: any) => {
  const callBuilder = new IconBuilder.CallBuilder();
  const callObj = callBuilder
    .to(Config.CONTRACT_ADDRESS)
    .method(methodName)
    .params(params)
    .build();

  return await iconService.call(callObj).execute();
};

const buildVerifyRawTx = async (fromAddress: string, username: string) => {
  const { blockHash } = await iconService.getBlock("latest").execute();

  return _buildRawTx({
    fromAddress,
    methodName: "verify",
    params: {
      _block_hash: blockHash,
      _id: username,
    },
  });
};

const _buildRawTx = ({
  fromAddress,
  methodName,
  params,
}: {
  fromAddress: string;
  methodName: string;
  params: any;
}) => {
  const timestamp = new Date();
  const txBuilder = new IconBuilder.CallTransactionBuilder();
  const txObj = txBuilder
    .from(fromAddress)
    .to(Config.CONTRACT_ADDRESS)
    .nid(IconConverter.toBigNumber("1"))
    .version(IconConverter.toBigNumber("3"))
    .stepLimit(IconConverter.toBigNumber("10000000"))
    .timestamp(timestamp.valueOf() * 1000)
    .method(methodName)
    .params(params)
    .build();

  // const rawTx = JSON.stringify({
  //   jsonrpc: "2.0",
  //   method: "icx_sendTransaction",
  //   params: IconConverter.toRawTransaction(txObj),
  //   id: 0,
  // });

  return IconConverter.toRawTransaction(txObj);
};

const governanceCall = async (methodName: string, params: any) => {
  const callBuilder = new IconBuilder.CallBuilder();
  const callObj = callBuilder
    .to("cx0000000000000000000000000000000000000000")
    .method(methodName)
    .params(params)
    .build();

  return await iconService.call(callObj).execute();
};

export default {
  getBalance,
  sendTransaction,
  call,
  buildVerifyRawTx,
  governanceCall,
};
