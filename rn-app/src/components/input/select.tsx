import React from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withTheme } from 'react-native-elements';
import { fonts } from 'react-native-elements/src/config';

import Text from '../text';

const styles = {
  icon: {
    fontSize: 24,
  },
  label: (theme: any) => ({
    fontSize: 16,
    color: theme.colors.grey3,
    ...Platform.select({
      android: {
        ...fonts.android.bold,
      },
      default: {
        fontWeight: 'bold',
      },
    }),
  }),
  error: (theme: any) => ({
    margin: 5,
    fontSize: 12,
    color: theme.colors.error,
  }),
};

const pickerStyle = (theme: any) => ({
  inputIOS: {
    fontSize: 18,
    height: 40,
    justifyContent: 'center',
  },
  inputAndroid: {
    height: 40,
    fontSize: 18,
    justifyContent: 'center',
  },
  viewContainer: {
    borderBottomWidth: 1,
    borderColor: theme.colors.grey3,
  },
});

interface Props extends Omit<PickerSelectProps, 'onChange'> {
  onChange: (value: any) => any;
  label: string;
  placeholder: string;
  accessibilityLabel: string;
  theme: any;
  errorMessage?: string;
  touched?: boolean;
  onBlur: (e: any) => void;
}

const Caret = () => <Ionicons name="caret-down" style={styles.icon} />;

function Select({ placeholder, onChange, label, theme, touched, errorMessage, ...rest }: Props) {
  const error = (touched && errorMessage) || null;

  return (
    <>
      <Text style={styles.label(theme)} bold>
        {label}
      </Text>

      <RNPickerSelect
        {...rest}
        onValueChange={onChange}
        // @ts-expect-error
        style={pickerStyle(theme)}
        Icon={Caret}
        useNativeAndroidPickerStyle={false}
        doneText="確定"
        placeholder={placeholder ? { label: placeholder, value: null } : {}}
      />

      <Text style={styles.error(theme)}>{error}</Text>
    </>
  );
}

export default withTheme(Select, 'Input');

Select.defaultProps = {
  style: undefined,
  containerStyle: undefined,
  placeholder: undefined,
  touched: false,
  errorMessage: '',
} as Partial<Props>;
