import {Question} from '@/types';

export const removeAnswers = (needToRemove: number, removeFrom: Question) => {
  const copy = {...removeFrom};
  let counter = 1;

  const removedAnswers = copy.options.filter(answer => {
    if (answer.isCorrect) return true;
    if (counter <= needToRemove) {
      counter++;
      return false;
    }
    return true;
  });

  copy.options = removedAnswers;

  return copy;
};

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
