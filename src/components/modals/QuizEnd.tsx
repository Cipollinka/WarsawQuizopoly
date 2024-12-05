import {View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
  onInvest: () => void;
}

export default function QuizEndModal({
  isOpen,
  onClose,
  onInvest,
  isSuccess,
}: Props) {
  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#011627',
          width: '100%',
        }}>
        {/* <Image
          source={require('@/assets/images/gettingReady.png')}
          style={{width: '100%', height: 200, borderRadius: 24}}
        /> */}

        <View style={{marginBottom: 10, marginTop: 20}}>
          <CustomText fw="bold" fs={22} style={{textAlign: 'center'}}>
            {isSuccess && 'Result: Victory'}
            {!isSuccess && 'Result: Defeat'}
          </CustomText>
        </View>

        <View style={{marginBottom: 10}}>
          <CustomText fs={18} style={{textAlign: 'center'}}>
            {isSuccess &&
              `Congratulations! You have conquered this area! You've answered enough questions correctly to claim this area as yours! Your knowledge of its history, culture and sights is amazing! Now is your opportunity to invest in this area. `}

            {!isSuccess &&
              `Oops! You failed to conquer this area this time. Although you learned a lot about the area, you didn't have enough right answers to claim it as your own. Don't get discouraged, every quiz is a chance to learn more! Check the facts and try again.`}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            justifyContent: 'center',
          }}>
          {isSuccess && <Button title="Invest" onPress={onInvest} />}
          <Button title="Next district" onPress={onClose} />
        </View>
      </View>
    </CustomModal>
  );
}
