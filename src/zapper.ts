import axios from 'axios';
import { Wallet, utils, providers } from 'ethers';
import { Hop } from '@hop-protocol/sdk';

const inst = axios.create({
    baseURL: 'https://api.zapper.fi/v1/zap-in/interest-bearing/aave-v2/',
    timeout: 5000,
});

// MOVE API KEY TO .env
const API_KEY = '';

/**
 * Transfer tokens from one address on a given network to another address using hop
 */
/**
 * Send tokens between different layers using hop exchange
 * @param {string} assetSymbol - asset symbol
 * @param {assetDecimals} assetDecimals - asset decimals
 * @param {string} fromNetwork - Network of the sender
 * @param {string} toNetwork - string of the receiver
 * @param {bigint} amount - Amount of Tokens to send
 * @returns {Promise<bigint>}  Transaction Response
 */
export const sendHop = async (
    assetSymbol: string,
    assetDecimal: number,
    fromNetwork: string, // name of network
    toNetwork: string, // to network
    amount: string,
    privateKey: string,
): Promise<any> => {
    const hop = new Hop('mainnet');

    // figure this out... is this the right way to do it?
    const newProvider = new providers.AlchemyProvider(fromNetwork.toLowerCase());

    const walletSigner = new Wallet(privateKey, newProvider);

    const bridge = hop.connect(walletSigner).bridge(assetSymbol.toUpperCase());

    const amountBN = utils.parseUnits(amount, assetDecimal);

    const hopTransaction = await bridge.send(amountBN, fromNetwork, toNetwork);

    return hopTransaction;
};

/**
 * Aave Zap In to DAI on the Polygon Network
 */
export const zapInDAIonPolygon = async ({
    ownerAddress, // Address of the owner of the zap
    sellTokenAddress, // Address of the token to sell (WETH)
    sellAmount, // in WEI
    poolAddress, // Address of the pool to zap into (amDAI)
    payoutTokenAddress, // Address of the token to receive
    privateKey, // Private key of the owner of the wallet
}: any) => {
    // Check Zap Allowance
    const network = 'polygon';

    const allowance = await inst.get(`approval-state?sellTokenAddress=${sellTokenAddress}&ownerAddress=${ownerAddress}&api_key=${API_KEY}&network=${network}`);

    // approve to send WETH manually for now..

    // Set Allowance if needed
    if (allowance.data.isApproved) {
        const slippagePercentage = 0.03;
        try {
            // Zap In DAI
            const newProvider = new providers.AlchemyProvider('matic');
            const walletSigner = new Wallet(privateKey, newProvider);

            const zapIn = await inst.get(
                `transaction?ownerAddress=${ownerAddress}&sellTokenAddress=${sellTokenAddress}&sellAmount=${sellAmount}&poolAddress=${poolAddress}&payoutTokenAddress=${payoutTokenAddress}&slippagePercentage=${slippagePercentage}&network=${network}&api_key=${API_KEY}`
            );

            const zapInTransaction = await walletSigner.sendTransaction({
                to: zapIn.data.to,
                data: zapIn.data.data,
                gasPrice: zapIn.data.gasPrice,
            });

            return zapInTransaction;
        } catch (error: any) {
            return error.message;
        }
    }
};
