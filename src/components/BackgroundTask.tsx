import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import {useUserStore} from '@/stores/userStore';
import districtsData from '@/constants/districts.json';

export default function BackgroundTask() {
  const districtsIds = useUserStore(state => state.capturedDistrictIds);
  const addBalance = useUserStore(state => state.addBalance);

  useEffect(() => {
    initBackgroundFetch();
    // BackgroundFetch.scheduleTask({
    //   taskId: 'test-task',
    //   delay: 5000, // Run task after 5 seconds
    //   forceAlarmManager: true,
    //   periodic: false,
    // });

    // console.log('BackgroundTask init');
    // // Configure the background fetch task
    // const a = BackgroundFetch.configure(
    //   {
    //     minimumFetchInterval: 15,
    //     stopOnTerminate: false,
    //     startOnBoot: true, //
    //     enableHeadless: true,
    //   },
    //   async taskId => {
    //     console.log('[BackgroundFetch] Task started');
    //     accumulateIncome();
    //     BackgroundFetch.finish(taskId);
    //   },
    //   error => {
    //     console.log('[BackgroundFetch] failed to start', error);
    //   },
    // );
    // // const b =
    // console.log('a', a);

    // return () => {
    //   BackgroundFetch.stop();
    // };
  }, [districtsIds]);

  const initBackgroundFetch = async () => {
    try {
      const onEvent = async taskId => {
        console.log('BackgroundFetch event triggered. Task ID:', taskId);
        console.log(new Date());

        await accumulateIncome();
        BackgroundFetch.finish(taskId);
      };

      const onTimeout = async taskId => {
        console.warn(
          'BackgroundFetch TIMEOUT event triggered. Task ID:',
          taskId,
        );
        BackgroundFetch.finish(taskId);
      };

      let status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 30, // Minimum fetch interval in minutes
          stopOnTerminate: false,
          startOnBoot: true,
          enableHeadless: true,
        },
        onEvent,
        onTimeout,
      );
    } catch (err) {
      console.error(err);
    }
  };

  const accumulateIncome = () => {
    if (districtsIds.length === 0) return;

    const districts = districtsData.filter(item =>
      districtsIds.includes(item.id),
    );
    const possibleIncome = districts.reduce(
      (acc, item) => acc + item.income,
      0,
    );
    addBalance(possibleIncome);
    console.log('[BG_TASK]: fired!!!');
  };

  return null;
}
