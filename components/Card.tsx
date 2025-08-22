import React from 'react';
import {Text, View} from 'react-native';

import colors, {palette} from 'theme/colors';

interface Props {
  title?: string;
  variant?: 'background' | 'default';
  children: React.ReactNode;
  style?: object;
}

export default function Card({title, variant, children, style, ...rest}: Props & {[key: string]: any}) {
  return (
    <View style={{backgroundColor: variant === 'background' ? palette.mysticRose : colors.card, paddingHorizontal: 18, paddingVertical: 20, borderRadius: 26, width: '100%', ...style}} {...rest}>
      {title && (
        <View>
          <Text style={{fontSize: 18, fontFamily: 'SuitBold', color: '#333'}}>{title}</Text>
        </View>
      )}
      {children}
    </View>
  );
}
