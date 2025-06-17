import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import imageIndex from '../assets/imageIndex';
import { color } from '../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

const MeditationCard = ({ data, send }) => {
    const navigation = useNavigation()
  return (
     <TouchableOpacity onPress={()=>navigation.navigate(send)} style={styles.card}>
 
      <Image source={data.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.desc}</Text>
        <View style={styles.row}>
          <Image source={imageIndex.time} style={styles.icon} />
          <Text style={styles.duration}>{data.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MeditationCard;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    alignItems: 'flex-start',
  },
  image: {
    width: 110,
    height: 95,
    borderRadius: 12,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: color.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: color.gray,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: color.primary,
    marginRight: 5,
  },
  duration: {
    fontSize: 12,
    color: color.primary,
  },
});
