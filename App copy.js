import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Alert, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Real data from API
const realTimeData = {
  data: [
    { date: '2025-08-21T14:00:00', value: 52, unit: 'Wh' },
    { date: '2025-08-21T15:00:00', value: 81, unit: 'Wh' },
    { date: '2025-08-21T16:00:00', value: 79, unit: 'Wh' },
    { date: '2025-08-21T17:00:00', value: 80, unit: 'Wh' },
    { date: '2025-08-21T18:00:00', value: 78, unit: 'Wh' },
    { date: '2025-08-21T19:00:00', value: 80, unit: 'Wh' },
    { date: '2025-08-21T20:00:00', value: 130, unit: 'Wh' },
    { date: '2025-08-21T21:00:00', value: 196, unit: 'Wh' },
    { date: '2025-08-21T22:00:00', value: 83, unit: 'Wh' },
    { date: '2025-08-21T23:00:00', value: 80, unit: 'Wh' },
    { date: '2025-08-22T00:00:00', value: 77, unit: 'Wh' },
    { date: '2025-08-22T01:00:00', value: 77, unit: 'Wh' },
    { date: '2025-08-22T02:00:00', value: 77, unit: 'Wh' },
    { date: '2025-08-22T03:00:00', value: 77, unit: 'Wh' },
    { date: '2025-08-22T04:00:00', value: 77, unit: 'Wh' },
    { date: '2025-08-22T05:00:00', value: 76, unit: 'Wh' },
    { date: '2025-08-22T06:00:00', value: 77, unit: 'Wh' },
    { date: '2025-08-22T07:00:00', value: 78, unit: 'Wh' },
    { date: '2025-08-22T08:00:00', value: 77, unit: 'Wh' },
    { date: '2025-08-22T09:00:00', value: 78, unit: 'Wh' },
    { date: '2025-08-22T10:00:00', value: 78, unit: 'Wh' },
    { date: '2025-08-22T11:00:00', value: 80, unit: 'Wh' },
    { date: '2025-08-22T12:00:00', value: 79, unit: 'Wh' },
    { date: '2025-08-22T13:00:00', value: 78, unit: 'Wh' },
  ],
  old_data: [
    { date: '2025-07-21T14:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T15:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T16:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T17:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T18:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T19:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T20:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T21:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T22:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-21T23:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T00:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T01:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T02:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T03:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T04:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T05:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T06:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T07:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T08:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T09:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T10:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T11:00:00', value: 0, unit: 'Wh' },
    { date: '2025-07-22T12:00:00', value: 75, unit: 'Wh' },
    { date: '2025-07-22T13:00:00', value: 76, unit: 'Wh' },
  ],
};

