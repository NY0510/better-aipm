import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import Skeleton from 'react-native-reanimated-skeleton';

import Card from '@/components/Card';
import colors from '@/styles/theme/colors';

interface ChartCardProps {
  chartData: any[];
  oldChartData: any[];
  chartType: string;
  dataType: string;
  onChartTypeChange: (type: any) => void;
  onDataTypeChange: (type: any) => void;
  formatChartData: () => any[];
  formatOldChartData: () => any[];
  isLoading?: boolean;
}

export default function ChartCard({chartData, oldChartData, chartType, dataType, onChartTypeChange, onDataTypeChange, formatChartData, formatOldChartData, isLoading = false}: ChartCardProps) {
  const chartTypeOptions = [
    {key: 'hour', label: '시간별'},
    {key: 'day', label: '일별'},
    {key: 'month', label: '월별'},
  ];

  const dataTypeOptions = [
    {key: 'power', label: '전력사용량'},
    {key: 'fee', label: '예상요금'},
  ];

  return (
    <Card>
      <View style={{gap: 4, marginBottom: 18}}>
        <View style={s.tabContainer}>
          <Skeleton isLoading={isLoading} boneColor={colors.border} highlightColor={colors.textSecondary + '20'} containerStyle={{flexDirection: 'row', borderRadius: 14, overflow: 'hidden'}}>
            {chartTypeOptions.map(type => (
              <TouchableOpacity key={type.key} style={s.tabButton} onPress={() => onChartTypeChange(type.key)} activeOpacity={0.7} disabled={isLoading}>
                <Text style={[s.tabText, chartType === type.key && s.tabTextActive]}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </Skeleton>
        </View>
        <View style={s.tabContainer}>
          <Skeleton isLoading={isLoading} boneColor={colors.border} highlightColor={colors.textSecondary + '20'} containerStyle={{flexDirection: 'row', borderRadius: 14, overflow: 'hidden'}}>
            {dataTypeOptions.map(type => (
              <TouchableOpacity key={type.key} style={s.tabButton} onPress={() => onDataTypeChange(type.key)} activeOpacity={0.7} disabled={isLoading}>
                <Text style={[s.tabText, dataType === type.key && s.tabTextActive]}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </Skeleton>
        </View>
      </View>

      <Skeleton isLoading={isLoading} boneColor={colors.border} highlightColor={colors.textSecondary + '20'} containerStyle={{marginBottom: 16}} layout={[{key: 'chart', width: '100%', height: 150, borderRadius: 12}]}>
        {!isLoading && (
          <LineChart
            data={formatOldChartData()}
            data2={formatChartData()}
            hideDataPoints
            hideYAxisText
            hideAxesAndRules
            hideRules
            areaChart
            labelsExtraHeight={25}
            initialSpacing={0}
            endSpacing={0}
            maxValue={chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) * 1.2 : 100}
            color1={colors.secondary}
            startFillColor1={colors.secondary}
            startOpacity1={0.3}
            color2={colors.primary}
            startFillColor2={colors.primary}
            startOpacity2={0.4}
            endOpacity={0}
            adjustToWidth
            height={150}
            scrollToEnd
            curved
            pointerConfig={{
              activatePointersOnLongPress: true,
              activatePointersDelay: 300,
              autoAdjustPointerLabelPosition: true,
              pointerStripUptoDataPoint: true,
              pointerStripColor: colors.primary,
              pointerStripWidth: 2,
              stripOverPointer: true,
              hidePointers: true,
              pointerColor: colors.textSecondary,
              pointerLabelComponent: items => {
                return (
                  <View
                    style={{
                      height: 90,
                      minWidth: 100,
                      justifyContent: 'center',
                      marginTop: 30,
                      marginLeft: -40,
                      gap: 6,
                    }}>
                    <View style={{paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.card}}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center', color: colors.text}}>{items[1].date}</Text>
                    </View>
                    <View style={{paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.primary}}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center', color: colors.background}}>{`${items[1].value.toFixed(1)} ${items[1].unit}`}</Text>
                    </View>
                    <View style={{paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.secondary}}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center', color: colors.background}}>{`${items[0].value.toFixed(1)} ${items[0].unit}`}</Text>
                    </View>
                  </View>
                );
              },
            }}
          />
        )}
      </Skeleton>

      <View style={s.legendContainer}>
        <Skeleton isLoading={isLoading} boneColor={colors.border} highlightColor={colors.textSecondary + '20'} containerStyle={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <View style={s.legendItem}>
            <View style={[s.legendDot, {backgroundColor: colors.primary}]} />
            <Text style={s.legendText}>이번달</Text>
          </View>
          <View style={s.legendItem}>
            <View style={[s.legendDot, {backgroundColor: colors.secondary}]} />
            <Text style={s.legendText}>전{chartType === 'month' ? '년' : '월'}</Text>
          </View>
        </Skeleton>
      </View>
    </Card>
  );
}

const s = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
    marginVertical: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontFamily: 'SuitRegular',
  },
  tabTextActive: {
    color: colors.text,
    backgroundColor: colors.border,
    fontFamily: 'SuitBold',
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
});
