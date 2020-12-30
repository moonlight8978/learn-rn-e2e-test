import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';
import React, { ReactNode, useMemo } from 'react';

import { BaseComponentProps } from '@src/types';
import { testProps } from '@src/utils';

interface Props extends BaseComponentProps, TextProps {
  size?: 'small' | 'medium' | 'large';
  bold?: boolean;
  children: ReactNode;
}

const fontSizes = {
  small: 14,
  medium: 16,
  large: 18,
};

export default function Text({ testableID, size, style, bold, ...rest }: Props) {
  const styles = useMemo<StyleProp<TextStyle>>(
    () => [style, { fontSize: fontSizes[size] }, { fontWeight: bold ? 'bold' : '400' }],
    [size, style, bold]
  );

  return <RNText {...rest} {...testProps(testableID)} style={styles} />;
}

Text.defaultProps = {
  size: 'medium',
  bold: false,
} as Partial<Props>;
