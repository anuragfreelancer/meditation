import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';


const JournalScreen = () => {
  const [reflection, setReflection] = useState('');
const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Journal</Text>

      {/* Reflection Box */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today’s Reflection</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Write"
            multiline
            value={reflection}
            onChangeText={setReflection}
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Image source={imageIndex.send} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Feedback Box */}
      <TouchableOpacity style={styles.aiBox} onPress={()=>navigation.navigate(ScreenNameEnum.UnlockFeature)}>
        <Image source={imageIndex.lock2} style={styles.lockIcon} />
        <Text style={styles.aiText}>
          <Text style={styles.aiTitle}>AI Feedback:</Text> {'\n'}
          Upgrade to premium to unlock insights.
        </Text>
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save Reflection</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reminderButton}>
          <Text style={styles.buttonText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JournalScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    fontSize: 14,
  },
  inputWrapper: {
    backgroundColor: '#F7F8F8',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    minHeight: 180,
    textAlignVertical:'top'
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF6F61',
    marginLeft: 10,
    marginTop: 4,
  },
  aiBox: {
    backgroundColor: '#20085E',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockIcon: {
    width: 20,
    height: 20,
    // tintColor: '#fff',
    marginRight: 10,
  },
  aiText: {
    color: '#fff',
    fontSize: 13,
    flex: 1,
  },
  aiTitle: {
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#D56550',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reminderButton: {
    backgroundColor: '#81A07B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
});
