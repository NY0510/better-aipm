import {Tabs} from 'expo-router';
import React from 'react';
import {GestureResponderEvent, TouchableOpacity} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import colors from 'theme/colors';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({route}) => ({
        headerShown: false,
        animation: 'shift',
        freezeOnBlur: true,
        sceneStyle: {backgroundColor: colors.background},
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: 0,
          height: 60,
          borderColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontFamily: 'SuitMedium',
          fontSize: 14,
        },
        tabBarButton: props => (props.onPress ? <TabBarButton children={props.children} onPress={event => props.onPress && props.onPress(event!)} /> : null),
        tabBarIcon: props => <TabBarIcon route={route} size={20} color={props.color} />,
      })}>
      <Tabs.Screen name="index" />
    </Tabs>
  );
};

const TabBarButton = ({children, onPress}: {children: React.ReactNode; onPress: (event?: GestureResponderEvent) => void}) => {
  return (
    // <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    // <TouchableScale onPress={onPress} pressInEasing={Easing.elastic(1.5)} pressOutEasing={Easing.elastic(1.5)} pressInDuration={150} pressOutDuration={150} scaleTo={0.9} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <TouchableOpacity onPress={onPress} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </TouchableOpacity>
    // </TouchableScale>
    // </TouchableOpacity>
  );
};

const TabBarIcon = ({route, size, color}: {route: {name: string}; size: number; color: string}) => {
  switch (route.name) {
    case 'index':
      return <MaterialIcons name="home" size={size} color={color} />;
    default:
      return null;
  }
};

export default TabsLayout;
