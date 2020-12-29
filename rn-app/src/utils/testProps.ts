import { Platform } from 'react-native';

const testProps = (testID?: string | null, testIDProp = 'testID') => {
  if (!testID) {
    return {};
  }

  if (Platform.OS === 'android') {
    return { accessibilityLabel: testID, [testIDProp]: testID };
  }

  return { [testIDProp]: testID, accessibilityHint: testID, accessibilityLabel: undefined };
};

export default testProps;
