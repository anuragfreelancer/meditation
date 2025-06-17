import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    useNavigation,
} from '@react-navigation/native';
import Loading from '../../utils/Loader';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomButton from '../../compoent/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restEmailOtpScreen } from '../../Api/apiRequest';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../utils/TextInputField';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function PasswordReset() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
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
    // Final Login Validation and API Call
    // const passFunction = async () => {
    //     const role = await AsyncStorage.getItem('userRole');
    //     const trimmedEmail = email.trim();
    //     if (trimmedEmail === '') {
    //         setEmailError('Email  is required');
    //     } else if (!emailRegex.test(trimmedEmail)) {
    //         setEmailError('Please enter a valid Email Address');
    //         return;
    //     } else {
    //         setEmailError('');
    //     }
    //     try {
    //         const params = {
    //             email: email,
    //              navigation: navigation,
    //         };
    //         const response = await restEmailOtpScreen(params, setLoading);
    //     } catch (error) {
    //         console.error("Login error:", error);
    //     }
    // };

    const passFunction = async () => {
        try {
            const role = await AsyncStorage.getItem('userRole');
            const trimmedEmail = email.trim();

            // Reset previous error messages
            setEmailError('');

            // Validate email input
            if (!trimmedEmail) {
                setEmailError('Email is required');
                return;
            }

            if (!emailRegex.test(trimmedEmail)) {
                setEmailError('Please enter a valid Email Address');
                return;
            }

            // Prepare API parameters
            const params = {
                email: trimmedEmail,
                navigation: navigation,
            };

            // Call API to send OTP
            const response = await restEmailOtpScreen(params, setLoading);

            if (!response) {
                setEmailError('Failed to send OTP. Please try again.');
            }

        } catch (error) {
            console.error("Login error:", error);
            setEmailError('Something went wrong. Please try again.');
        }
    };

    // Handling Password Input Change


    return (
        <SafeAreaView style={{
            backgroundColor: '#FFF',
            padding: 15,
            flex: 1,
        }}>
            <StatusBarComponent />
            <View style={{ flex: 1, backgroundColor: "white" }}>

                {loading ? <Loading /> : null}
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
                    <View style={{ marginTop: 15, marginBottom: 15 }}>
                        <View style={{ height: hp(9), }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontWeight: '700',
                                        color: 'rgba(0, 0, 0, 1)',
                                        lineHeight: 36,
                                        marginTop: 15,
                                        textAlign: 'center'
                                    }}>Password Reset
                                </Text>
                            </View>
                            <View style={{ width: '85%', alignSelf: 'center', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: '400',
                                        color: 'rgba(157, 178, 191, 1)',

                                        marginTop: 5,
                                        textAlign: 'center'


                                    }}>
                                    Please put your mobile number to reset your password</Text>
                            </View>
                        </View>
                    </View>
                    <TextInputField
                        // text={email}
                        // onChangeText={handleIdentityText}
                        placeholder={'Phone No.'}
                        firstLogo={true}
                        img={imageIndex.mobile}
                        style={{ boderWidth: 1, borderColor: "red" }}
                    />
                    <Text style={styles.orText}>Or</Text>

                    <TextInputField
                        text={email}
                        onChangeText={handleIdentityText}
                        placeholder={'Email Address'}
                        firstLogo={true}
                        img={imageIndex.email}
                    />
                    {emailError ? <Text style={{ color: 'red', fontSize: 12, marginTop: 12 }}>{emailError}</Text> : null}

                </ScrollView>


                {/* <CustomButton title='Submit' onPress={() => passFunction()} /> */}
                <CustomButton title='Submit' onPress={() => navigation.navigate(ScreenNameEnum.OtpScreen)} />
            </View>
        </SafeAreaView>
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

        width: wp(90),
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 60,
        borderWidth: 1.8,
        borderRadius: 20,
        borderColor: "rgba(251, 91, 43, 1)"
    },
    bottomButton: {
        flex: 1,
        paddingVertical: 12,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 24,
        marginLeft: 10
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold'
    }
})