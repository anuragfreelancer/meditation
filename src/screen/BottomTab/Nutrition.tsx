import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import imageIndex from '../../assets/imageIndex';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const sattvicFoodData = [
  { id: '1', title: 'Fruits', icon: imageIndex.fruits, status: 'allowed' },
  { id: '2', title: 'Mung Beans', icon: imageIndex.beans, status: 'allowed' },
  { id: '3', title: 'Onion, Garlic', icon: imageIndex.onion, status: 'restricted' },
];

const NutritionScreen = () => {
  const totalSeconds = 1 * 60 * 60;
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.foodCard}>
      <Image source={item.icon} style={styles.foodIcon} />
      <Text style={styles.foodTitle}>{item.title}</Text>
      <Image
        source={
          item.status === 'allowed'
            ? imageIndex.checkGreenIcon
            : imageIndex.crossRedIcon
        }
        style={styles.statusIcon}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator = {false}>
      <View style={styles.row}>
        <Text style={styles.header}>Nutrition</Text>
        <Image style={styles.icon} source={imageIndex.chart} />
      </View>
      {/* Timer Card */}
      <View style={styles.timerCard}>
        <Text style={styles.header}>Fasting Tracker</Text>

        <AnimatedCircularProgress
          size={200}
          width={20}
          fill={(1 - seconds / (8 * 60 * 60)) * 100}
          tintColor="#D56550"
          backgroundColor="#EDEDED"
          rotation={0}
          lineCap="round"
          style={styles.circle}
        >
          {() => (
            <>
              <Text style={styles.timerText1}>{"Fasting Time"}</Text>

              <Text style={styles.timerText}>{formatTime(seconds)}</Text>

              {/* <View style={styles.startPointIndicator} /> */}
            </>
          )}
        </AnimatedCircularProgress>

        {/* <Text style={styles.timerText}>{formatTime(seconds)}</Text> */}

        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>Start from</Text>
          <Text style={styles.timeLabel}>End to</Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeValue}>04:00 AM</Text>
          <Text style={styles.timeValue}>12:00 PM</Text>
        </View>
      </View>

      {/* Daily Log */}
      <View style={styles.logSection}>
        <View style={[styles.logRow, {justifyContent:'flex-start'}]}>
          <Image style={styles.icon} source={imageIndex.food} />
        <Text style={styles.sectionTitle}>  Daily Log</Text>
          </View>
        <View style={styles.logRow}>
          <Text>Mood</Text>
          <Text style={styles.boldText}>Happy</Text>
        </View>
        <View style={styles.logRow}>
          <Text>Food</Text>
          <Text style={styles.boldText}>Khichdi + Tea</Text>
        </View>
        <View style={styles.logRow}>
          <Text>Energy</Text>
          <Text style={styles.boldText}>Low</Text>
        </View>
      </View>

      {/* Food Guide */}
       <View style={[styles.logRow, {justifyContent:'flex-start'}]}>
          <Image style={styles.icon} source={imageIndex.food} />
      <Text style={styles.sectionTitle}>  Sattvic Food Guide</Text>
      </View>
      <FlatList
      style={{marginBottom:30}}
        data={sattvicFoodData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NutritionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '98%'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  }, centerContent: {
    position: 'absolute',
    top: '38%',
    left: '25%',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#777',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dotOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  timerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1
  },
  startPointIndicator: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 9,
    top: 10,
    left: 90,
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#D56550',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  circle: {
    marginBottom: 15,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  timerText1: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  timeLabel: {
    fontSize: 13,
    color: '#A3A3A3',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: "#81A07B"
  },
  logSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    elevation:1
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  boldText: {
    fontWeight: '600',
  },
  foodCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation:1,
    // height:70
  },
  foodIcon: {
    width: 90,
    height: 90,
    // borderRadius: 20,
    marginRight: 12,
  },
  foodTitle: {
    flex: 1,
    fontSize: 14,
  },
  statusIcon: {
    width: 16,
    height: 16,
  },
  icon: {
    height: 30,
    width: 30
  }
});
