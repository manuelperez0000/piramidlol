const startApp = {
    getWallet: async () => {
        const account = await window.ethereum.request({ method: "eth_requestAccounts" })
        const wallet = account[0]
        return wallet
    }
}

export default startApp