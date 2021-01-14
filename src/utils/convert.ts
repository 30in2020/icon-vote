import BigNumber from "bignumber.js";
import {
  VotesOnProposalOptionWithTotalVotedPower,
  VotesOnProposalOption,
} from "../types";

const _calculateVotedPowerPercent = (
  votedPower: BigNumber,
  totalVotedPower: BigNumber
) => {
  return !totalVotedPower.eq(0)
    ? votedPower.div(totalVotedPower).times(100).toFixed(0)
    : "0";
};

const convertVotedPowerToPercent = (
  data: VotesOnProposalOptionWithTotalVotedPower
) => {
  return data!.votesOnProposalOption.map(
    (voteOnProposalOption: VotesOnProposalOption) => ({
      name: voteOnProposalOption.item,
      percent: _calculateVotedPowerPercent(
        voteOnProposalOption.votedPower,
        data!.totalVotedPower
      ),
    })
  );
};

const convertToPercent = (
  num: BigNumber,
  deno: BigNumber,
  fix?: number
): number => {
  return Number(
    num
      .div(deno)
      .times(100)
      .toFixed(fix || 0)
  );
};

const convertICXValueToString = (number: BigNumber): string => {
  return number.div(Math.pow(10, 18)).toFixed(6);
};

const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
const convertICXValueToAbbreviateNumber = (number: BigNumber): string => {
  const icxValue = Number(number.div(Math.pow(10, 18)));
  const tier = (Math.log10(icxValue) / 3) | 0;
  if (tier === 0) return icxValue.toString();
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = icxValue / scale;
  return scaled.toFixed(1) + suffix;
};

const convertTimestampToString = (timestamp: number) => {
  const addSuffixToNumber = (num: number, str: string) =>
    `${num} ${str}${num !== 1 ? "s" : ""} left`;
  const targetDate = new Date(timestamp).getTime();
  const currentDate = new Date().getTime();

  if (targetDate - currentDate < 0) {
    return "Waiting for approval...";
  }

  let seconds = Math.floor((targetDate - currentDate) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  days = days - weeks * 7;
  hours = hours - weeks * 7 * 24 - days * 24;
  minutes = minutes - weeks * 7 * 24 * 60 - days * 24 * 60 - hours * 60;

  if (weeks > 0) {
    return addSuffixToNumber(weeks, "week");
  }
  if (days > 0) {
    return addSuffixToNumber(days, "day");
  }
  if (hours > 0) {
    return addSuffixToNumber(hours, "hour");
  }
  if (minutes > 0) {
    return addSuffixToNumber(minutes, "minute");
  }
  return "few seconds left";
};

const add0xPrefix = (address: string) => {
  return `0x${address}`;
};

const truncateHash = (txHash: string) => {
  return `${txHash.slice(0, 12)}...${txHash.slice(-12)}`;
};

export {
  convertICXValueToString,
  convertVotedPowerToPercent,
  convertToPercent,
  convertICXValueToAbbreviateNumber,
  convertTimestampToString,
  add0xPrefix,
  truncateHash,
};
