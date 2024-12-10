import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BackButton from '@/components/BackButton';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import Row from '@/components/layout/Row';
import {useUserStore} from '@/stores/userStore';
import districtsData from '@/constants/districts.json';
import {District as DistrictType} from '@/types';
import {Image, ScrollView, View} from 'react-native';

import MoneyIcon from '@/assets/icons/money.svg';
import District from './District';
import DistrictInfoModal from '@/components/modals/DistrictInfo';
import Button from '@/components/ui/Button';

export default function Profile() {
  const nav = useNavigation<UseNavigationProp>();

  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [currentDistrict, setCurrentDistrict] = useState<DistrictType | null>(
    null,
  );

  const districtsIds = useUserStore(state => state.capturedDistrictIds);
  const balance = useUserStore(state => state.balance);
  const username = useUserStore(state => state.username);
  const avatar = useUserStore(state => state.avatar);

  const isDistricts = districtsIds.length > 0;

  useEffect(() => {
    if (isDistricts) {
      const districts = districtsData.filter(district =>
        districtsIds.includes(district.id),
      );
      setDistricts(districts);
    }
  }, [districtsIds, isDistricts]);

  return (
    <BackgroundWrapper>
      <DistrictInfoModal
        isOpen={!!currentDistrict}
        onClose={() => setCurrentDistrict(null)}
        district={currentDistrict}
      />

      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />

          <Row gap={10}>
            <CustomText fw="bold" fs={22}>
              {username}
            </CustomText>

            {avatar && (
              <View>
                <Image
                  source={{uri: avatar}}
                  style={{
                    borderRadius: 9999,
                  }}
                  width={50}
                  height={50}
                />
              </View>
            )}
            {!avatar && (
              <View style={{borderRadius: 12, overflow: 'hidden'}}>
                <Image
                  source={require('@/assets/images/avatars/default.png')}
                  style={{
                    borderRadius: 9999,
                    width: 50,
                    height: 50,
                  }}
                  width={50}
                  height={50}
                />
              </View>
            )}
          </Row>
        </Row>

        <Row
          gap={5}
          mt={5}
          style={{flexDirection: 'row-reverse', width: '100%'}}>
          <MoneyIcon width={24} height={24} />
          <CustomText fw="bold" fs={20}>
            {balance}
          </CustomText>
        </Row>

        <View
          style={{
            backgroundColor: '#000',
            // width: '50%',
            padding: 16,
            borderRadius: 12,
            marginHorizontal: 'auto',
            marginTop: 25,
            alignItems: 'center',
            gap: 10,
          }}>
          <CustomText fw="bold" fs={20}>
            Districts Controlled: {districts.length}
          </CustomText>

          {isDistricts && (
            <Row gap={3}>
              <CustomText fw="bold" fs={20}>
                Total income:{' '}
                {districts.reduce((acc, curr) => acc + curr.income, 0)}
              </CustomText>
              <Row>
                <MoneyIcon width={24} height={24} />
                <CustomText fw="bold" fs={20}>
                  /hour
                </CustomText>
              </Row>
            </Row>
          )}
        </View>

        {!isDistricts && (
          <View
            style={{
              marginTop: 50,
              width: '100%',
              alignItems: 'center',
              gap: 20,
            }}>
            <CustomText fw="bold" fs={22} style={{textAlign: 'center'}}>
              No districts captured yet. You can capture them on map!
            </CustomText>
            <Button
              isFullWidth
              title="Go to map"
              onPress={() => nav.navigate(Screens.MAP)}
            />
          </View>
        )}

        {isDistricts && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Row
              style={{
                marginTop: 10,
                gap: 20,
                flexWrap: 'wrap',
                // marginHorizontal: 'auto',
                width: '100%',
                marginBottom: 40,
              }}>
              {districts.map(district => (
                <District
                  onPress={d => setCurrentDistrict(d)}
                  onInvestPress={() =>
                    nav.navigate(Screens.QUIZ, {isInvestment: true})
                  }
                  district={district}
                  key={district.id}
                  isInvestable
                />
              ))}
            </Row>
          </ScrollView>
        )}
      </Container>
    </BackgroundWrapper>
  );
}
