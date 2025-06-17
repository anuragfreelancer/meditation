import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { styles } from './style';
import imageIndex from '../../../assets/imageIndex';
import MeditationCard from '../../../compoent/MeditationCard';
import ScreenNameEnum from '../../../routes/screenName.enum';

const meditationData = [
  {
    id: '1',
    title: 'Mindful Morning',
    desc: 'Start your day with 10 minutes of deep breathing and journaling.',
    duration: '3 mins',
    image: imageIndex.image2,
  },
  {
    id: '2',
    title: 'Find Your Inner Calm',
    desc: 'Explore guided meditations to center your mind and nurture peace.',
    duration: '3 mins',
    image: imageIndex.image4,
  },
  {
    id: '3',
    title: 'Meditation Moments',
    desc: 'Short and powerful sessions to help you relax, reflect, and recharge.',
    duration: '3 mins',
    image: imageIndex.image3,
  },
  {
    id: '4',
    title: 'Stillness Within',
    desc: 'Take a breath. These practices are designed to help you reconnect with yourself.',
    duration: '3 mins',
    image: imageIndex.image5,
  },
  {
    id: '5',
    title: 'Daily Mindfulness',
    desc: 'Start and end your day with presence and calm.',
    duration: '3 mins',
    image: imageIndex.apti,
  },
  {
    id: '1',
    title: 'Mindful Morning',
    desc: 'Start your day with 10 minutes of deep breathing and journaling.',
    duration: '3 mins',
    image: imageIndex.image2,
  },
  
];

const TrainingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Training</Text>
      <FlatList
        data={meditationData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MeditationCard data={item} send={ScreenNameEnum.MeditationDetail} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TrainingScreen;
