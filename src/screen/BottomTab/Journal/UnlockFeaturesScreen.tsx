import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../assets/imageIndex';
import { height } from '../../../utils/Constant';

const { width } = Dimensions.get('window');

const UnlockFeaturesScreen = () => {
  const [activeTab, setActiveTab] = useState('Monthly');

  return (
    <View style={styles.container}>
      <ImageBackground source={imageIndex.unlock} style={styles.headerImage} >
        <View style={{flex:0.5}}></View>

      <View style={styles.card}>
        <Text style={styles.title}>Unlock All Features</Text>

        {/* Tab */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('Monthly')}
            style={[styles.tabButton, activeTab === 'Monthly' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'Monthly' && styles.activeTabText]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Yearly')}
            style={[styles.tabButton, activeTab === 'Yearly' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'Yearly' && styles.activeTabText]}>
              Yearly
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feature List */}
        <View style={styles.features}>
          {[
            'All Guided Meditations',
            'AI Reflection Assistant',
            'Full Fasting Analytics',
            'Lorem ipsum dolor sit.',
            'Lorem i sit amet consectetur.',
          ].map((item, index) => (
            <View style={styles.featureItem} key={index}>
              <Image source={imageIndex.check} style={styles.checkIcon} />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Upgrade Button */}
        <TouchableOpacity style={styles.upgradeBtn}>
          <Text style={styles.upgradeText}>Upgrade Now $ 23.00 /</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
};

export default UnlockFeaturesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
flex:0.5,
justifyContent:"flex-end",
alignItems:'center'
    // alignSelf:'flex-end'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    padding: 5,
    marginBottom: 20,
    alignSelf: 'center',
    // width:'80%'
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 25,
    width:'35%',
    alignItems:'center',
    justifyContent:'center',
    height:45
  },
  activeTab: {
    backgroundColor: '#81A07B',
  },
  tabText: {
    color: '#777',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  features: {
    marginBottom: 25,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkIcon: {
    width: 18,
    height: 18,
    tintColor: '#D9534F',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  upgradeBtn: {
    backgroundColor: '#81A07B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width:'90%'
  },
  upgradeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
