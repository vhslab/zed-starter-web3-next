import {Biconomy} from "@biconomy/mexa";
import { ethers } from "ethers";

export const getEthersProvider = async web3Provider => {
  const biconomy = new Biconomy(
    web3Provider,
    {
      apiKey: process.env.NEXT_PUBLIC_BYCONOMY_API_KEY,
      debug: process.env.NODE_ENV === 'development'
    })

  return new Promise((resolve, reject) =>
    biconomy.onEvent(biconomy.READY, () => {
        resolve(new ethers.providers.Web3Provider(biconomy))
      }).onEvent(biconomy.ERROR, (error, message) =>
      reject(Object.assign(error, { message }))
    )
  )
}
