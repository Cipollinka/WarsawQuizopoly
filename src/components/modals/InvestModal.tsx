import {View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  isCorrect: boolean;
  onClose: () => void;
}

export default function InvestModal({isOpen, onClose, isCorrect}: Props) {
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
            Your investment {isCorrect ? 'was' : 'was not'} successful!
          </CustomText>
        </View>

        <View style={{marginBottom: 10}}>
          <CustomText fs={18} style={{textAlign: 'center'}}>
            {isCorrect &&
              'Congratulations! Your investment in the district has been successful. Your balance has been doubled as a result of your wise investment. Keep up the great work, and keep an eye on future opportunities! '}

            {!isCorrect &&
              'Investment Failed! Unfortunately, your investment in the district has not been successful. Keep up the great work, and keep an eye on future opportunities! '}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Button title="Next district" onPress={onClose} />
        </View>
      </View>
    </CustomModal>
  );
}
