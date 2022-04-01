import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Magic } from "@web3-react/magic";

import {
  hooks as metaMaskHooks,
  metaMask,
} from "../../util/connectors/metaMask";
import { hooks as magicHooks, magic } from "../../util/connectors/magic";

const connectors: [MetaMask | Magic, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [magic, magicHooks],
];

export default function Web3Provider({ children }) {
  return (
    <Web3ReactProvider connectors={connectors} lookupENS={false}>
      {children}
    </Web3ReactProvider>
  );
}
