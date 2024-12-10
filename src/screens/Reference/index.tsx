import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import Row from '@/components/layout/Row';
import ReferenceModal from '@/components/modals/ReferenceModal';
import {useUserStore} from '@/stores/userStore';
import Input from '@/components/ui/Input';

import reference from '@/constants/reference.json';
import {Reference as ReferenceType} from '@/types';
import useDebouncedEffect from 'use-debounced-effect';
import Card from './Card';
import {ScrollView, View} from 'react-native';
import CustomText from '@/components/ui/Text';

export default function Reference() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigation<UseNavigationProp>();
  const isReferenceModalClosedForever = useUserStore(
    state => state.isReferenceModalClosedForever,
  );
  const setIsReferenceModalClosedForever = useUserStore(
    state => state.setIsReferenceModalClosedForever,
  );
  const [currentReferences, setCurrentReferences] = useState<ReferenceType[]>(
    [],
  );

  const [search, setSearch] = useState('');
  const isSearchResults = currentReferences.length > 0;

  useEffect(() => setCurrentReferences(reference), []);

  useDebouncedEffect(
    () => {
      const filtered = reference.filter(
        district =>
          district.name.includes(search) ||
          district.description.includes(search),
      );
      setCurrentReferences(filtered);
    },
    300,
    [search],
  );

  useEffect(() => {
    if (!isReferenceModalClosedForever) {
      setIsModalOpen(true);
    }
  }, [isReferenceModalClosedForever]);

  return (
    <BackgroundWrapper>
      <ReferenceModal
        isOpen={isModalOpen}
        onClose={closeForever => {
          setIsModalOpen(false);
          if (closeForever) {
            setIsReferenceModalClosedForever(closeForever);
          }
        }}
      />

      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />

          <Input
            placeholder="Search..."
            value={search}
            style={{minWidth: '70%'}}
            onChangeText={setSearch}
          />
        </Row>

        {!isSearchResults && (
          <View
            style={{
              width: '100%',
              marginTop: 50,
              gap: 5,
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <CustomText fw="bold" fs={24}>
              No results found.
            </CustomText>
            <CustomText fw="bold" fs={24}>
              Try adjusting your search terms
            </CustomText>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          <View style={{gap: 20, marginBottom: 20}}>
            {currentReferences.map(reff => (
              <Card key={reff.id} district={reff} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
