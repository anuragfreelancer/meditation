import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
 import ScreenNameEnum from '../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import { color } from '../../constant';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';

// Define the navigation type
type RootStackParamList = {
    Home: undefined; // Change 'Home' to your actual destination screen name
};

const Splash: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
     // console.log("isLogOut",isLogOut)
      const isLogin = useSelector((state:any) => state.auth);
    const isFocus = useIsFocused();
    const checkLogout = () => {
      if (isLogin?.isLogin) {
        navigation.navigate('DrawerNav');
      } else {
         navigation.navigate(ScreenNameEnum.Onboarding);
       }
    };
  
    useEffect(() => {
      const timer = setTimeout(() => {
        checkLogout();
      }, 3000); // 3 सेकंड बाद checkLogout() कॉल होगा
  
      return () => clearTimeout(timer); // क्लीनअप के लिए
    }, [isFocus, navigation]);

    return (
        <View style={styles.container}>
            <SafeAreaView>
              <StatusBarComponent/>
                 <Image source={imageIndex.appLogo} style={styles.logo} resizeMode="contain" />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 92,
        width: 92,
    },
});

export default Splash;
