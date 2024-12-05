import {Image, View} from 'react-native';
import React, {useMemo} from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';
import {useUserStore} from '@/stores/userStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const randomNumber = Math.floor(Math.random() * 100);

export default function GettingReady({isOpen, onClose}: Props) {
  const random = useMemo(
    () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    [],
  );
  const addBalance = useUserStore(state => state.addBalance);

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
          <CustomText fw="bold" fs={20} style={{textAlign: 'center'}}>
            Welcome to the game where you will become the real owner of Warsaw!
            Capture the neighborhoods, answer interesting questions and discover
            the wealth of history and culture of this wonderful city. To
            celebrate your start, we have prepared the first bonus for you!
          </CustomText>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-treasure-chest-illustration-png-image_9243267.png',
            }}
            style={{overflow: 'visible'}}
            width={200}
            height={200}
          />
          <CustomText fw="bold" fs={24} style={{textAlign: 'center'}}>
            {random}!
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
            title="Collect bonus"
            onPress={() => {
              addBalance(random);
              onClose();
            }}
            isFullWidth
          />
        </View>
      </View>
    </CustomModal>
  );
}
