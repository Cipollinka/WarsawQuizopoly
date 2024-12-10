import {Image, View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import {District} from '@/types';
import CustomText from '../ui/Text';
import Row from '../layout/Row';

import CloseIcon from '@/assets/icons/close.svg';
import MoneyIcon from '@/assets/icons/money.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  district: District | null;
}

export default function DistrictInfoModal({isOpen, onClose, district}: Props) {
  if (!district) return null;

  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#011627',
          // minWidth: 300,
          width: '100%',
        }}>
        <Row
          style={{
            width: '100%',
            marginBottom: 10,
            flexDirection: 'row-reverse',
          }}>
          <CloseIcon
            width={24}
            height={24}
            onPress={onClose}
            fill={'#fff'}
            stroke={'#fff'}
          />
        </Row>

        <View style={{marginTop: 10, width: '100%', alignItems: 'center'}}>
          <Image
            source={{uri: district.image}}
            style={{
              width: 250,
              height: 200,
              borderRadius: 24,
              overflow: 'visible',
            }}
            width={250}
            height={200}
          />
        </View>

        <View style={{marginTop: 10, gap: 8}}>
          <CustomText fw="bold" fs={24}>
            {district.name}
          </CustomText>

          <CustomText fw="bold" fs={18}>
            Difficulty: {district.difficulty === 1 ? 'Easy' : 'Hard'}
          </CustomText>

          <Row gap={5}>
            <CustomText fw="bold" fs={18}>
              Basic Income: {district.income}
            </CustomText>

            <MoneyIcon width={24} height={24} />
          </Row>

          <CustomText fw="bold" fs={18}>
            Description: {district.description}
          </CustomText>
        </View>
      </View>
    </CustomModal>
  );
}
