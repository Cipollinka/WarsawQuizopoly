import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import study from '@/constants/study.json';
import {IStudy} from '@/types';
import {Image, ScrollView, Share, View} from 'react-native';
import Button from '@/components/ui/Button';
import ShareIcon from '@/assets/icons/share.svg';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';

export default function StudyDetails({route}: any) {
  const nav = useNavigation<UseNavigationProp>();
  const [article, setArticle] = useState<IStudy | null>(null);
  const id = route.params.id;

  const shareArticle = async () => {
    if (!article) return;

    try {
      const result = await Share.share({
        message: `Check out this article: ${article.name}\n\n${article.descriptionLong}\n\n${article?.image}`,
        url: article?.image, // Optional: Only if you want to share a specific URL
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Article shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  useEffect(() => {
    const article = study.find(item => item.id === Number(id));
    if (article) {
      setArticle(article);
    }
  }, [id]);

  return (
    <BackgroundWrapper>
      <Container>
        <BackButton onPress={() => nav.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: article?.image}}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 24,
              marginTop: 10,
            }}
          />

          <CustomText fw="bold" fs={24} style={{marginTop: 10}}>
            {article?.name}
          </CustomText>

          <CustomText fs={18} style={{marginTop: 10, textAlign: 'justify'}}>
            {article?.descriptionLong}
          </CustomText>

          <View
            style={{
              flexDirection: 'row-reverse',
              marginBottom: 50,
              marginTop: 10,
            }}>
            <Button
              icon={<ShareIcon width={20} height={20} />}
              onPress={shareArticle}
            />
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