export default function App() {
  const [isPlugOn, setIsPlugOn] = useState(false);
  const [currentPower, setCurrentPower] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(22.5);
  const [monthlyUsage, setMonthlyUsage] = useState(1.95); // Convert Wh to kWh
  const [chartType, setChartType] = useState('hour'); // 'hour', 'day', 'month'
  const [dataType, setDataType] = useState('usage'); // 'usage', 'cost'
  const [currentCost, setCurrentCost] = useState(0);
  const [tooltip, setTooltip] = useState(null);

  // Mock data for different periods
  const mockData = {
    hour: {
      usage: realTimeData.data.map((item) => item.value),
      cost: realTimeData.data.map((item) => item.value * 0.12), // 0.12 won per Wh
      labels: realTimeData.data.map((item) => {
        const date = new Date(item.date);
        return date.getHours().toString().padStart(2, '0') + ':00';
      }),
      previousUsage: realTimeData.old_data.map((item) => item.value),
      previousCost: realTimeData.old_data.map((item) => item.value * 0.12),
    },
    day: {
      usage: [45, 52, 38, 61, 55, 48, 67, 58, 49, 53, 46, 62, 51, 44],
      cost: [5.4, 6.24, 4.56, 7.32, 6.6, 5.76, 8.04, 6.96, 5.88, 6.36, 5.52, 7.44, 6.12, 5.28],
      labels: ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일', '13일', '14일'],
      previousUsage: [42, 48, 35, 58, 52, 45, 64, 55, 46, 50, 43, 59, 48, 41],
      previousCost: [5.04, 5.76, 4.2, 6.96, 6.24, 5.4, 7.68, 6.6, 5.52, 6, 5.16, 7.08, 5.76, 4.92],
    },
    month: {
      usage: [185, 198, 165, 210, 195, 178, 225, 188, 172, 201, 183, 215],
      cost: [22.2, 23.76, 19.8, 25.2, 23.4, 21.36, 27, 22.56, 20.64, 24.12, 21.96, 25.8],
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      previousUsage: [180, 192, 158, 205, 188, 175, 218, 185, 168, 195, 178, 208],
      previousCost: [21.6, 23.04, 18.96, 24.6, 22.56, 21, 26.16, 22.2, 20.16, 23.4, 21.36, 24.96],
    },
  };

  // Process data for charts
  const getChartData = () => {
    const currentData = mockData[chartType][dataType];
    const previousData = dataType === 'usage' ? mockData[chartType].previousUsage : mockData[chartType].previousCost;
    const labels = mockData[chartType].labels;

    return {
      labels: labels,
      datasets: [
        {
          data: currentData,
          color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
          strokeWidth: 3,
        },
        {
          data: previousData,
          color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
          strokeWidth: 2,
          withDots: false,
        },
      ],
    };
  };

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlugOn) {
        setCurrentPower(Math.random() * 2000 + 500); // 500-2500 Wh
        setCurrentCost(Math.random() * 0.5 + 0.1); // $0.1-0.6 per hour
      } else {
        setCurrentPower(0);
        setCurrentCost(0);
      }
      setCurrentTemp(22 + Math.random() * 6); // 22-28°C
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlugOn]);

  const togglePlug = () => {
    setIsPlugOn(!isPlugOn);
    if (!isPlugOn) {
      Alert.alert('스마트플러그 켜짐', '전원이 연결되었습니다.');
    } else {
      Alert.alert('스마트플러그 꺼짐', '전원이 차단되었습니다.');
    }
  };

  const getCurrentData = () => getChartData();
  const getPreviousData = () => (dataType === 'usage' ? mockData[chartType].previousUsage : mockData[chartType].previousCost);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: dataType === 'cost' ? 2 : 0,
    color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#5196f4',
    },
    fillShadowGradient: '#5196f4',
    fillShadowGradientOpacity: 0.1,
    paddingRight: 40, // Add padding for Y-axis labels
  };

  const handleDataPointClick = (data) => {
    const { index, value } = data;
    const labels = mockData[chartType].labels;
    const unit = dataType === 'usage' ? (chartType === 'hour' ? 'Wh' : 'kWh') : '원';

    setTooltip({
      visible: true,
      label: labels[index],
      value: value,
      unit: unit,
      x: index * 50 + 100, // Approximate position
      y: 150,
    });
  };

  const renderStatusCard = () => (
    <View style={styles.statusCard}>
      <View style={styles.statusHeader}>
        <Text style={styles.statusTitle}>스마트플러그 상태</Text>
        <View style={[styles.statusIndicator, { backgroundColor: isPlugOn ? '#4CAF50' : '#F44336' }]}>
          <Text style={styles.statusText}>{isPlugOn ? 'ON' : 'OFF'}</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.powerButton, { backgroundColor: isPlugOn ? '#4CAF50' : '#F44336' }]} onPress={togglePlug}>
        <Ionicons name={isPlugOn ? 'power' : 'power-outline'} size={60} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderStatsCards = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <MaterialIcons name="flash-on" size={24} color="#FF9800" />
        <Text style={styles.statValue}>{isPlugOn ? currentPower.toFixed(0) : '0'}</Text>
        <Text style={styles.statUnit}>Wh</Text>
        <Text style={styles.statLabel}>현재 사용량</Text>
      </View>

      <View style={styles.statCard}>
        <MaterialIcons name="thermostat" size={24} color="#2196F3" />
        <Text style={styles.statValue}>{currentTemp.toFixed(1)}</Text>
        <Text style={styles.statUnit}>°C</Text>
        <Text style={styles.statLabel}>현재 온도</Text>
      </View>

      <View style={styles.statCard}>
        <MaterialIcons name="trending-up" size={24} color="#4CAF50" />
        <Text style={styles.statValue}>{monthlyUsage.toFixed(1)}</Text>
        <Text style={styles.statUnit}>kWh</Text>
        <Text style={styles.statLabel}>이번달 누적</Text>
      </View>

      <View style={styles.statCard}>
        <MaterialIcons name="attach-money" size={24} color="#9C27B0" />
        <Text style={styles.statValue}>{(monthlyUsage * 0.12).toFixed(2)}</Text>
        <Text style={styles.statUnit}>$</Text>
        <Text style={styles.statLabel}>이번달 요금</Text>
      </View>
    </View>
  );

  const renderChartSection = () => (
    <View style={styles.chartSection}>
      <Text style={styles.sectionTitle}>전력 사용량 및 요금 분석</Text>

      {/* Chart Type Selector */}
      <View style={styles.chartTypeSelector}>
        {[
          { key: 'hour', label: '시간별' },
          { key: 'day', label: '일별' },
          { key: 'month', label: '월별' },
        ].map((type) => (
          <TouchableOpacity key={type.key} style={[styles.chartTypeButton, chartType === type.key && styles.chartTypeButtonActive]} onPress={() => setChartType(type.key)}>
            <Text style={[styles.chartTypeText, chartType === type.key && styles.chartTypeTextActive]}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Data Type Selector */}
      <View style={styles.dataTypeSelector}>
        {[
          { key: 'usage', label: '전력사용량', icon: 'flash-on' },
          { key: 'cost', label: '예상요금', icon: 'attach-money' },
        ].map((type) => (
          <TouchableOpacity key={type.key} style={[styles.dataTypeButton, dataType === type.key && styles.dataTypeButtonActive]} onPress={() => setDataType(type.key)}>
            <MaterialIcons name={type.icon} size={18} color={dataType === type.key ? 'white' : '#666'} />
            <Text style={[styles.dataTypeText, dataType === type.key && styles.dataTypeTextActive]}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#5196f4' }]} />
          <Text style={styles.legendText}>이번달</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
          <Text style={styles.legendText}>전월</Text>
        </View>
      </View>

      {/* Chart Container with Fixed Y-axis */}
      <View style={styles.chartContainerWrapper}>
        <View style={styles.yAxisContainer}>
          <Text style={styles.yAxisLabel}>200</Text>
          <Text style={styles.yAxisLabel}>150</Text>
          <Text style={styles.yAxisLabel}>100</Text>
          <Text style={styles.yAxisLabel}>50</Text>
          <Text style={styles.yAxisLabel}>0</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.chartScrollContainer} contentContainerStyle={styles.chartScrollContent}>
          <LineChart
            data={getCurrentData()}
            width={Math.max(screenWidth * 0.8, mockData[chartType].labels.length * 60)} // Increased spacing
            height={250}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisSuffix={dataType === 'usage' ? (chartType === 'hour' ? 'Wh' : 'kWh') : '원'}
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLines={true}
            withHorizontalLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={false} // Hide default Y-axis labels
            onDataPointClick={handleDataPointClick}
            getDotColor={(dataPoint, dataPointIndex) => '#5196f4'}
            renderDotContent={({ x, y, index }) => (
              <TouchableOpacity
                key={index}
                style={{
                  position: 'absolute',
                  left: x - 10,
                  top: y - 10,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: 'transparent',
                }}
                onPress={() =>
                  handleDataPointClick({
                    index: index,
                    value: mockData[chartType][dataType][index],
                  })
                }
              />
            )}
          />
        </ScrollView>
      </View>

      {/* Tooltip */}
      {tooltip && (
        <View style={[styles.tooltip, { left: tooltip.x, top: tooltip.y }]}>
          <Text style={styles.tooltipLabel}>{tooltip.label}</Text>
          <Text style={styles.tooltipValue}>
            {tooltip.value.toFixed(dataType === 'cost' ? 2 : 0)} {tooltip.unit}
          </Text>
        </View>
      )}

      <View style={styles.chartInfo}>
        <Text style={styles.chartInfoText}>차트의 점을 터치하면 상세 정보를 확인할 수 있습니다</Text>
      </View>

      <View style={styles.comparisonContainer}>
        <Text style={styles.comparisonTitle}>총 {dataType === 'usage' ? '사용량' : '요금'} 비교</Text>
        <BarChart
          data={{
            labels: ['이번달', '전월'],
            datasets: [
              {
                data: [
                  mockData[chartType][dataType].reduce((sum, value) => sum + value, 0),
                  (dataType === 'usage' ? mockData[chartType].previousUsage : mockData[chartType].previousCost).reduce((sum, value) => sum + value, 0),
                ],
              },
            ],
          }}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          }}
          style={styles.chart}
          yAxisSuffix={dataType === 'usage' ? (chartType === 'hour' ? 'Wh' : 'kWh') : '원'}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>스마트플러그</Text>
          <Ionicons name="settings-outline" size={24} color="#666" />
        </View>

        {renderStatusCard()}
        {renderStatsCards()}
        {renderChartSection()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statusCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  powerButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10,
  },
  statCard: {
    backgroundColor: 'white',
    flex: 1,
    minWidth: (screenWidth - 50) / 2,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statUnit: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  chartSection: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  chartTypeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  chartTypeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  chartTypeButtonActive: {
    backgroundColor: '#5196f4',
  },
  chartTypeText: {
    fontSize: 14,
    color: '#666',
  },
  chartTypeTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  dataTypeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 15,
    gap: 4,
  },
  dataTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  dataTypeButtonActive: {
    backgroundColor: '#9C27B0',
  },
  dataTypeText: {
    fontSize: 14,
    color: '#666',
  },
  dataTypeTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  chartContainerWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  yAxisContainer: {
    width: 40,
    height: 250,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 20,
    paddingBottom: 40,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 1000,
  },
  tooltipLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  tooltipValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chartScrollContainer: {
    flex: 1,
  },
  chartScrollContent: {
    paddingRight: 20,
  },
  chartInfo: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  chartInfoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  comparisonContainer: {
    marginTop: 20,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
});
