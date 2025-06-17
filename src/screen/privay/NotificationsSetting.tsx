import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
// If you want icons, install react-native-vector-icons, or use any icon library you prefer
// import Icon from 'react-native-vector-icons/Ionicons';

const NotificationsSetting = () => {
  // State for toggles
  const [generalNotification, setGeneralNotification] = useState(true);
  const [sound, setSound] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [appUpdates, setAppUpdates] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <View   >
        <CustomHeader
          imageProps={{
            height: 22,
            width: 22
          }}
          mainView={{
            marginTop: 20
          }}
          imageSource={imageIndex.menu} label="Notifications" />

        {/* Body */}
        <View style={{ marginTop: 40,marginHorizontal:15 }}>

          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>General Notification</Text>
            <Switch
              value={generalNotification}
              onValueChange={val => setGeneralNotification(val)}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={generalNotification ? '#fff' : '#fff'}
            />
          </View>
          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>Sound</Text>
            <Switch
              value={sound}
              onValueChange={val => setSound(val)}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={sound ? '#fff' : '#fff'}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>Vibrate</Text>
            <Switch
              value={vibrate}
              onValueChange={val => setVibrate(val)}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={vibrate ? '#fff' : '#fff'}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.optionText}>App Updates</Text>
            <Switch
              value={appUpdates}
              onValueChange={val => setAppUpdates(val)}
              trackColor={{ false: '#767577', true: '#f4511e' }}
              thumbColor={appUpdates ? '#fff' : '#fff'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  hamburger: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: "rgba(251, 91, 43, 1)",
    fontWeight: "700",
    lineHeight:15
  },
});
