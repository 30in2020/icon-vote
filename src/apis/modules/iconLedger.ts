//@ts-nocheck
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import Icx from "@ledgerhq/hw-app-icx";
import iconSdk from "./iconSdk";

const LIST_NUM = 5;

function _escapeString(value) {
  let newString = String.raw`${value}`;
  newString = newString.split("\\").join("\\\\");
  newString = newString.split(".").join("\\.");
  newString = newString.split("{").join("\\{");
  newString = newString.split("}").join("\\}");
  newString = newString.split("[").join("\\[");
  newString = newString.split("]").join("\\]");
  return newString;
}

function _generateHashKey(obj) {
  let resultStrReplaced = "";
  let resultStr = _objTraverse(obj);
  resultStrReplaced = resultStr.substring(1).slice(0, -1);
  const result = "icx_sendTransaction." + resultStrReplaced;
  return result;
}

function _objTraverse(obj) {
  let result = "";
  result += "{";
  let keys;
  keys = Object.keys(obj);
  keys.sort();
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = obj[key];
      switch (true) {
        case value === null: {
          result += `${key}.`;
          result += String.raw`\0`;
          break;
        }
        case typeof value === "string": {
          result += `${key}.`;
          result += _escapeString(value);
          break;
        }
        case Array.isArray(value): {
          result += `${key}.`;
          result += _arrTraverse(value);
          break;
        }
        case typeof value === "object": {
          result += `${key}.`;
          result += _objTraverse(value);
          break;
        }
        default:
          break;
      }
      result += ".";
    }
    result = result.slice(0, -1);
    result += "}";
  } else {
    result += "}";
  }

  return result;
}

function _arrTraverse(arr) {
  let result = "";
  result += "[";
  for (let j = 0; j < arr.length; j++) {
    const value = arr[j];
    switch (true) {
      case value === null: {
        result += String.raw`\0`;
        break;
      }
      case typeof value === "string": {
        result += _escapeString(value);
        break;
      }
      case Array.isArray(value): {
        result += _arrTraverse(value);
        break;
      }
      case typeof value === "object": {
        result += _objTraverse(value);
        break;
      }
      default:
        break;
    }
    result += ".";
  }
  result = result.slice(0, -1);
  result += "]";
  return result;
}

const getWallets = async (index: number) => {
  try {
    const transport = await TransportU2F.create();
    transport.setDebugMode(false);
    const icx = new Icx(transport);
    const walletList = [];
    for (let i = index * LIST_NUM; i < index * LIST_NUM + LIST_NUM; i++) {
      const path = `44'/4801368'/0'/0'/${i}'`;
      const { address } = await icx.getAddress(path, false, true);
      const _address = address.toString();
      const balance = await iconSdk.getBalance(_address);
      walletList.push({
        path,
        balance,
        address: address.toString(),
      });
    }
    return walletList;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const signTransaction = async (path, param) => {
  try {
    const rawTx = { ...param };
    const phraseToSign = _generateHashKey(rawTx);
    const transport = await TransportU2F.create();
    const icx = new Icx(transport);
    const signedData = await icx.signTransaction(path, phraseToSign);
    const { signedRawTxBase64 } = signedData;

    return {
      ...rawTx,
      signature: signedRawTxBase64,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default {
  getWallets,
  signTransaction,
};
