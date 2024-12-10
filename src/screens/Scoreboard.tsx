import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import Row from '@/components/layout/Row';
import {useUserStore} from '@/stores/userStore';
import {Image, ScrollView, View} from 'react-native';

import FactoryIcon from '@/assets/icons/factory.svg';
import MoneyIcon from '@/assets/icons/money.svg';

interface IPlayer {
  username: string;
  balance: number;
  districts: number;
  avatar: string;
}

const players = [
  {
    username: 'UrbanKing',
    balance: 7500,
    districts: 15,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5jFNnWqnmtIQibSrYa6t4W-Ykt4VZpIziw&s',
  },
  {
    username: 'SkylineHunter',
    balance: 7200,
    districts: 13,
    avatar:
      'https://media.forgecdn.net/avatars/thumbnails/1045/821/256/256/638573685038079805.webp',
  },
  {
    username: 'VarsoviaVibe',
    balance: 6900,
    districts: 12,
    avatar:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16b4b024-ba37-47e2-9e6a-ba347060d749/dfu9eer-e665b2ae-596b-43f4-a1cd-85bb1d6c8a8d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2YjRiMDI0LWJhMzctNDdlMi05ZTZhLWJhMzQ3MDYwZDc0OVwvZGZ1OWVlci1lNjY1YjJhZS01OTZiLTQzZjQtYTFjZC04NWJiMWQ2YzhhOGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sFEa4gpEJ-B2VQ4YufXB3ISd4mwaNQDosbwNMLIWqD0',
  },
  {
    username: 'RoyalRoad',
    balance: 6400,
    districts: 11,
    avatar:
      'https://preview.redd.it/random-character-opinions-119-odie-asman-v0-tztf88dhw0kd1.png?auto=webp&s=943774465b4f80f3e7e2e42ffed0199654770813',
  },
  {
    username: 'GoldenAvenue',
    balance: 6200,
    districts: 10,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST6caymImFgXOa2nOs46dqQPdXHxrF4QN1-g&s',
  },
];

const Player = ({player}: {player: IPlayer}) => {
  return (
    <Row
      gap={10}
      style={{
        borderBottomWidth: 1,
        borderColor: '#091133',
        width: '100%',
        padding: 10,
      }}>
      {player.avatar && (
        <View>
          <Image
            source={{uri: player.avatar}}
            style={{
              borderRadius: 12,
              width: 100,
              height: 100,
              overflow: 'visible',
            }}
            width={100}
            height={100}
          />
        </View>
      )}
      {!player.avatar && (
        <View style={{borderRadius: 12, overflow: 'hidden'}}>
          <Image
            source={require('@/assets/images/avatars/default.png')}
            style={{
              borderRadius: 12,
              width: 100,
              height: 100,
              overflow: 'visible',
            }}
            width={100}
            height={100}
          />
        </View>
      )}

      <View style={{gap: 5}}>
        <CustomText fw="bold" fs={20}>
          {player.username}
        </CustomText>

        <Row gap={5}>
          <CustomText fw="bold" fs={18}>
            {player.balance}
          </CustomText>
          <MoneyIcon width={24} height={24} />
        </Row>

        <Row gap={5}>
          <CustomText fs={16}>{player.districts}</CustomText>
          <FactoryIcon width={20} height={20} fill={'#fff'} />
        </Row>
      </View>
    </Row>
  );
};

export default function Scoreboard() {
  const nav = useNavigation<UseNavigationProp>();
  const username = useUserStore(state => state.username);
  const districts = useUserStore(state => state.capturedDistrictIds.length);
  const balance = useUserStore(state => state.balance);
  const avatar = useUserStore(state => state.avatar);
  console.log('avatar', avatar);

  return (
    <BackgroundWrapper>
      <Container>
        <Row mt={10} gap={10}>
          <BackButton onPress={() => nav.goBack()} />

          <CustomText fw="bold" fs={26}>
            Top Players
          </CustomText>
        </Row>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
          <View style={{gap: 5, marginTop: 20, width: '100%'}}>
            <Player player={{username, balance, districts, avatar}} />

            {players.map(player => (
              <Player key={player.username} player={player} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
