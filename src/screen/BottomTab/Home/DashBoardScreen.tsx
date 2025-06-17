import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList,
} from 'react-native';

import { styles } from './style';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import MeditationCard from '../../../compoent/MeditationCard';

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
]
const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={{ marginBottom:50} } showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.profileRow}>
                    <Image source={imageIndex.dummyProfile} style={styles.profileImg} />
                    <View>
                        <Text style={styles.username}>Good Morning</Text>
                        <Text style={styles.greeting}>Adison Mango</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate(ScreenNameEnum.Settings)}>
                    <Image source={imageIndex.setting} style={styles.settingIcon} />
                </TouchableOpacity>
            </View>

            {/* Streak */}
            <View style={styles.streakCard}>
                <View style={{flexDirection:"row", alignItems:'center'}}>
                <Image source={imageIndex.fire} style={styles.fireIcon} />
              <View>
                <Text style={styles.streakTitle}>3 Day Streak!</Text>
                <Text style={styles.streakSubText}>
                    Complete a lesson every day to build your streak
                </Text>
                <View style={styles.daysRow}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dayCircle,
                                i < 3 && styles.dayActive, // first 3 days active
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    i < 3 && styles.dayTextActive,
                                ]}
                            >
                                {day}
                            </Text>
                        </View>
                    ))}
                    </View>
                    </View>
                </View>
            </View>

            {/* Daily Meditation Tips */}
            <Text style={styles.sectionTitle}>Daily meditation tips</Text>
<FlatList
        data={meditationData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MeditationCard data={item} send={ScreenNameEnum.AudioPlayer}/>}
        // contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
            {/* <TouchableOpacity onPress={()=>navigation.navigate(ScreenNameEnum.AudioPlayer)} style={styles.card}>
                <Image source={imageIndex.morning} style={styles.cardImg} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Mindful Morning</Text>
                    <Text style={styles.cardDesc}>
                        Start your day with 10 minutes of deep breathing and journaling
                    </Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={imageIndex.time} style={styles.fastingIcon1} />

                    <Text style={styles.cardTime}>2 mins</Text>
              </View> </View>
            </TouchableOpacity> */}

                      {/* <TouchableOpacity onPress={()=>navigation.navigate(ScreenNameEnum.AudioPlayer)} style={styles.card}>

                <Image source={imageIndex.apti} style={styles.cardImg} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Gratitude Boost</Text>
                    <Text style={styles.cardDesc}>
                        Write down 3 things you’re thankful for today.
                    </Text>
<View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={imageIndex.time} style={styles.fastingIcon1} />

                    <Text style={styles.cardTime}>2 mins</Text>
              </View>
                </View>
            </TouchableOpacity> */}

            <TouchableOpacity>
                <Text style={styles.viewMore}>View More</Text>
            </TouchableOpacity>

            {/* Prompt Section */}
            <View style={styles.promptCard}>
                <Text style={styles.promptText}>Prompt: “What truth are you avoiding?”</Text>
                <View style={styles.writeBox}>
                    <TextInput placeholder="Write" style={styles.writeInput} />
                    <TouchableOpacity>
                        <Image source={imageIndex.send} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Fasting Section */}
            <View style={styles.fastingCard}>
                <Image source={imageIndex.time} style={styles.fastingIcon}  tintColor={color.buttonColor}/>
                <View>
                    <Text style={styles.fastingTitle}>Fasting</Text>
                    <Text style={styles.fastingStatus}>14h Intermittent (Active)</Text>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
