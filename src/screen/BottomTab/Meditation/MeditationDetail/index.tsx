import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../../assets/imageIndex';

const { width } = Dimensions.get('window');

const MeditationDetail = ({ item, navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Image with Overlay */}
        <View style={styles.header}>
          <Image source={imageIndex.image2} style={styles.headerImage} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Image source={imageIndex.back} style={styles.icon} />
          </TouchableOpacity>

         <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Mindful Morning</Text>
              <Text style={styles.subtitle}>Start your day with 10 minutes of deep breathing and journaling.</Text>
              <View style={styles.durationContainer}>
                <Image source={imageIndex.time} style={styles.timerIcon} />
                <Text style={styles.durationText}>3 mins</Text>
              </View>
            </View>

              <TouchableOpacity style={styles.playBtn}>
                <Image source={imageIndex.playGreen} style={styles.playIcon} />
              </TouchableOpacity>
          
        </View>

        {/* Description */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            Start your day with 10 minutes of deep breathing and journaling.
          </Text>

          <Text style={styles.benefitsTitle}>Benefits / What to Expect</Text>

          {/* Benefits List */}
          <View style={styles.benefitBox}>
            <Image source={imageIndex.calm} style={styles.benefitIcon} />
            <Text style={styles.benefitText}>Calm your mind</Text>
          </View>

          <View style={styles.benefitBox}>
            <Image source={imageIndex.focus} style={styles.benefitIcon} />
            <Text style={styles.benefitText}>Improve your focus</Text>
          </View>

          <View style={styles.benefitBox}>
            <Image source={imageIndex.refelect} style={styles.benefitIcon} />
            <Text style={styles.benefitText}>Reflect with journaling</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MeditationDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    width: '100%',
    height: 280,

  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: "#000"
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
  },
  backBtn: {
    position: 'absolute',
    top: 35,
    left: 15,
    padding: 10,
    // backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 50,
  },
  playBtn: {
    // position: 'absolute',
    // right: 20,
    // top: 110,
     position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 1.5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  playIcon: {
    width: 40,
    height: 40,
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 120,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  timerIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  durationText: {
    color: '#fff',
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  benefitsTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  benefitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FBFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    height:60
  },
  benefitIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
  },
});

