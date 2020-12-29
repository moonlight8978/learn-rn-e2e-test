import React from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { Platform, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withTheme } from 'react-native-elements';
import { fonts } from 'react-native-elements/src/config';

import { colors } from '@src/config';
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
};

const pickerStyle = (theme: any) => ({
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    fontSize: 18,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    fontSize: 18,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  viewContainer: {
    borderBottomWidth: 1,
    borderColor: theme.colors.grey3,
  },
});

interface Props
  extends Omit<
    PickerSelectProps,
    'onValueChange' | 'style' | 'Icon' | 'useNativeAndroidPickerStyle' | 'doneText' | 'placeholder'
  > {
  onChange: (value: any) => any;
  label: string;
  placeholder: string;
  accessibilityLabel: string;
  theme: any;
}

const Caret = () => <Ionicons name="caret-down" style={styles.icon} />;

function Select({ placeholder, onChange, label, theme, ...rest }: Props) {
  return (
    <>
      <Text style={styles.label(theme)} bold>
        {label}
      </Text>

      <RNPickerSelect
        {...rest}
        onValueChange={onChange}
        style={pickerStyle(theme)}
        Icon={Caret}
        useNativeAndroidPickerStyle={false}
        doneText="確定"
        placeholder={placeholder ? { label: placeholder, value: null } : {}}
      />
    </>
  );
}

export default withTheme(Select, 'Input');

Select.defaultProps = {
  style: undefined,
  containerStyle: undefined,
  placeholder: undefined,
} as Partial<Props>;
