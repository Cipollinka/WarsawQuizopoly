import {ScrollView, View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: (isForever?: boolean) => void;
}

export default function ReferenceModal({isOpen, onClose}: Props) {
  console.log('InvestModal isOpen', isOpen);

  return (
    <CustomModal isVisible={isOpen} onClose={() => onClose()}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#011627',
          width: '100%',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 20}}>
            <CustomText fw="bold" fs={22}>
              Welcome to the Reference section!
            </CustomText>
            <View style={{gap: 10, marginTop: 10}}>
              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Old Town:{' '}
                </CustomText>
                Discover the historic center of Warsaw, known for its
                architectural beauty and cultural heritage. Palace of Culture
                and Science (Center): Learn more about this iconic building and
                its role in the life of the city.
              </CustomText>

              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Wilanów:{' '}
                </CustomText>
                Explore the Royal Palace and its enchanting gardens.
                Praga-North: Visit an area famous for its artistic atmosphere
                and lively cultural scene.
              </CustomText>

              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Żoliborz:{' '}
                </CustomText>
                Explore this green oasis filled with parks and cultural events.
              </CustomText>

              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Mokotów:{' '}
                </CustomText>
                Explore a dynamic area combining residential areas and business
                centers.
              </CustomText>

              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Ursus:{' '}
                </CustomText>
                Learn about a fast-growing neighborhood with a family
                atmosphere.
              </CustomText>

              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Białołęka:{' '}
                </CustomText>
                Discover a peaceful neighborhood ideal for family life.
              </CustomText>

              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Bemowo:{' '}
                </CustomText>
                Explore an area with a variety of recreational opportunities.
              </CustomText>

              <CustomText fs={18}>
                <CustomText fw="bold" fs={18}>
                  Downtown:{' '}
                </CustomText>
                Immerse yourself in the epicenter of Warsaw, where all the most
                interesting things happen!
              </CustomText>
            </View>

            <CustomText
              style={{marginTop: 20, textAlign: 'center'}}
              fw="bold"
              fs={20}>
              Press the buttons below to close this window and learn more about
              a specific neighborhood.
            </CustomText>
          </View>
        </ScrollView>
        <View
          style={{
            gap: 10,
            marginTop: 10,
          }}>
          <Button title="Explore" onPress={() => onClose()} />
          <Button
            title="Don't Show Again"
            onPress={() => onClose(true)}
            variant="red"
          />
        </View>
      </View>
    </CustomModal>
  );
}
