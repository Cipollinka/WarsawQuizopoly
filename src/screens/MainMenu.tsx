import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import ProfileIcon from '@/assets/icons/profile.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import TrophyIcon from '@/assets/icons/trophy.svg';
import QuestionMarkIcon from '@/assets/icons/questionMark.svg';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Row from '@/components/layout/Row';
import {Image, View} from 'react-native';

export default function MainMenu() {
  const nav = useNavigation<UseNavigationProp>();
  return (
    <BackgroundWrapper>
      <Container>
        <Row mt={20} style={{justifyContent: 'space-between', width: '100%'}}>
          <Button
            icon={<ProfileIcon width={24} height={24} fill={'#fff'} />}
            onPress={() => nav.navigate(Screens.PROFILE)}
          />
          <Button
            icon={<TrophyIcon width={24} height={24} fill={'#fff'} />}
            onPress={() => nav.navigate(Screens.SCOREBOARD)}
          />
          <Button
            icon={<SettingsIcon width={24} height={24} fill={'#fff'} />}
            onPress={() => nav.navigate(Screens.SETTINGS)}
          />
        </Row>

        <View
          style={{
            width: '100%',
            marginTop: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('@/assets/images/mainMenu.png')}
            width={150}
            height={150}
            style={{width: 150, height: 150, borderRadius: 9999}}
          />
        </View>

        <View style={{width: '100%', marginTop: '10%', gap: 20}}>
          <Button
            title="Map of Warsaw"
            onPress={() => nav.navigate(Screens.MAP)}
          />
          <Button
            title="Reference"
            onPress={() => nav.navigate(Screens.REFERENCE)}
          />
          <Button
            title="Study Warsaw"
            onPress={() => nav.navigate(Screens.STUDY)}
          />
          <Button
            title="Daily questions"
            onPress={() =>
              nav.navigate(Screens.QUIZ, {
                isDaily: true,
              })
            }
          />
        </View>

        <View style={{marginTop: 20, gap: 20, marginLeft: 'auto'}}>
          <Button
            icon={<QuestionMarkIcon width={24} height={24} fill={'#fff'} />}
            // title="About us"
            onPress={() => nav.navigate(Screens.ABOUT)}
          />
        </View>
      </Container>
    </BackgroundWrapper>
  );
}
