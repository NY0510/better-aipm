import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';
import PowerCard from '@/components/PowerCard';
import gs from '@/styles/global';

export default function Index() {
  const [currentWh, setCurrentWh] = useState(82);
  const [chartData, setChartData] = useState([{value: 50}, {value: 50}, {value: 50}, {value: 50}]);

  // 실시간 데이터 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 41) + 40; // 40-80 사이의 랜덤 값
      setCurrentWh(newValue);

      setChartData(prevData => {
        const newData = [...prevData, {value: newValue}];
        return newData.length > 50 ? newData.slice(1) : newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={gs.container}>
      <Header />

      <ScrollView style={gs.scrollView} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        <PowerCard currentWh={currentWh} data={chartData} />

        {/* <Card variant="default"></Card> */}

        <View style={s.gridRow}>
          <InfoCard title="오늘 사용량" value={245} unit="Wh" />
          <InfoCard title="이번 달 사용량" value={45.7} unit="kWh" />
        </View>

        <View style={s.gridRow}>
          <InfoCard title="평균 소비전력" value={65} unit="Wh" />
          <InfoCard title="최대 소비전력" value={125} unit="Wh" />
        </View>

        <View style={s.gridRow}>
          <InfoCard title="장치 내부온도" value={51} unit="°C" />
          <InfoCard title="월간 누적 요금" value="15,420" unit="원" />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  scrollContent: {
    gap: 14,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
