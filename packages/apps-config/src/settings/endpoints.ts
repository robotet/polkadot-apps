// Copyright 2017-2020 @polkadot/apps-config authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TFunction } from 'i18next';
import { Option } from './types';

export interface LinkOption extends Option {
  dnslink?: string;
  isChild?: boolean;
}

interface EnvWindow {
  // eslint-disable-next-line camelcase
  process_env?: {
    WS_URL: string;
  }
}

function createDev (t: TFunction): LinkOption[] {
  return [
    {
      dnslink: 'local',
      info: 'local',
      text: t<string>('rpc.local', 'Local Node (Own, 127.0.0.1:9944)', { ns: 'apps-config' }),
      value: 'ws://127.0.0.1:9944'
    }
  ];
}

function createLive (t: TFunction): LinkOption[] {
  return [
    // fixed, polkadot
    {
      dnslink: 'ipci',
      info: 'ipci',
      text: t<string>('rpc.ipci', 'DAO IPCI Network (hosted by Airalab)', { ns: 'apps-config' }),
      value: 'wss://substrate.ipci.io'
    },
    {
      dnslink: 'kusama',
      info: 'kusama',
      text: t<string>('rpc.kusama.parity', 'Kusama (Polkadot Canary, hosted by Parity)', { ns: 'apps-config' }),
      value: 'wss://kusama-rpc.polkadot.io'
    }
  ];
}

function createTest (t: TFunction): LinkOption[] {
  return [
    {
      dnslink: 'rococo',
      info: 'rococo',
      text: t<string>('rpc.rococo', 'Robonomics Local Rococo (Polkadot Testnet, hosted by Airalab)', { ns: 'apps-config' }),
      value: 'wss://rpc.rococo.robonomics.network'
    },
    {
      info: 'rococoTrack',
      isChild: true,
      text: t<string>('rpc.rococo.robonomics', 'Robonomics (Rococo parachain, hosted by Airalab)', { ns: 'apps-config' }),
      value: 'wss://rpc.parachain.robonomics.network'
    }
  ];
}

function createCustom (t: TFunction): LinkOption[] {
  const WS_URL = (
    (typeof process !== 'undefined' ? process.env?.WS_URL : undefined) ||
    (typeof window !== 'undefined' ? (window as EnvWindow).process_env?.WS_URL : undefined)
  );

  return WS_URL
    ? [
      {
        isHeader: true,
        text: t<string>('rpc.custom', 'Custom environment', { ns: 'apps-config' }),
        value: ''
      },
      {
        info: 'WS_URL',
        text: t<string>('rpc.custom.entry', 'Custom {{WS_URL}}', { ns: 'apps-config', replace: { WS_URL } }),
        value: WS_URL
      }
    ]
    : [];
}

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../logos, specifically in namedLogos
//   text: The text to display on teh dropdown
//   value: The actual hosted secure websocket endpoint
export default function create (t: TFunction): LinkOption[] {
  return [
    ...createCustom(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
      value: ''
    },
    ...createLive(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.test', 'Test networks', { ns: 'apps-config' }),
      value: ''
    },
    ...createTest(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      value: ''
    },
    ...createDev(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
