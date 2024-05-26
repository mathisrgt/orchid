import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { SuiClient } from "@mysten/sui.js/client";
import { generateRandomness, generateNonce } from "@mysten/zklogin";

import {
  CLIENT_ID,
  FULLNODE_URL,
  KEY_PAIR_SESSION_STORAGE_KEY,
  MAX_EPOCH_LOCAL_STORAGE_KEY,
  RANDOMNESS_SESSION_STORAGE_KEY,
  REDIRECT_URI,
  STEPS_LABELS_TRANS_KEY,
  SUI_DEVNET_FAUCET,
  SUI_PROVER_DEV_ENDPOINT,
  USER_SALT_LOCAL_STORAGE_KEY,
} from "./constant";

async function zkLogin() {
  // Step 1
  const ephemeralKeyPair = Ed25519Keypair.generate();
  const privateKey = ephemeralKeyPair.export().privateKey;

  console.log("Ephemeral Key Pair: ", ephemeralKeyPair);
  console.log("Private Key: ", privateKey);

  // Step 2

  const suiClient = new SuiClient({ url: FULLNODE_URL });

  // Fetch current epoch
  const { epoch } = await suiClient.getLatestSuiSystemState();
  const maxEpoch = Number(epoch) + 10;

  const randomness = generateRandomness();

  const nonce = generateNonce(
    ephemeralKeyPair.getPublicKey(),
    maxEpoch,
    randomness
  );
}
