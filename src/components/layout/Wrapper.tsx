import React from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SafeAreaView style={styles.wrapper}>
    <Image source={require('../../assets/images/bg.png')} style={{position: 'absolute', width: '100%', height: '110%'}}/>
    {children}
    </SafeAreaView>;
}

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#020c1b', position: 'relative'},
});
