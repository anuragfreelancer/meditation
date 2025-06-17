import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import imageIndex from '../../../../assets/imageIndex';

const { width } = Dimensions.get('window');

const AudioPlayerScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
     <TouchableOpacity
                           style={{ marginTop: 8, width: '15%', alignSelf:'flex-start' }}
                           onPress={() => {
                               navigation.goBack();
                           }}>
                           <Image
                               source={imageIndex.back}
                               style={{ height: 32, width: 32 }}
                           />
                       </TouchableOpacity>

      {/* Main Image */}
      <Image source={imageIndex.apti} style={styles.mainImage} />

      {/* Title and Description */}
      <Text style={styles.title}>Mindful Morning</Text>
      <Text style={styles.subtitle}>
        Start your day with 10 minutes of deep breathing and journaling.
      </Text>

      {/* Controls */}
      <View style={styles.controlsContainer}>
         <TouchableOpacity>
          <Image source={imageIndex.crossPlay} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={imageIndex.backplay} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton}>
          <Image source={imageIndex.play} style={styles.playIcon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={imageIndex.next} style={styles.icon} />
        </TouchableOpacity>
         <TouchableOpacity>
          <Image source={imageIndex.repeate} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioPlayerScreen;
