import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Card from '@/components/Card';
import colors from '@/styles/theme/colors';

export default function InfoCard({title, value, unit}: {title: string; value: string | number; unit: string}) {
  return (
    <Card title={title} titleStyle={s.infoTitle} style={s.infoCard}>
      <View style={s.infoContent}>
        <Text style={s.infoValue}>{value}</Text>
        <Text style={s.infoUnit}>{unit}</Text>
      </View>
    </Card>
  );
}

const s = StyleSheet.create({
  infoTitle: {
    fontSize: 16,
  },
  infoCard: {
    justifyContent: 'space-between',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 2,
  },
  infoValue: {
    fontSize: 30,
    letterSpacing: -1.5,
    fontVariant: ['tabular-nums'],
    fontFamily: 'SuitBold',
    color: colors.text,
  },
  infoUnit: {
    fontSize: 20,
    fontFamily: 'SuitRegular',
    color: colors.text,
  },
});
