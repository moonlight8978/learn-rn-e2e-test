import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BaseComponentProps } from '@src/types/local';
import { testProps } from '@src/utils';

interface Props extends BaseComponentProps, TouchableOpacityProps {
  children: ReactNode;
}

export default function BaseTouchable({ testableID, children, ...rest }: Props) {
  return (
    <TouchableOpacity {...testProps(testableID)} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
