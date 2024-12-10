import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {useUserStore} from '@/stores/userStore';
import {useSettingsStore} from '@/stores/settingsStore';
import Button from '@/components/ui/Button';
import Row from '@/components/layout/Row';
import {View} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import BackButton from '@/components/BackButton';

export default function Settings() {
  const nav = useNavigation<UseNavigationProp>();
  const setUsername = useUserStore(state => state.setUsername);

  const clearUserStore = useUserStore(state => state.clear);
  const resetUserStore = useUserStore(state => state.reset);
  const clearSettingsStore = useSettingsStore(state => state.clear);
  const musicVolume = useSettingsStore(state => state.musicVolume);
  const setMusicVolume = useSettingsStore(state => state.setMusicVolume);

  const vibrationForce = useSettingsStore(state => state.vibrationForce);
  const setVibrationForce = useSettingsStore(state => state.setVibrationForce);

  const handleReset = () => {
    resetUserStore();

    nav.navigate(Screens.MAIN_MENU);
  };

  const handleDeleteAccount = () => {
    clearUserStore();
    clearSettingsStore();

    AsyncStorage.clear();

    nav.navigate(Screens.CREATE_ACCOUNT);
  };

  const handleLogOut = () => {
    setUsername('');
    setPassword('');
    setIsGuest(false);

    nav.navigate(Screens.CREATE_ACCOUNT);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <BackButton onPress={() => nav.goBack()} />

        <View style={{width: '100%', marginTop: '20%'}}>
          <Row gap={10}>
            {/* <MusicIcon width={40} height={40} stroke="#000" fill="#fff" /> */}

            <View style={{gap: 6, width: '100%'}}>
              <CustomText fw="bold" fs={20}>
                Adjust Music Volume
              </CustomText>
              <Slider
                style={{width: '86%'}}
                minimumValue={0}
                maximumValue={1}
                value={musicVolume}
                onValueChange={setMusicVolume}
              />
            </View>
          </Row>
        </View>

        <View style={{marginTop: 40, width: '100%'}}>
          <Row gap={10}>
            <View style={{gap: 6, width: '86%'}}>
              <CustomText fw="bold" fs={20}>
                Vibration Sensitivity
              </CustomText>
              <Slider
                minimumValue={0}
                maximumValue={1}
                value={vibrationForce}
                onValueChange={setVibrationForce}
              />
            </View>
          </Row>
        </View>

        <View style={{marginTop: 40, width: '100%', gap: 10}}>
          <Button
            fs={20}
            title="Reset Progress"
            onPress={handleReset}
            isFullWidth
          />

          <Button
            fs={20}
            title="Delete Account"
            onPress={handleDeleteAccount}
            isFullWidth
            variant="red"
          />
        </View>
      </Container>
    </BackgroundWrapper>
  );
}
