import {Button, Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

import Card from 'components/Card';
import colors, {palette} from 'theme/colors';

export default function Index() {
  const dummyData = [
    {
      value: 70,
      color: palette.camelliaRose,
    },
    {
      value: 30,
      color: palette.slicaSand,
    },
  ];

  return (
    <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 16}}>
      <View style={{alignItems: 'center', gap: 14}}>
        <Card variant="background" style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 18, fontFamily: 'SuitBold', color: '#333'}}>실시간 소비전력</Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={{fontSize: 48, fontFamily: 'SuitExtraBold', color: '#333'}}>82</Text>
              <Text style={{fontSize: 32, fontFamily: 'SuitRegular', color: '#333'}}>Wh</Text>
            </View>
          </View>
          <PieChart data={dummyData} innerRadius={25} radius={50} donut innerCircleColor={palette.mysticRose} />
        </Card>

        <Card title="실시간 소비전력" variant="default">
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={{fontSize: 48, fontFamily: 'SuitExtraBold', color: '#333'}}>82</Text>
            <Text style={{fontSize: 32, fontFamily: 'SuitRegular', color: '#333'}}>Wh</Text>
          </View>
        </Card>
      </View>
    </View>
  );
}
