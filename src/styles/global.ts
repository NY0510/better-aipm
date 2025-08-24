import {StyleSheet} from 'react-native';

import colors from '@/styles/theme/colors';

const gs = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default gs;
