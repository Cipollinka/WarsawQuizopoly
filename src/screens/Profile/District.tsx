import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {District as DistrictT} from '@/types';
import Button from '@/components/ui/Button';

interface Props {
  district: DistrictT;
  onPress: (district: DistrictT) => void;
  onInvestPress: () => void;
  isInvestable: boolean;
}

export default function District({
  district,
  onPress,
  onInvestPress,
  isInvestable,
}: Props) {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(district)}>
        <Image
          source={{uri: district.image}}
          style={{
            width: 170,
            height: 130,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
          width={150}
          height={150}
        />
      </TouchableOpacity>

      <Button
        title="Invest"
        style={{
          padding: 0,
          paddingVertical: 10,
          borderRadius: 0,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        disabled={!isInvestable}
        onPress={onInvestPress}
      />
    </View>
  );
}
