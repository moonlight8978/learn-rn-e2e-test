import React from 'react';
import { CheckBox as RNCheckBox, CheckBoxProps } from 'react-native-elements';

import { BaseComponentProps } from '@src/types/local';
import { testProps } from '@src/utils';
import { colors } from '@src/config';

interface Props extends BaseComponentProps, Omit<CheckBoxProps, 'checked'> {
  onChange: (value: boolean) => void;
  value: boolean;
  label: string;
}

export default function Checkbox({ value, onChange, testableID, label, containerStyle, ...rest }: Props) {
  return (
    <RNCheckBox
      {...rest}
      title={label}
      checked={value}
      onPress={() => onChange(!value)}
      containerStyle={[
        {
          backgroundColor: colors.transparent,
          borderWidth: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        containerStyle,
      ]}
      activeOpacity={1}
      {...testProps(testableID)}
    />
  );
}
