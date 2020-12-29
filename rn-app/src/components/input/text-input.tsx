import React from 'react';
import { Input, InputProps } from 'react-native-elements';

import { BaseComponentProps } from '@src/types/local';
import { testProps } from '@src/utils';

interface Props extends BaseComponentProps, Omit<InputProps, 'onChangeText' | 'onChange'> {
  onChange: InputProps['onChangeText'];
  touched: boolean;
}

export default function TextInput({ value, onChange, testableID, errorMessage, touched, ...rest }: Props) {
  const textValue = value?.toString() ?? value;

  return (
    <Input
      {...rest}
      onChangeText={onChange}
      value={textValue}
      containerStyle={{ paddingHorizontal: 0 }}
      errorMessage={(touched && errorMessage) || undefined}
      {...testProps(testableID)}
    />
  );
}

TextInput.defaultProps = {} as Partial<Props>;
