import React from 'react';
import { Input, InputProps } from 'react-native-elements';

import { BaseComponentProps } from '@src/types/local';
import { testProps } from '@src/utils';

interface Props extends BaseComponentProps, Omit<InputProps, 'onChangeText' | 'onChange'> {
  onChange: InputProps['onChangeText'];
}

export default function TextInput({ value, onChange, testableID, ...rest }: Props) {
  const textValue = value?.toString() ?? value;

  return (
    <Input
      {...rest}
      onChangeText={onChange}
      value={textValue}
      {...testProps(testableID)}
      containerStyle={{ paddingHorizontal: 0 }}
    />
  );
}

TextInput.defaultProps = {} as Partial<Props>;
