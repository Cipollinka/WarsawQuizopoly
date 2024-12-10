import {Image, View} from 'react-native';
import React from 'react';
import {IStudy} from '@/types';
import CustomText from '@/components/ui/Text';
import Button from '@/components/ui/Button';

interface Props {
  item: IStudy;
  onPress: (id: number) => void;
}

export default function Card({item, onPress}: Props) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative',
        marginBottom: 32,
        backgroundColor: '#091133',

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}>
      <Image
        source={{uri: item.image}}
        style={{
          width: '100%',
          height: 170,
          borderRadius: 24,
          overflow: 'visible',
        }}
        height={170}
      />

      <View style={{position: 'relative', gap: 10, marginTop: 15}}>
        <CustomText fw="bold" fs={22}>
          {item.name}
        </CustomText>
        <CustomText fs={18}>{item.descriptionShort}</CustomText>
        <Button
          style={{position: 'absolute', right: 0, paddingVertical: 10}}
          title="Read more"
          fs={18}
          onPress={() => onPress(item.id)}
        />
      </View>
    </View>
  );
}
