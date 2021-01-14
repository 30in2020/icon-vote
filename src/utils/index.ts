export * from "./convert";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
