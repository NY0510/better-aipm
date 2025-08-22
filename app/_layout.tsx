import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {SafeAreaInsetsContext, SafeAreaProvider, SafeAreaView, initialWindowMetrics, useSafeAreaInsets} from 'react-native-safe-area-context';

import colors from 'theme/colors';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SuitBold: require('assets/fonts/SUIT-Bold.ttf'),
    SuitExtraBold: require('assets/fonts/SUIT-ExtraBold.ttf'),
    SuitExtraLight: require('assets/fonts/SUIT-ExtraLight.ttf'),
    SuitHeavy: require('assets/fonts/SUIT-Heavy.ttf'),
    SuitLight: require('assets/fonts/SUIT-Light.ttf'),
    SuitMedium: require('assets/fonts/SUIT-Medium.ttf'),
    SuitRegular: require('assets/fonts/SUIT-Regular.ttf'),
    SuitSemiBold: require('assets/fonts/SUIT-SemiBold.ttf'),
    SuitThin: require('assets/fonts/SUIT-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar style="dark" />
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
