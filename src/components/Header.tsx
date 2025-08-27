import {useRouter} from 'expo-router';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import colors from '@/styles/theme/colors';
import {MaterialIcons} from '@expo/vector-icons';

export default function Header() {
  const router = useRouter();

  return (
    <View style={s.header}>
      <Text style={s.headerTitle}>MahiroLab</Text>
      <TouchableOpacity onPress={() => router.navigate('/setting')} activeOpacity={0.7}>
        <MaterialIcons name="settings" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'SuitSemiBold',
    color: colors.text,
  },
});
