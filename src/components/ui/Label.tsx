import React from 'react';
import CustomText from './Text';

export default function Label({title}: {title: string}) {
  return (
    <CustomText fs={18} style={{marginBottom: 6, lineHeight: 16}}>
      {title}
    </CustomText>
  );
}
