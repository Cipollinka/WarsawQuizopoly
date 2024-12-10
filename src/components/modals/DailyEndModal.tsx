import {View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
}

export default function DailyEndModal({isOpen, onClose, isSuccess}: Props) {
  console.log('InvestModal isOpen', isOpen);

  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#011627',
          width: '100%',
        }}>
        <View style={{marginBottom: 10, marginTop: 20}}>
          <CustomText fw="bold" fs={22} style={{textAlign: 'center'}}>
            {isSuccess && 'Well Done!'}
            {!isSuccess && 'You answered the questions of the day!'}
          </CustomText>
        </View>

        <View style={{marginBottom: 10}}>
          <CustomText fs={18} style={{textAlign: 'center'}}>
            {isSuccess &&
              "Congratulations! You completed today's quiz, and your score exceeded 60%! As a reward, your balance has been doubled! Keep up the fantastic work and continue your adventure in Warsaw!"}

            {!isSuccess &&
              "Unfortunately, your score was below 60%. Don't be discouraged—every quiz is an opportunity to learn!"}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Button
            isFullWidth
            title={isSuccess ? 'Take' : 'OK'}
            onPress={onClose}
          />
        </View>
      </View>
    </CustomModal>
  );
}
