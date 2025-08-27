import {Stack} from 'expo-router';

import colors from '@/styles/theme/colors';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{contentStyle: {backgroundColor: colors.background}, headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="select-device" />
    </Stack>
  );
}
