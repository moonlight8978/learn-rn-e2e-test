import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';

import { BaseComponentProps } from '@src/types';
import { testProps } from '@src/utils';

interface Props extends BaseComponentProps, ButtonProps {}

export default function ({ testableID, ...rest }: Props) {
  return <Button {...rest} {...testProps(testableID)} />;
}
