import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import {Image, ScrollView, StyleSheet} from 'react-native';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';
import districts from '@/constants/districts.json';
import District from './District';
import {useUserStore} from '@/stores/userStore';
import {District as DistrictType} from '@/types';
import DistrictInfoModal from '@/components/modals/DistrictInfo';

import MoneyIcon from '@/assets/icons/money.svg';

export default function Map() {
  const nav = useNavigation<UseNavigationProp>();
  const capturedDistrictIds = useUserStore(state => state.capturedDistrictIds);
  const [currentDistrict, setCurrentDistrict] = useState<DistrictType | null>(
    null,
  );
  const balance = useUserStore(state => state.balance);

  const handleCapturePress = (place: DistrictType) => {
    nav.navigate(Screens.QUIZ, {
      isCapture: true,
      capture: {
        difficulty: place.difficulty,
        districtId: place.id,
      },
    });
  };

  const handleInfoPress = (place: DistrictType) => {
    setCurrentDistrict(place);
  };

  return (
    <BackgroundWrapper>
      <DistrictInfoModal
        isOpen={!!currentDistrict}
        onClose={() => setCurrentDistrict(null)}
        district={currentDistrict}
      />

      <Row
        gap={10}
        style={{marginHorizontal: 10, justifyContent: 'space-between'}}>
        <BackButton onPress={() => nav.navigate(Screens.MAIN_MENU)} />

        <Row gap={5}>
          <CustomText fw="bold" fs={20}>
            {balance}
          </CustomText>

          <MoneyIcon width={24} height={24} />
        </Row>
      </Row>

      <ScrollView
        style={{flex: 1, position: 'relative', marginTop: 20}}
        showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            source={require('@/assets/images/map5.jpg')}
            style={{overflow: 'visible'}}
            // style={StyleSheet.absoluteFillObject}
          />

          {districts.map(district => (
            <District
              key={district.id}
              district={district}
              isCaptured={capturedDistrictIds.includes(district.id)}
              onCapturePress={handleCapturePress}
              onInfoPress={handleInfoPress}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </BackgroundWrapper>
  );
}
