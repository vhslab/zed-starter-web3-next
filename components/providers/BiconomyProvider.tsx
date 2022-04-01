import React, { useState } from "react";
import { Biconomy } from "@biconomy/mexa";
import { useWeb3React } from "@web3-react/core";

export const BiconomyContext = React.createContext(null);

export default function BiconomyProvider({ children }) {
  const { provider, account } = useWeb3React();
  const biconomyRef = React.useRef<Biconomy | null>(null);
  const [signerAddress, setSignerAddress] = useState<string | null>(null);

  React.useEffect(() => {
    // Only initialize Biconomy if there is a provider with a signer
    if (provider && account) {
      if (!biconomyRef.current) {
        const instance = new Biconomy(provider, {
          apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY,
          debug: process.env.NODE_ENV === "development",
        });
        biconomyRef.current = instance;
        setSignerAddress(account);
      } else if (signerAddress !== account) {
        // If there is already a Biconomy instance, but the signer changed, update the provider
        biconomyRef.current.provider = provider;
      }
    }
  }, [provider]);

  return (
    <BiconomyContext.Provider value={BiconomyContext}>
      {children}
    </BiconomyContext.Provider>
  );
}
