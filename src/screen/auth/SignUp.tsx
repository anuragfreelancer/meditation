import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TextInputField from '../../utils/TextInputField';
import { errorToast } from '../../utils/customToast';
import Loading from '../../utils/Loader';
import StatusBarCompoent from '../../compoent/StatusBarCompoent';
import ResponsiveSize from '../../utils/ResponsiveSize';
import { styles } from './loginStyle';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SinupCustomer } from '../../Api/apiRequest';
import ScreenNameEnum from '../../routes/screenName.enum';
// import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
// import { getCurrentLocation } from './getLocation';


Geocoder.init("AIzaSyDgFGS91BvviXh_f-nmvtEggUHJcaGyUwA");
export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [loading, setLoading] = useState(false); // For loader
    const [currentLocation, setCurrentLocation] = useState({ latitude: 22.3072, longitude: 73.1812 })
    const [address, setAddress] = useState("")
    const navigation = useNavigation()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    useEffect(() => {
        getCurrentLocation()
    }, [])

    const handleIdentityText = (value: string) => {
        setEmail(value.trim());

        if (!value.trim()) {
            setEmailError('Please enter your email address.');
            return;
        }

        if (!emailRegex.test(value.trim())) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handlePassText = (value: string) => {
        setPassword(value);

        if (!value) {
            setPasswordError('Please enter your password.');
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
        } else if (/\s/.test(value)) {
            setPasswordError('Password should not contain spaces.');
        } else {
            setPasswordError('');
        }
    };

    const handleNameText = (value: string) => {
        setName(value);

        if (!value.trim()) {
            setNameError('Please enter your full name.');
        } else if (value.trim().length < 3) {
            setNameError('Full name must be at least 3 characters long.');
        } else {
            setNameError('');
        }
    };


    const SinupFunction = async () => {
        const role = await AsyncStorage.getItem('userRole');

        const trimmedEmail = email.trim();
        const trimmedName = name.trim();
        const passwordWithoutSpaces = password.replace(/\s/g, '');

        // Validate before calling API
        if (!trimmedName) {
            setNameError('Please enter your full name.');
            return;
        }

        if (trimmedName.length < 3) {
            setNameError('Full name must be at least 3 characters long.');
            return;
        }

        if (!trimmedEmail) {
            setEmailError('Please enter your email address.');
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setPasswordError('Please enter your password.');
            return;
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }

        if (/\s/.test(password)) {
            setPasswordError('Password should not contain spaces.');
            return;
        }

        // Params


        setLoading(true); // Show loader

        try {

            const params = {
                email: trimmedEmail,
                password: passwordWithoutSpaces,
                userName: trimmedName,
                navigation: navigation,
                type: role,
                lat: currentLocation?.latitude.toString(),
                lon: currentLocation?.longitude.toString(),
                address: address,
            };
            console.log(params)
            const response = await SinupCustomer(params, setLoading);
            if (response?.success) {
            } else {
                console.log('Signup failed:', response?.message || 'Unknown error');
            }

        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false); // Hide loader
        } finally {
            setLoading(false); // Hide loader
        }
    };

    const getCurrentLocation = () => {
        try {
            // Geolocation.getCurrentPosition(
            //     async (position) => {
            //         const { latitude, longitude } = position.coords;
            //         setCurrentLocation(position?.coords)
            //         try {
            //             const geoResponse = await Geocoder.from(latitude, longitude);
            //             const address = geoResponse.results[0]?.formatted_address ?? '';
            //             console.log(address)
            //             setAddress(address)
            //         }
            //         catch {
            //             console.error('Geocoding failed:',);
            //             errorToast('Failed to get address from location.');
            //             setLoading(false)
            //         }
            //     })

        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setLoading(false); // Hide loader
        }
    }
    // const SinupFunction = async () => {
    // const role = await AsyncStorage.getItem('userRole');
    // const trimmedEmail = email.trim();
    // const trimmedName = name.trim();
    // const passwordWithoutSpaces = password.replace(/\s/g, '');

    // // Basic validation checks (unchanged)...
    // if (!trimmedName || trimmedName.length < 3) { setNameError('...'); return; }
    // if (!trimmedEmail || !emailRegex.test(trimmedEmail)) { setEmailError('...'); return; }
    // if (!password || password.length < 6 || /\s/.test(password)) { setPasswordError('...'); return; }

    // setLoading(true);
    //     getCurrentLocation()
    //   .then(location => {
    //     if (location) {
    //       console.log('Current location with address:', location);
    //       // { latitude: ..., longitude: ..., address: '...' }
    //     }
    //   })
    //   .catch(error => console.error(error));

    // Get current location
    //     Geolocation.getCurrentPosition(
    //         async (position) => {
    //             const { latitude, longitude } = position.coords;

    //             try {
    //                 const geoResponse = await Geocoder.from(latitude, longitude);
    //                 const address = geoResponse.results[0]?.formatted_address ?? '';

    //                 const params = {
    //                     email: trimmedEmail,
    //                     password: passwordWithoutSpaces,
    //                     userName: trimmedName,
    //                     navigation: navigation,
    //                     type: role,
    //                     latitude: latitude.toString(),
    //                     longitude: longitude.toString(),
    //                     address: address,
    //                 };
    // console.log(params)
    //                 const response = await SinupCustomer(params, setLoading);
    //                 if (response?.success) {
    //                     // Handle success
    //                 } else {
    //                     console.log('Signup failed:', response?.message || 'Unknown error');
    //                 }
    //             } catch (geoError) {
    //                 console.error('Geocoding failed:', geoError);
    //                 errorToast('Failed to get address from location.');
    //             } finally {
    //                 setLoading(false);
    //             }
    //         },
    //         (error) => {
    //             console.error('Geolocation error:', error);
    //             errorToast('Failed to get current location.');
    //             setLoading(false);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //     );
    // };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ''}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0} // Adjust if needed
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', height:hp(100) }}>
                    <StatusBarCompoent />
                    {loading ? <Loading /> : null}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                backgroundColor: '#fff',

                                alignItems: 'center',
                                padding: 15,
                                flex: 1,
                                // marginTop: hp(2)

                            }}>
                            <Image
                                source={imageIndex.appLogo}
                                style={{ height: hp(3), width: '100%', marginVertical: 20 }} resizeMode='contain'
                            />

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: ResponsiveSize.marginTop(15) }}>
                                <Text style={styles.txtHeading}>Create Account</Text>
                                <Text style={styles.txtsubHeading}>
                                    Fill your information below or register with your social account
                                </Text>
                            </View>

                            <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2) }}>
                                <TextInputField
                                    text={name}
                                    PickCountry={setName}
                                    onChangeText={handleNameText}
                                    placeholder={'Name'}
                                    firstLogo={true}
                                    img={imageIndex.profileicon}
                                />
 <TextInputField
                                    // text={email}
                                    // onChangeText={handleIdentityText}
                                    placeholder={'Phone No.'}
                                    firstLogo={true}
                                    img={imageIndex.mobile}
                                />
                                 <TextInputField
                                    text={email}
                                    onChangeText={handleIdentityText}
                                    placeholder={'Email Address'}
                                    firstLogo={true}
                                    img={imageIndex.email}
                                />

                                {/* {nameError ? <Text style={styles.textEr}>{nameError}</Text> : null} */}
