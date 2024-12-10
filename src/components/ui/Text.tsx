import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';

const fontWeights = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  semibold: 'Roboto-SemiBold',
};

const CustomText = ({
  style,
  fw = 'regular',
  fs = 16,
  ...props
}: {
  style?: StyleProp<TextStyle>;
  fw?: 'regular' | 'bold' | 'semibold';
  fs?: number;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={[
        styles.text,
        {fontFamily: fontWeights[fw], fontSize: fs || 16},
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default CustomText;
