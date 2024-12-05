import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BackButton from '@/components/BackButton';
import {UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View} from 'react-native';
import Row from '@/components/layout/Row';

export default function About() {
  const nav = useNavigation<UseNavigationProp>();
  return (
    <BackgroundWrapper>
      <Container>
        <Row gap={10}>
          <BackButton onPress={() => nav.goBack()} />
          <CustomText fw="bold" fs={17}>
            Welcome to Warsaw Culture & Quiz!
          </CustomText>
        </Row>
        <ScrollView style={{width: '100%', marginTop: 10}}>
          <View style={{gap: 20, marginBottom: 20}}>
            <CustomText fs={20} style={{textAlign: 'justify'}}>
              We invite you to explore the captivating city of Warsaw through an
              interactive and engaging experience. Our app seamlessly blends
              learning with enjoyment, making it perfect for both residents and
              visitors eager to discover the charm of Poland's capital.
            </CustomText>

            <CustomText fs={20} style={{textAlign: 'justify'}}>
              At the core of Warsaw Quizopoly is our Interactive Map, featuring
              a variety of districts, each with distinct values, levels of
              difficulty, and income potential. As you navigate through the
              city, engage with our District Acquisition Quizzes that challenge
              your knowledge of Warsaw’s rich history and culture. Correct
              answers unlock new districts, providing a delightful way to learn.
            </CustomText>

            <CustomText fs={20} style={{textAlign: 'justify'}}>
              Stay motivated with our Daily Bonuses, which reward your continued
              exploration and engagement. You can also track your progress and
              compare your achievements on our Leaderboard, encouraging friendly
              competition among fellow explorers.
            </CustomText>

            <CustomText fs={20} style={{textAlign: 'justify'}}>
              Our “Study Warsaw” Guide offers insightful articles and resources,
              enhancing your understanding of the city’s heritage. Additionally,
              enjoy our Thematic Music that enriches your journey, creating an
              immersive atmosphere as you explore.
            </CustomText>
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
