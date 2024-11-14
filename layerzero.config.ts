import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

/**
 *  WARNING: ONLY 1 OFTAdapter should exist for a given global mesh.
 *  The token address for the adapter should be defined in hardhat.config. This will be used in deployment.
 *
 *  for example:
 *
 *    sepolia: {
 *         eid: EndpointId.SEPOLIA_V2_TESTNET,
 *         url: process.env.RPC_URL_SEPOLIA || 'https://rpc.sepolia.org/',
 *         accounts,
 *         oft-adapter: {
 *             tokenAddress: '0x0', // Set the token address for the OFT adapter
 *         },
 *     },
 */
const sepAdapter: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'MyOFTAdapter',
}

const arbAdapter: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'MyOFTAdapter',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: sepAdapter,
        },
        {
            contract: arbAdapter,
        },
    ],
    connections: [
        {
            from: sepAdapter,
            to: arbAdapter,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2), // block confirmations to wait for finality
                        optionalDVNThreshold: 0,
                        requiredDVNs: [ // DVNs to pay to verify
                            '0x8eebf8b423B73bFCa51a1Db4B7354AA0bFCA9193',
                        ],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5), // enforces DVNs waited for finality
                        optionalDVNThreshold: 0,
                        requiredDVNs: [ // enforces specific DVNs have verified
                            '0x8eebf8b423B73bFCa51a1Db4B7354AA0bFCA9193',
                        ],
                        optionalDVNs: [],
                    },
                },
            },
        },
        {
            from: arbAdapter,
            to: sepAdapter,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2), // block confirmations to wait for finality
                        optionalDVNThreshold: 0,
                        requiredDVNs: [ // DVNs to pay to verify
                            '0x53f488E93b4f1b60E8E83aa374dBe1780A1EE8a8',
                        ],
                        optionalDVNs: [],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2), // enforces DVNs waited for finality
                        optionalDVNThreshold: 0,
                        requiredDVNs: [ // enforces specific DVNs have verified
                            '0x53f488E93b4f1b60E8E83aa374dBe1780A1EE8a8',
                        ],
                        optionalDVNs: [],
                    },
                },
            },
        },
    ],
}

export default config
