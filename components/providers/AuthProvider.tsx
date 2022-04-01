import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { useDidMount, useLocalstorageState } from "rooks";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface User {
  stableName: string;
  jwt: string;
  hasOver18: boolean;
  hasAcceptedTerms: boolean;
  accountType: "metamask" | "magic";
  stableAvatarUrls?: { original: string };
  email?: string;
}

interface IAuthContext {
  user: User | undefined;
  signIn: () => void;
  signOut: () => void;
  isSigningIn: boolean;
}

export const AuthContext = React.createContext<IAuthContext>({
  user: undefined,
  signIn: () => {},
  signOut: () => {},
  isSigningIn: false,
});

const zedApiBaseUrl =
  process.env.NEXT_PUBLIC_API_ROOT_URL ?? "https://api.dev.zed.run";

const ZedApiClient = applyCaseMiddleware(
  axios.create({
    baseURL: zedApiBaseUrl,
  })
);

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { provider, account, connector } = useWeb3React();
  const [isMounted, setIsMounted] = React.useState(false);
  useDidMount(() => setIsMounted(true));
  const [user, setUser] = useLocalstorageState<User | null>("user", null);
  const [isSigningIn, setIsSigningIn] = React.useState<boolean>(false);

  useEffect(() => {
    // Sign out if the jwt is expired or cannot be decoded
    if (isMounted && user) {
      try {
        const jwt = jwtDecode(user.jwt) as JwtPayload;
        if (jwt.exp > Date.now() / 1000) return;
      } catch (error) {
        console.log(error);
      }
      signOut();
    }
  }, [user]);

  const signIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      const {
        data: { message },
      } = await ZedApiClient.get<{ message: string }>(
        `/signing_message?address=${account}`
      );

      const signedMessage = await provider.getSigner().signMessage(message);

      const { data } = await ZedApiClient.post<User>("/users/login", {
        address: account,
        signedMessage,
      });

      setUser(data);

      ZedApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.jwt}`;
    } catch (error) {
      signOut();
      console.log(error);
    }

    setIsSigningIn(false);
  };

  const signOut = () => {
    setUser(null);
    connector.deactivate();
    delete ZedApiClient.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{ user: isMounted ? user : null, signIn, signOut, isSigningIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
