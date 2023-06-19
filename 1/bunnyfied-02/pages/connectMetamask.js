import MetaMask from "../components/MetaMask";
import { DAppProvider, Theta, ThetaTestnet } from "@usedapp/core";

export default function Home() {
  return (
    <DAppProvider
      config={{
        networks: [ThetaTestnet, Theta],
        readOnlyChainId: ThetaTestnet.chainId, // The chain Id of current chain you are working with.
        readOnlyUrls: {
          [ThetaTestnet.chainId]: ThetaTestnet.rpcUrl,
          [Theta.chainId]: Theta.rpcUrl,
        },
        multicallAddresses: {
          [ThetaTestnet.chainId]: ThetaTestnet.multicallAddress,
          [Theta.chainId]: Theta.multicallAddress,
        },
      }}
    >
      <MetaMask />
    </DAppProvider>
  );
}
