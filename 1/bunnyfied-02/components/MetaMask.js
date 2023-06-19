import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
export default function MetaMask() {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account, { chainId });

  return (
    <div>
      <div>
        {!account ? (
          <div
            className="flex w-full"
            style={{
              justifyContent: "center",
            }}
          >
            <button onClick={activateBrowserWallet}>Connect Wallet</button>
          </div>
        ) : (
          <div>
            <h1>Congrulations you have sucessfully connected to metamask</h1>
            <h1>Wallet Address: {account}</h1>
            {etherBalance && (
              <h1>
                Balance: {`${parseFloat(formatEther(etherBalance)).toFixed(3)}`}
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
