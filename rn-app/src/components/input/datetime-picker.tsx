import React, { useCallback, useState } from 'react';
import RNDateTimePicker, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { BaseComponentProps } from '@src/types';
import { testProps } from '@src/utils';
import Text from '../text';
import { BaseTouchable } from '../button';

import TextInput from './text-input';

interface Props extends BaseComponentProps, Omit<ReactNativeModalDateTimePickerProps, 'onChange'> {
  onChange: ReactNativeModalDateTimePickerProps['onConfirm'];
  label: string;
  onBlur: (event: any) => void;
  format?: (value?: Date | null) => string;
  initialValue?: Date | null;
  value?: Date | null;
  errorMessage?: string;
  touched: boolean;
}

const HeaderIOS = () => (
  <View style={{ alignSelf: 'center', paddingTop: 12 }}>
    <Text bold size="large">
      Please choose date
    </Text>
  </View>
);

export default function DatetimePicker({
  onChange,
  onBlur,
  label,
  initialValue,
  value,
  format,
  testableID,
  touched,
  errorMessage,
  ...rest
}: Required<Props>) {
  const [visible, setVisible] = useState(false);
  const hideDatePicker = useCallback(() => setVisible(false), []);
  const showDatePicker = useCallback(() => setVisible(true), []);
  const changeHandler = useCallback(
    (date) => {
      hideDatePicker();
      onChange(date);
    },
    [onChange, hideDatePicker]
  );
  const cancelHandler = useCallback(() => {
    hideDatePicker();
    onBlur({ target: {} });
  }, [hideDatePicker, onBlur]);

  return (
    <>
      <BaseTouchable onPress={showDatePicker} activeOpacity={1} testableID={`${testableID}-trigger`}>
        <TextInput
          value={format(value || initialValue)}
          label={label}
          disabled
          errorMessage={errorMessage}
          touched={touched}
          disabledInputStyle={{ opacity: 1 }}
        />
      </BaseTouchable>

      <RNDateTimePicker
        {...rest}
        isVisible={visible}
        onConfirm={changeHandler}
        onCancel={cancelHandler}
        cancelTextIOS="Cancel"
        confirmTextIOS="OK"
        customHeaderIOS={HeaderIOS}
        date={value || initialValue || undefined}
        {...testProps(testableID)}
      />
    </>
  );
}

DatetimePicker.defaultProps = {
  format: (date?: Date) => date && dayjs(date).format('YYYY-MM-DD'),
  value: undefined,
  initialValue: undefined,
  onBlur: () => {},
} as Partial<Props>;
