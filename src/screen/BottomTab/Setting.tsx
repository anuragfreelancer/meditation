import { Image, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../routes/screenName.enum';
import imageIndex from '../../assets/imageIndex';
import { color } from '../../constant';

const Settings = ({ navigation }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container1]}>
        {/* Back Button - Aligned to Left */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Image source={imageIndex.back} style={[styles.image]}
            resizeMode='cover'
          />
        </TouchableOpacity>

        {/* Centered Label */}
        <View style={styles.labelContainer}>
          <Text style={styles.text}>Settings</Text>
        </View>
      </View>
      <Text
        style={styles.title}>{"Settings"}
      </Text>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate(ScreenNameEnum.language)
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={imageIndex.language} style={styles.icon} />
          <Text style={styles.menuText}>{"Language"}</Text>
        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // navigation.navigate(ScreenNameEnum.language)

        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={imageIndex.notification} style={styles.icon} />
          <Text style={styles.menuText}>{"Notification"}</Text>
        </View>
        <Switch
          trackColor={{ false: '#ccc', true: color.primary }} // Teal background when on
          thumbColor={'#fff'} // White circle
          ios_backgroundColor="#ccc"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate(ScreenNameEnum.LegalPoliciesScreen)

        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={imageIndex.privacy} style={styles.icon} />
          <Text style={styles.menuText}>{"Privacy Policy"}</Text>
        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate(ScreenNameEnum.HelpSupportScreen)

        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={imageIndex.support} style={styles.icon} />
          <Text style={styles.menuText}>{"Contact Support"}</Text>
        </View>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // navigation.navigate(ScreenNameEnum.changePassword)

        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={imageIndex.logout} style={styles.icon} />
          <Text style={styles.menuText}>{"Logout"}</Text>
        </View>

      </TouchableOpacity>
    </SafeAreaView>

  )
}

export default Settings


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },

  container1: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    position: 'relative',

  },
  button: {
    position: 'absolute',
    left: 0,
    padding: 8,
    zIndex: 1, // Ensure it's on top if needed
  },
  image: {
    height: 30,
    width: 30,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },


  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  logoImage: {
    width: 94,
    height: 94,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 36,
    marginTop: 15,
    textAlign: 'left',
    marginLeft: 15
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "space-between"
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    fontWeight: "500"
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoutButton: {
    position: "relative",
    top: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 14,

  },
  logoutText: {
    fontSize: 14,
    marginLeft: 10,
    color: 'rgba(53, 44, 72, 1)',
    fontWeight: "500",
    lineHeight: 100,

  },
  subMenuItem: {
    paddingLeft: 60,
    paddingVertical: 10,
  },
  subMenuText: {
    fontSize: 14,
    color: '#333',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] // Optional: Make it slightly bigger
  }
});