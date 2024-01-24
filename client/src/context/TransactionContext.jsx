// import React, { useEffect, useState, useContext } from 'react';
// import { ethers, parseEther, toNumber, parseUnits, toBeHex } from 'ethers';



// import { contractABI, contractAddress } from '../utils/constant';
// export const TransactionContext = React.createContext();

// const { ethereum } = window;

// const createEthereumContract = async () => {
//     const provider = new ethers.BrowserProvider(window.ethereum)
//     const signer = await provider.getSigner();
//     const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
//     console.log('Contract ABI:', contractABI);
//     console.log('Contract Address:', contractAddress);
//     console.log('Transaction Contract:', transactionsContract);


//     return transactionsContract;
// }
// // getEthereumContract();



// export const TransactionProvider = ({ children }) => {
//     const [currentAccount, setCurrentAccount] = useState()
//     const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
//     const [isLoading, setIsLoading] = useState(false)
//     const [transactions,setTransactions] = useState([]);
//     const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))



//     const handleChange = (e, name) => {
//         setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))

//     }

//     const getAllTransactions = async () => {
//         try {
//             if (ethereum) {
//               const transactionsContract = createEthereumContract();
      
//               const availableTransactions = await transactionsContract.getAllTransactions();
      
//               const structuredTransactions = availableTransactions.map((transaction) => ({
//                 addressTo: transaction.receiver,
//                 addressFrom: transaction.sender,
//                 timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
//                 message: transaction.message,
//                 keyword: transaction.keyword,
//                 amount: toBeHex(parseInt(transaction.amount)) / (10 ** 18)
//               }));
      
//               console.log(structuredTransactions);
      
//               setTransactions(structuredTransactions);
//             } else {
//               console.log("Ethereum is not present");
//             }
//           } catch (error) {
//             console.log(error);
//           }
//     };
  


//     const checkIfWalletIsConnected = async () => {

//         try {
//             if (!ethereum) return alert("Please install metamask")

//             const accounts = await ethereum.request({ method: 'eth_accounts' });

//             if (accounts.length) {
//                 setCurrentAccount(accounts[0]);

//                 getAllTransactions();   
//             }
//             else {
//                 console.log("No accounts found")
//             }
//         } catch (error) {
//             console.log(error)
//             throw new Error("No ethereum object.")


//         }



//     }

//     const checkIfTransactionsExists = async () => {
//         try {
//           if (ethereum) {
//             const transactionsContract = createEthereumContract();
//             const currentTransactionCount = await transactionsContract.getTransactionCount();
    
//             window.localStorage.setItem("transactionCount", currentTransactionCount);
//           }
//         } catch (error) {
//           console.log(error);
    
//           throw new Error("No ethereum object");
//         }
//       };


//     const connectWallet = async () => {
//         try {
//             if (!ethereum) return alert("Please install metamask")

//             const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
//             setCurrentAccount(accounts[0])
//         } catch (error) {
//             console.log(error)

//             throw new Error("No ethereum object.")
//         }
//     }


//     const sendTransaction = async () => {
//         try {
//             if (!ethereum) return alert("Please install metamask")
//             const { addressTo, amount, keyword, message } = formData;
//             const transactionsContract = await createEthereumContract();
//             const parsedAmount = parseEther(amount);
//             // const amt =
//             // console.log('parsedAmount:', parsedAmount.toString());
//             await ethereum.request({
//                 method: "eth_sendTransaction",
//                 params: [{
//                     from: currentAccount,
//                     to: addressTo,
//                     gas: "0x5208", //21000 GWEI
//                     value: toBeHex(parsedAmount),
//                 }]
//             })
            

//             const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, keyword, message);
//             setIsLoading(true);
//             console.log(`Loading - ${transactionHash.hash}`);
//             await transactionHash.wait();
//             setIsLoading(false);
//             console.log(`Success - ${transactionHash.hash}`);

//             const transactionCount = await transactionsContract.getTransactionCount();
//             setTransactionCount(transactionCount.toNumber())

//         } catch (error) {
//             console.log(error)
//             throw new Error("No ethereum object.")
//         }
//     }



//     useEffect(() => {
//         checkIfWalletIsConnected();
//         checkIfTransactionsExists();
//     }, [transactionCount])

//     return (
//         <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, setFormData, sendTransaction, transactions,isLoading }}>
//             {children}
//         </TransactionContext.Provider>
//     )
// }

import React, { useEffect, useState } from "react";
import { ethers, parseEther, toNumber, parseUnits, toBeHex } from 'ethers';

import { contractABI, contractAddress } from "../utils/constant";

export const TransactionContext = React.createContext();

// const { ethereum } = window;

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner();
      const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log('Contract ABI:', contractABI);
      console.log('Contract Address:', contractAddress);
      console.log('Transaction Contract:', transactionsContract);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(toNumber(transaction.timestamp) * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = await createEthereumContract();
            const parsedAmount = parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value:toBeHex(parsedAmount)
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionCount = await transactionsContract.getTransactionCount();

        setTransactionCount(toNumber(transactionCount));
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};