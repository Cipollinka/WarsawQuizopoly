import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components//layout/Wrapper';
// import CustomText from '@/components/ui/Text';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserStore} from '@/stores/userStore';
import Button from '@/components/ui/Button';
import SelectAvatarModal from '@/components/modals/SelectAvatar';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import {avatars} from '@/constants/avatars';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccErrorModal from '@/components/modals/AccError';
import GettingReady from '@/components/modals/GettingReady';

export default function CreateAccount() {
  const nav = useNavigation<UseNavigationProp>();

  const [isSelectAvatarModalOpen, setIsSelectAvatarModalOpen] = useState(false);
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);

  const username = useUserStore(state => state.username);
  const avatar = useUserStore(state => state.avatar);

  const setAvatar = useUserStore(state => state.setAvatar);
  const setUsername = useUserStore(state => state.setUsername);

  const selectedAvatarPosition = useUserStore(
    state => state.selectedAvatarPosition,
  );
  const setSelectedAvatarPosition = useUserStore(
    state => state.setSelectedAvatarPosition,
  );

  const [currentAvatarPosition, setCurrentAvatarPosition] = useState<
    0 | 1 | 2 | 3
  >(0);
  const isAvatarSelected = selectedAvatarPosition !== null || avatar;
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const data = await AsyncStorage.getItem('user');
    if (!data) {
      return;
    }

    const parsed = JSON.parse(data);

    const _username = parsed.state.username;

    if (_username) {
      nav.navigate(Screens.MAIN_MENU);
    }
  };

  const handleSelectAvatar = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        selectedImageUri && setAvatar(selectedImageUri);
      }
    });
  };

  const handleSelectPresetAvatar = (pos: 0 | 1 | 2 | 3) => {
    setSelectedAvatarPosition(pos);
    setIsSelectAvatarModalOpen(false);
  };
  const onSelectAvatarClose = () => {
    setIsSelectAvatarModalOpen(false);
  };

  const handleContinue = () => {
    if (!username) {
      setIsError(true);
      return;
    }
    setIsContinueModalOpen(true);
  };

  return (
    <BackgroundWrapper>
      <SelectAvatarModal
        isOpen={isSelectAvatarModalOpen}
        onClose={onSelectAvatarClose}
        onChangePosition={position => setCurrentAvatarPosition(position)}
        currentPosition={currentAvatarPosition}
        onSelect={handleSelectPresetAvatar}
      />
      <AccErrorModal isOpen={isError} onClose={() => setIsError(false)} />
      <GettingReady
        isOpen={isContinueModalOpen}
        onClose={() => {
          setIsContinueModalOpen(false);
          nav.navigate(Screens.MAIN_MENU);
        }}
      />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 16,
          marginTop: '20%',
        }}>
        <View>
          <TouchableOpacity
            disabled={!!isAvatarSelected}
            style={styles.avatarContainer}
            onPress={handleSelectAvatar}>
            {selectedAvatarPosition !== null ? (
              <Image
                // @ts-ignore
                source={avatars[selectedAvatarPosition]}
                style={styles.avatar}
                width={150}
                height={150}
              />
            ) : avatar ? (
              <Image source={{uri: avatar}} style={styles.avatar} />
            ) : (
              <Image
                source={require('@/assets/images/avatars/default.png')}
                style={styles.avatar}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
          {isAvatarSelected && (
            <Button
              title="Remove"
              onPress={() => {
                setAvatar('');
                setSelectedAvatarPosition(null);
              }}
            />
          )}
          {!isAvatarSelected && (
            <Button
              title="Select Avatar"
              onPress={() => setIsSelectAvatarModalOpen(true)}
            />
          )}
        </View> */}

        <View style={{gap: 20, marginTop: 40, width: '100%'}}>
          <View>
            <Label title="Username" />
            <Input
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor="#000"
              style={{color: '#000'}}
            />
          </View>

          <Button title="Continue" onPress={handleContinue} fs={22} />

          <Button
            variant="red"
            style={{paddingVertical: 10}}
            title="Reset"
            onPress={() => {
              setUsername('');
              setAvatar('');
              setSelectedAvatarPosition(null);
            }}
            fs={18}
          />
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  placeholderAvatar: {
    width: 150,
    height: 150,
    borderRadius: 9999,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#000',
  },
});
