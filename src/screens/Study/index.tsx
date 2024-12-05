import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import study from '@/constants/study.json';
import Card from './Card';
import {ScrollView, View} from 'react-native';
import Row from '@/components/layout/Row';

export default function Study() {
  const nav = useNavigation<UseNavigationProp>();

  const handleExplorePress = (id: number) => {
    nav.navigate(Screens.STUDY_DETAILS, {id});
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Row gap={10} style={{paddingBottom: 10}}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText fw="bold" fs={22}>
            Study Warsaw
          </CustomText>
        </Row>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{gap: 20, marginTop: 40}}>
            {study.map(item => (
              <Card key={item.id} item={item} onPress={handleExplorePress} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
