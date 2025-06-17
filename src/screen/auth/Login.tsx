import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import TextInputField from '../../utils/TextInputField';
import Loading from '../../utils/Loader';
import StatusBarCompoent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import { styles as loginStyles } from './loginStyle'; // your existing login styles
import ResponsiveSize from '../../utils/ResponsiveSize';
import { wp } from '../../utils/Constant';
import CustomButton from '../../compoent/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCustomer } from '../../Api/apiRequest';
import { useDispatch } from 'react-redux';
import { color } from '../../constant';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const dispatch = useDispatch();

  const handleIdentityText = (value: string) => {
    setEmail(value.trim());
    if (value.trim() === '') {
      setEmailError('Email is required');
      return;
    }
    if (!emailRegex.test(value.trim())) {
      setEmailError('Please enter a valid Email Address');
    } else {
      setEmailError('');
    }
  };

  const handlePassText = (value: string) => {
    setPassword(value);
    if (value.trim() === '') {
      setPasswordError('Password is required');
    } else if (value.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const LoginFunction = async () => {
    const role = await AsyncStorage.getItem('userRole');
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (trimmedEmail === '') {
      setEmailError('Email is required');
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Please enter a valid Email Address');
      return;
    } else {
      setEmailError('');
    }
    if (trimmedPassword === '') {
      setPasswordError('Password is required');
      return;
    } else if (trimmedPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError('');
    }
    try {
      const params = {
        email: email,
        password: password,
        roleType: role,
        navigation: navigation,
      };
      const response = await LoginCustomer(params, setLoading, dispatch);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <SafeAreaView style={localStyles.safeArea}>
      <StatusBarCompoent />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? <Loading /> : null}
        <View style={localStyles.container}>
          <Image
            source={imageIndex.appLogo}
            style={localStyles.logo}
            resizeMode='contain'
          />
          <View style={localStyles.headingContainer}>
            <Text style={loginStyles.txtHeading}>Login</Text>
            <Text style={loginStyles.txtsubHeading}>
              Enter your email and password
            </Text>
          </View>

          <View style={localStyles.formContainer}>
            <TextInputField
              text={email}
              onChangeText={handleIdentityText}
              placeholder={'Email Address '}
              firstLogo={true}
              img={imageIndex.email}
            />
            {emailError ? <Text style={localStyles.errorText}>{emailError}</Text> : null}
            <TextInputField
              text={password}
              onChangeText={handlePassText}
              placeholder={'Password'}
              firstLogo={true}
              showEye={true}
              img={imageIndex.lock}
            />
            {passwordError ? <Text style={localStyles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.PasswordReset)
              }}
              style={localStyles.forgotContainer}>
              <Text style={localStyles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title={'LogIn'}
                onPress={()=>navigation.navigate(ScreenNameEnum.Tab)}

            // onPress={LoginFunction}
            buttonStyle={localStyles.button}
          />

          <View style={localStyles.signUpContainer}>
            <Text style={localStyles.signUpText}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.SignUpScreen)
              }}>
              <Text style={localStyles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <Text style={localStyles.orText}>OR</Text>
        </View>
<View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
        <Image
          source={imageIndex.google}
          style={localStyles.googleLogo}
          resizeMode='contain'
        />
          <Text style={{color:'black',marginLeft:10, fontSize:16}}>Sign In with Google</Text>

        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// All extracted styles
const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 15,
    flex: 1,
    marginTop: hp(8),
  },
  logo: {
    height: hp(3),
    width: '100%',
    marginVertical: 20,
    marginBottom: 35,
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  formContainer: {
    marginTop: ResponsiveSize.marginTop(30),
    paddingVertical: hp(2),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  forgotContainer: {
    alignSelf: 'center',
    marginTop: 22,
    borderBottomWidth: 0.9,
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  forgotText: {
    color: color.buttonColor,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  button: {
    marginHorizontal: 20,
    width: '100%',
    marginTop: 30,
  },
  signUpContainer: {
    height: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: wp(100),
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(144, 144, 144, 1)',
  },
  signUpLink: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: color.buttonColor,
    bottom: 2,
  },
  orText: {
    lineHeight: 16,
    marginTop: 30,
    marginBottom: 32,
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontWeight: "500",
  },
  googleLogo: {
    height: 23,
  },
});