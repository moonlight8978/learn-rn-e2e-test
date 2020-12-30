import React from 'react';
import { View } from 'react-native';

import { colors } from '@src/config';
import Text from '../text';

interface Props {
  text?: string;
}

export default function Divider({ text }: Props) {
  return (
    <View style={{ marginTop: 8, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexGrow: 1, height: 1, backgroundColor: colors.black }} />
      {text && <Text>OR</Text>}
      <View style={{ flexGrow: 1, height: 1, backgroundColor: colors.black }} />
    </View>
  );
}
