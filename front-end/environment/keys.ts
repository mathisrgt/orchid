if (process.env.PRIVATE_KEY === undefined)
  throw new Error("PRIVATE_KEY is undefined");
export const adminPrivateKey = process.env.PRIVATE_KEY;

// if (process.env.NEXT_PUBLIC_OTHER_STAGE_URL === undefined)
//   throw new Error("NEXT_PUBLIC_OTHER_STAGE_URL is undefined");
// export const otherStageURL = process.env.NEXT_PUBLIC_OTHER_STAGE_URL;
