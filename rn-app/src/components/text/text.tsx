import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';
import React, { ReactNode, useMemo } from 'react';

import { BaseComponentProps } from '@src/types';
import { testProps } from '@src/utils';
import { colors } from '@src/config';

const fontSizes = {
  small: 14,
  medium: 16,
  large: 18,
};

interface Props extends BaseComponentProps, TextProps {
  size?: 'small' | 'medium' | 'large';
  bold?: boolean;
  children: ReactNode;
  color?: string;
}

export default function Text({ testableID, size, style, bold, color, ...rest }: Required<Props>) {
  const styles = useMemo<StyleProp<TextStyle>>(
    () => [{ fontSize: fontSizes[size] }, { fontWeight: bold ? 'bold' : '400' }, { color: color }, style],
    [size, style, bold, color]
  );

  return <RNText {...rest} {...testProps(testableID)} style={styles} />;
}

Text.defaultProps = {
  size: 'medium',
  bold: false,
  color: colors.black,
} as Partial<Props>;
