import {View, Image} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import {avatars, positions} from '@/constants/avatars';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (position: 0 | 1 | 2 | 3) => void;
  currentPosition: 0 | 1 | 2 | 3;
  onChangePosition: (position: 0 | 1 | 2 | 3) => void;
}

const renderItem = (item: 0 | 1 | 2 | 3) => (
  <View style={{width: 80, borderRadius: 9999, overflow: 'hidden'}}>
    <Image
      source={avatars[item]}
      style={{width: 80, height: 80}}
      resizeMode="cover"
    />
  </View>
);

export default function SelectAvatarModal({
  isOpen,
  onClose,
  onSelect,
  currentPosition,
  onChangePosition,
}: Props) {
  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          height: 200,
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#111111',
        }}>
        <View style={{marginBottom: 10}}>
          <CustomText fw="bold">Select Avatar</CustomText>
        </View>
        <HorizontalPicker
          data={positions}
          onChange={position => onChangePosition(position as any)}
          renderItem={renderItem}
          itemWidth={80}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Button title="Select" onPress={() => onSelect(currentPosition)} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </CustomModal>
  );
}
