import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from
  'react-native-confirmation-code-field';
 import Loading from '../../utils/Loader';
 import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { otp_Verify } from '../../Api/apiRequest';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function OtpScreen() {
  const route = useRoute();
  const { email } = route.params || ""; // Provide a fallback if route.params is undefined
   const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleChangeText = (text:string) => {
    setValue(text);

    if (text.length < 4) {
      setErrorMessage('Please enter a 4-digit code.');
    } else {
      setErrorMessage('');
    }
  };
  const handleVerifyOTP = async () => {
    const role = await AsyncStorage.getItem('userRole');
    if (value.length !== 4) {
      setErrorMessage('Please enter a valid 4-digit OTP.');
      return;
    }
    setErrorMessage('');
    setisLoading(true);
    try {
      const params = {
        email: email,
         navigation: navigation,
         otp:value,
      };
      const response = await otp_Verify(params, setisLoading);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  ;



  return (
    <View style={{
      backgroundColor: '#FFF',
      padding: 15,
      flex: 1,
    }}>
      {isLoading ? <Loading /> : null}
      <SafeAreaView>
        <StatusBarComponent />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{ marginTop: 8, width: '15%', }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={imageIndex.back}
              style={{ height: 32, width: 32 }}
            />
          </TouchableOpacity>
          <View style={{ height: hp(15), marginTop: 5 }}>
            <View style={{ marginTop: 25, }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: 'rgba(0, 0, 0, 1)',
                  lineHeight: 36,
                  marginTop: 15,

                }}>
                Check your mail or check your cell phone
              </Text>
            </View>
            <View style={{ marginTop: 10, }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: 'rgba(157, 178, 191, 1)',
                  lineHeight: 24,

                }}>
                Please put the 4 digits sent to you
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 14,
                  lineHeight: 24,
                  color: '#9DB2BF',
                }}>
              </Text>

            </View>
          </View>
          <View
            style={{ height: hp(10), marginHorizontal: 18, marginTop: 60, justifyContent: "flex-start" }} >
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={handleChangeText}
              cellCount={4}
              rootStyle={{


              }}

              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View style={{ marginStart: -1, backgroundColor: '#E9E9E9', borderRadius: 10, }}>


                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {errorMessage ? (
              <Text style={{ color: 'red', marginTop: 18 }}>{errorMessage}</Text>
            ) : null}
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: hp(30), marginTop: 30 }}>
            <Image source={imageIndex.baner}
              resizeMode='stretch'
              style={{ height: '100%', width: '100%' }} />
          </View>

        </ScrollView>
        <CustomButton
          title={'Submit'}
          onPress={()=>navigation.navigate(ScreenNameEnum.CreatePassword)}
          // onPress={() => handleVerifyOTP()}
          buttonStyle={{ width: "100%", position: "relative", top: 120 }}
        />

      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    backgroundColor: '#E8442E',
    height: 55,

    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(23),

    width: wp(90),
  },


  codeFieldRoot: { marginTop: 20, },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 1.5,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    color: '#000',
    borderRadius: 10,
    backgroundColor: '#E9E9E9',

  },
  focusCell: {
    borderColor: '#D56550',

    backgroundColor: 'white',



  },
});