<TextInputField
                                    // text={name}
                                    // PickCountry={setName}
                                    // onChangeText={handleNameText}
                                    placeholder={'City'}
                                    firstLogo={true}
                                    img={imageIndex.city}
                                />
                               
                                {/* {emailError ? <Text style={styles.textEr}>{emailError}</Text> : null} */}
                                <TextInputField
                                    text={password}
                                    onChangeText={handlePassText}
                                    placeholder={'Password'}
                                    firstLogo={true}
                                    showEye={true}
                                    hide={true}
                                    img={imageIndex.lock}

                                />

                                <TextInputField
                                    // text={password}
                                    // onChangeText={handlePassText}
                                    placeholder={'Confirm Password'}
                                    firstLogo={true}
                                    showEye={true}
                                    hide={true}
                                    img={imageIndex.lock}

                                />
                                {/* {passwordError ? <Text style={styles.textEr}>{passwordError}</Text> : null} */}


                            </View>

                            <CustomButton
                                title={'Sign Up'}
                                // onPress={() => {
                                //     SinupFunction()
                                // }}
                                onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}  
                                buttonStyle={{ marginHorizontal: 20, width: "100%", marginTop: 20 }}
                            />


                            <View
                                style={{
                                    height: hp(5),
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    alignSelf: 'center',
                                    marginTop: hp(3),
                                    justifyContent: 'center',
                                }}>
                                <Text style={{ fontSize: 16, lineHeight: 22, color: 'rgba(144, 144, 144, 1)', fontWeight: '600' }}>
                                    Already have an account?{' '}
                                </Text>
                                <TouchableOpacity

                                    onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}

                                >

                                    <Text style={Styles.text}>Login</Text>

                                </TouchableOpacity>
                            </View>


                        </View>

                    </ScrollView>


                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const Styles = StyleSheet.create({

    text: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '700',
        color: 'Black',
    },
    textEr: { color: 'red', fontSize: 12 },
    btn: {
        alignSelf: 'center',
        backgroundColor: 'Black',
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        width: '95%',
    },
});
