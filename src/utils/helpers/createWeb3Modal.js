import Web3Modal, {connectors} from 'web3modal';
import mathLogo from '../../assets/web3Modal/math-wallet.svg';
import trustLogo from '../../assets/web3Modal/trust-wallet.svg';
import safePalLogo from '../../assets/web3Modal/safepal-wallet.svg';

export const createWeb3Modal = () =>
    new Web3Modal({
        network: 'binance',
        cacheProvider: true,
        providerOptions: {
            injected: {
                display: {
                    name: 'MetaMask',
                    description: 'MetaMask Wallet',
                },
            },
            'custom-math': {
                display: {
                    name: 'Math',
                    description: 'Math Wallet',
                    logo: mathLogo,
                },
                package: 'math',
                connector: connectors.injected,
            },
            'custom-twt': {
                display: {
                    name: 'Trust',
                    description: 'Trust Wallet',
                    logo: trustLogo,
                },
                package: 'twt',
                connector: connectors.injected,
            },
            'custom-safepal': {
                display: {
                    name: 'SafePal',
                    description: 'SafePal App',
                    logo: safePalLogo,
                },
                package: 'safepal',
                connector: connectors.injected,
            },
        },
    });
