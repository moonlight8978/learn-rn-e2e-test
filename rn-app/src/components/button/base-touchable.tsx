import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BaseComponentProps } from '@src/types/local';
import { testProps } from '@src/utils';

interface Props extends BaseComponentProps, TouchableOpacityProps {}

export default function BaseTouchable({ testableID }: Props) {
  return <TouchableOpacity {...testProps(testableID)} />;
}
