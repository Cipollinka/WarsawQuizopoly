import {View, Image} from 'react-native';
import React from 'react';
import {Reference} from '@/types';
import CustomText from '@/components/ui/Text';

interface Props {
  district: Reference;
}

export default function Card({district}: Props) {
  return (
    <View
      style={{
        gap: 10,
        marginTop: 10,
        padding: 16,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#fff',
        width: '100%',
      }}>
      <Image
        source={{uri: district.image}}
        style={{
          width: '100%',
          height: 300,
          borderRadius: 24,
          overflow: 'visible',
        }}
      />
      <CustomText fw="bold" fs={24}>
        {district.name}
      </CustomText>
      <CustomText fs={18} style={{textAlign: 'justify'}}>
        {district.description}
      </CustomText>
    </View>
  );
}
