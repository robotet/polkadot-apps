// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DeriveReferendumExt } from '@polkadot/api-derive/types';

import React, { useMemo } from 'react';
import { Table } from '@polkadot/react-components';

import Referendum from './Referendum';
import { useTranslation } from '../translate';

interface Props {
  className?: string;
  referendums?: DeriveReferendumExt[];
}

function Referendums ({ className, referendums }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const header = useMemo(() => [
    [t('referenda'), 'start', 2],
    [t('turnout'), 'hide-medium'],
    [t('remaining')],
    [t('activate')],
    [t('aye')],
    [t('nay')],
    [undefined, undefined, 2],
    [undefined, 'hide-small']
  ], [t]);

  return (
    <Table
      className={className}
      empty={referendums && t('No active referendums')}
      header={header}
    >
      {referendums?.map((referendum): React.ReactNode => (
        <Referendum
          key={referendum.index.toString()}
          value={referendum}
        />
      ))}
    </Table>
  );
}

export default React.memo(Referendums);
