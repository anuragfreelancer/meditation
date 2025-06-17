import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../utils/TextInputField';
import Loading from '../../utils/Loader';
import { errorToast, successToast } from '../../utils/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomButton from '../../compoent/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePassword } from '../../Api/apiRequest';

export default function CreatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const route = useRoute();
      const { userId } = route.params || ''; // Provide a fallback if route.params is undefined
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const navigation = useNavigation()
    const validatePassword = (pass:string) => {
        if (!pass) {
            setPasswordError('Password is required');
            return false;
        } else if (pass.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    // Function to validate confirm password
    const validateConfirmPassword = (pass:string, confirmPass:any) => {
        if (!confirmPass) {
            setConfirmPasswordError('Please confirm your password');
            return false;
        } else if (pass !== confirmPass) {
            setConfirmPasswordError('Passwords do not match');
            return false;
        } else {
            setConfirmPasswordError('');
            return true;
        }
    };

    // Handling Password Input Change
    const handlePassText = (text:string) => {
        setPassword(text);
        const isPassValid = validatePassword(text);
        validateConfirmPassword(text, confirmPassword);
        setIsValid(isPassValid && text === confirmPassword);
    };

    // Handling Confirm Password Input Change
    const handleCPassText = (text:string) => {
        setConfirmPassword(text);
        const isConfirmValid = validateConfirmPassword(password, text);
        setIsValid(isConfirmValid && password === text);
    };


    const handleSetPassword = async () => {
        const role = await AsyncStorage.getItem('userRole');

        if (!isValid) {
            setPasswordError("Password is required");
            setConfirmPasswordError("Please confirm your password");
            return;
        }
        userId 

        try {
            const params = {
              userId: userId,
               navigation: navigation,
               confirmPassword:confirmPassword
             };
            const response = await updatePassword(params, setisLoading);
          } catch (error) {
            console.error("Login error:", error);
          }
 
    };

    return (
        <SafeAreaView style={{
            backgroundColor: '#FFF',
             padding: 15,
            flex: 1,
        }}>
            <StatusBarComponent />
            <View style={{ flex: 1, backgroundColor: "white" }}>

                {isLoading ? <Loading /> : null}
                <ScrollView showsVerticalScrollIndicator={false}  >


                    <TouchableOpacity
                        style={{ marginTop: 8, width: '15%' }}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image
                            source={imageIndex.back}
                            style={{ height: 32, width: 32 }}
                        />
                    </TouchableOpacity>
                    <View style={{ marginTop: 15,   }}>
                        <View style={{ height: hp(9), }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontWeight: '700',
                                        color: 'rgba(0, 0, 0, 1)',
                                        lineHeight: 36,
                                        marginTop: 15,
                                        textAlign:'center'
                                    }}>Create New Password
                                </Text>
                            </View>
                            <View style={{ width: '85%', alignSelf:'center'}}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: '400',
                                        color: 'rgba(157, 178, 191, 1)',
                                        lineHeight: 24,
                                        marginTop: 5,
                                        textAlign:'center'

                                    }}>
                                    Your new password must be different from previous used passwords.
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 80, }}>

                            <TextInputField
                                text={password}
                                onChangeText={handlePassText}
                                // value={password}
                                showEye={true}

                                placeholder={'New Password'}
                                firstLogo={true}
                                img={imageIndex.lock}
                            />
                            {passwordError ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 5 }}>{passwordError}</Text> : null}


                            <TextInputField
                                hide={true}
                                onChangeText={handleCPassText}
                                text={confirmPassword}
                                firstLogo={true}
                                name={'New Confirm Password'}
                                placeholder={'Confirm Password'}
                                img={imageIndex.lock}
                                showEye={true}
                            />

                        </View>
                        {confirmPasswordError ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 5 }}>{confirmPasswordError}</Text> : null}

                    </View>


                </ScrollView>

                {/* <TouchableOpacity onPress={() => {
                    handleSetPassword()

                }} style={styles1.btn}>
                    <Text
                        style={{
                            color: '#FFF',
                            fontSize: 17,
                            fontWeight: '700',
                            lineHeight: 21,
                        }}>
                        Save
                    </Text>

                </TouchableOpacity> */}
                <CustomButton title='Save' 
                onPress={(()=>handleSetPassword())}
                // onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}
                 />

            </View>
        </SafeAreaView>
    );
}


const styles1 = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        backgroundColor: '#E8442E',
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',

        width: wp(90),
    },
})