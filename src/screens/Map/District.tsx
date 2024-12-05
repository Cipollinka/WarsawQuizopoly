import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {District as DistrictType} from '@/types';
import Button from '@/components/ui/Button';
import FlagIcon from '@/assets/icons/flag.svg';

interface Props {
  district: DistrictType;
  isCaptured: boolean;
  onInfoPress: (district: DistrictType) => void;
  onCapturePress: (district: DistrictType) => void;
}

export default function District({
  district,
  isCaptured,
  onInfoPress,
  onCapturePress,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          top: district.position.top,
          left: district.position.left,
          zIndex: district.position?.zIndex,
        },
      ]}>
      {!isCaptured && (
        <FlagIcon
          width={40}
          height={40}
          fill="green"
          style={{position: 'absolute', top: -20, left: '40%', zIndex: 20}}
        />
      )}

      <TouchableOpacity onPress={() => onInfoPress(district)}>
        <Image
          source={{uri: district.image}}
          style={{
            width: 100,
            height: 70,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          overflow: 'hidden',
        }}>
        <Button
          title="Capture"
          fs={14}
          disabled={isCaptured}
          style={{
            padding: 0,
            margin: 0,
            paddingHorizontal: 0,
            paddingVertical: 7,
            borderRadius: 0,
          }}
          onPress={() => onCapturePress(district)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 24,
  },
});
