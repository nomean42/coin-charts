import React from "react";

export const WalletContext = React.createContext({
	walletAddress: undefined,
	setWalletAddress: (address) => {},
});
