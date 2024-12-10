import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {ActiveItem, Question, QuizData, QuizParams} from '@/types';
import quiz from '@/constants/quiz.json';
import daily from '@/constants/daily.json';
import {useUserStore} from '@/stores/userStore';
import {StyleSheet, View} from 'react-native';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import Button from '@/components/ui/Button';

import MoneyIcon from '@/assets/icons/money.svg';
import {removeAnswers, sleep} from '@/utils/helpers';
import {QUIZ_SUCCESS_FINISH_ANSWERS_COUNT} from '@/constants';

import IdeaIcon from '@/assets/icons/idea.svg';
import SkipIcon from '@/assets/icons/skip.svg';

import InvestModal from '@/components/modals/InvestModal';
import QuizEndModal from '@/components/modals/QuizEnd';
import DailyEndModal from '@/components/modals/DailyEndModal';

const activeItems = [
  {
    id: ActiveItem.TIP,
    icon: IdeaIcon,
    cost: 30,
  },
  {
    id: ActiveItem.SKIP,
    icon: SkipIcon,
    cost: 40,
  },
];

const getButtonStyles = (isCorrect: boolean) => {
  if (isCorrect) {
    return styles.correctAnswerButton;
  } else {
    return styles.incorrectAnswerButton;
  }
};

export default function Quiz({route}: {route: any}) {
  const nav = useNavigation<UseNavigationProp>();

  const currentDailyIndex = useUserStore(state => state.currentDailyIndex);
  const addCurrentDailyIndex = useUserStore(
    state => state.addCurrentDailyIndex,
  );
  const balance = useUserStore(state => state.balance);
  const addBalance = useUserStore(state => state.addBalance);
  const spendBalance = useUserStore(state => state.spendBalance);
  const addCapturedDistrictId = useUserStore(
    state => state.addCapturedDistrictId,
  );
  // const addInvestedDistrictId = useUserStore(
  //   state => state.addInvestedDistrictId,
  // );

  const [currentQuizData, setCurrentQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [correctAnsweredQuestions, setCorrectAnsweredQuestions] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<null | number>(null);

  const [investModalData, setInvestModalData] = useState({
    isOpen: false,
    isCorrect: false,
  });
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  const isSuccessfullyCompleted =
    correctAnsweredQuestions >= QUIZ_SUCCESS_FINISH_ANSWERS_COUNT;
  const isLastQuestion = currentStep + 1 === currentQuizData?.questions.length;

  const params = route.params as QuizParams;
  const isCapture = params.isCapture;
  const captureData = params.capture;
  const isInvestment = params.isInvestment;
  const isDaily = params.isDaily;

  useEffect(() => {
    init();
  }, [isCapture, captureData, isInvestment, isDaily]);

  useEffect(() => {
    if (!currentQuizData?.questions[currentStep]) return;

    setCurrentQuestion(currentQuizData.questions[currentStep]);
  }, [currentStep, currentQuizData]);

  const handleGoBack = () => nav.goBack();

  const init = () => {
    if (isCapture && captureData?.districtId !== undefined) {
      const quizData = quiz[captureData.districtId];
      // @ts-ignore
      setCurrentQuizData(quizData);
      setCurrentQuestion(quizData.questions[0]);
    } else if (isInvestment) {
      const values = Object.values(quiz);
      const randomIndex = Math.floor(Math.random() * values.length);
      const quizData = values[randomIndex];

      const randomQuestionIndex = Math.floor(
        Math.random() * quizData.questions.length,
      );
      // @ts-ignore
      setCurrentQuizData(quizData);
      setCurrentQuestion(quizData.questions[randomQuestionIndex]);
    } else if (isDaily) {
      const calcedId = currentDailyIndex % 10;
      const currentId = calcedId > 0 ? calcedId : 1;

      // @ts-ignore
      const quizData = daily[currentId];
      setCurrentQuizData(quizData);
    }
  };
  console.log('curr', currentDailyIndex);

  const onAnswer = async (isCorrect: boolean, index: number) => {
    setCurrentAnswer(index);
    await sleep(1000);

    if (isCorrect) {
      setCorrectAnsweredQuestions(prev => prev + 1);
    }

    if (isCapture) {
      if (isCorrect) {
        addBalance(10);
      } else {
        spendBalance(20);
      }
    }

    if (isInvestment) {
      if (isCorrect) {
        addBalance(balance);
      }
      setInvestModalData({
        isOpen: true,
        isCorrect,
      });
    }

    if (isLastQuestion) {
      onQuizFinish();
    } else {
      setCurrentStep(prev => prev + 1);
    }
    setCurrentAnswer(null);
  };

  const onQuizFinish = () => {
    if (isDaily) {
      addCurrentDailyIndex();
      if (isSuccessfullyCompleted) {
        addBalance(balance);
      }
    }

    if (isCapture || isDaily) {
      setIsEndModalOpen(true);
      if (isCapture && isSuccessfullyCompleted && currentQuizData) {
        addCapturedDistrictId(currentQuizData.districtId);
      }
    }
  };

  const onActiveItemPress = (id: ActiveItem) => {
    switch (id) {
      case ActiveItem.TIP: {
        if (!currentQuestion) return;

        const question = removeAnswers(2, currentQuestion);
        setCurrentQuestion(question);
        spendBalance(30);
        break;
      }
      case ActiveItem.SKIP: {
        setCurrentStep(prev => prev + 1);
        setCorrectAnsweredQuestions(prev => prev + 1);
        spendBalance(40);
        break;
      }
    }
  };

  return (
    <BackgroundWrapper>
      {isCapture && (
        <QuizEndModal
          isOpen={isEndModalOpen}
          isSuccess={isSuccessfullyCompleted}
          onClose={() => {
            setIsEndModalOpen(false);
            nav.navigate(Screens.MAP);
          }}
          onInvest={() =>
            nav.navigate(Screens.QUIZ, {
              isInvestment: true,
            })
          }
        />
      )}

      {isInvestment && (
        <InvestModal
          isOpen={investModalData.isOpen}
          onClose={() => {
            setInvestModalData({isOpen: false, isCorrect: false});
            nav.navigate(Screens.MAP);
          }}
          isCorrect={investModalData.isCorrect}
        />
      )}

      {isDaily && (
        <DailyEndModal
          isOpen={isEndModalOpen}
          onClose={() => {
            setIsEndModalOpen(false);
            handleGoBack();
          }}
          isSuccess={isSuccessfullyCompleted}
        />
      )}

      <Container>
        <Row style={{justifyContent: 'space-between', width: '100%'}}>
          <BackButton onPress={handleGoBack} />

          <Row gap={5}>
            <CustomText fw="bold" style={{fontSize: 24}}>
              {balance}
            </CustomText>

            <MoneyIcon width={24} height={24} />
          </Row>
        </Row>

        <View style={{gap: 10, marginTop: '10%'}}>
          <CustomText fw="bold" style={{fontSize: 24}}>
            {currentQuestion?.question}
          </CustomText>
        </View>

        <View
          style={{
            gap: 16,
            width: '100%',
            marginTop: '10%',
          }}>
          {currentQuestion?.options.map((answer, index) => {
            const isSelected = currentAnswer === index;
            const answerStyles = isSelected
              ? {...getButtonStyles(answer.isCorrect)}
              : {};

            return (
              <Button
                key={index}
                title={answer.answer}
                onPress={() => onAnswer(answer.isCorrect, index)}
                isFullWidth
                style={{...answerStyles}}
                fs={20}
              />
            );
          })}
        </View>

        {isCapture && (
          <Row mt={30} style={{width: '100%', justifyContent: 'space-between'}}>
            {activeItems.map(item => {
              const Icon = item.icon;
              return (
                <View style={{alignItems: 'center', gap: 5}}>
                  <Button
                    disabled={
                      balance < item.cost ||
                      (item.id === ActiveItem.SKIP && isLastQuestion)
                    }
                    icon={<Icon width={30} height={30} />}
                    onPress={() => onActiveItemPress(item.id)}
                  />

                  <Row gap={5}>
                    <CustomText fw="bold" fs={20}>
                      {item.cost}
                    </CustomText>

                    <MoneyIcon width={24} height={24} />
                  </Row>
                </View>
              );
            })}
          </Row>
        )}
      </Container>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  correctAnswerButton: {
    backgroundColor: 'rgba(130, 200, 130, 1)',
  },
  incorrectAnswerButton: {
    backgroundColor: 'rgba(255, 130, 130, 1)',
  },
});
