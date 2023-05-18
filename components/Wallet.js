import { contractAddresses, abi } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"


export default function Wallet() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const Address = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [viewvalue, setviewvalue] = useState("0")


    const { runContractFunction: VIEWFUNCTION } = useWeb3Contract({
        abi: abi,
        contractAddress: Address, // specify the networkId
        functionName: "VIEWFUNCTION",
        params: {},
    })

    async function updateUIValues() {
        const viewFunction = (await VIEWFUNCTION()).toString()
        setviewvalue(viewFunction)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])


    return (
        <div>
            {(
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await VIEWFUNCTION()
                        }
                    >button
                    </button>
                    <div>Value: {viewvalue} </div>
                </>
            )}
        </div>
    )
}