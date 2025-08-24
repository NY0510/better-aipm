import {LinearGradient} from 'expo-linear-gradient';
import {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

import Card from '@/components/Card';
import PowerCard from '@/components/PowerCard';
import colors from '@/theme/colors';
import {MaterialIcons} from '@expo/vector-icons';

function InfoCard({title, value, unit}: {title: string; value: string | number; unit: string}) {
  return (
    <Card title={title} titleStyle={styles.infoTitle} style={styles.infoCard}>
      <View style={styles.infoContent}>
        <Text style={styles.infoValue}>{value}</Text>
        <Text style={styles.infoUnit}>{unit}</Text>
      </View>
    </Card>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>MahiroLab</Text>
      <TouchableOpacity onPress={() => console.log('Settings pressed')} activeOpacity={0.7}>
        <MaterialIcons name="settings" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

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
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PowerCard currentWh={currentWh} data={chartData} />

        {/* <Card variant="default"></Card> */}

        <View style={styles.gridRow}>
          <InfoCard title="오늘 사용량" value={245} unit="Wh" />
          <InfoCard title="이번 달 사용량" value={45.7} unit="kWh" />
        </View>

        <View style={styles.gridRow}>
          <InfoCard title="평균 소비전력" value={65} unit="Wh" />
          <InfoCard title="최대 소비전력" value={125} unit="Wh" />
        </View>

        <View style={styles.gridRow}>
          <InfoCard title="장치 내부온도" value={51} unit="°C" />
          <InfoCard title="월간 누적 요금" value="15,420" unit="원" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  scrollView: {
    paddingVertical: 4,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 14,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
  },
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
