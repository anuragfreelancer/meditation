import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hp, wp } from '../../utils/Constant';
// import Geolocation from '@react-native-community/geolocation';

const WelcomeScreen = ({ navigation }: any) => {
    const [selectedRole, setSelectedRole] = useState('');
    useEffect(() => {

        getCurrentLocation()
    }, [])

    const getCurrentLocation = () => {
        try {
            // Geolocation.getCurrentPosition(
            //     async (position) => {
            //         const { latitude, longitude } = position.coords;
            //          try {
            //             const geoResponse = await Geocoder.from(latitude, longitude);
            //             const address = geoResponse.results[0]?.formatted_address ?? '';
            //         }
            //         catch {
            //         }
            //     })

        } catch (error) {
            console.error('Signup error:', error);
        } finally {
        }
    }

    return (
        <ImageBackground source={imageIndex.welcomeBg} imageStyle={{opacity:1,}} style={styles.mainBg}>
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <Image source={imageIndex.appLogo} style={styles.logo} resizeMode="contain" />
                </View>
            </View>
            <Text style={styles.heading}>Choose Your Role</Text>
            <Text style={styles.subHeading}>Select how you want to use ScrapApp</Text>
            <Image source={imageIndex.selectionbag} style={{
                height: 210,
                width: 300,
                marginTop: 44
            }} resizeMode="cover" />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.bottomButton, {
                    borderColor: selectedRole === 'customer' ? "rgba(251, 91, 43, 1)" : "gray"
                }]}
                    onPress={async () => {
                        try {
                            console.log("----- cc")
                            setSelectedRole('customer');
                            await AsyncStorage.setItem('userRole', 'customer'); // Save to AsyncStorage
                            navigation.navigate(ScreenNameEnum.ReadyScreen); // Navigate to ReadyScreen
                        } catch (error) {
                            console.error('Failed to save user role:', error);
                        }
                    }}
                >
                    <Image source={imageIndex.customerProfile} style={{
                        height: 60,
                        width: 60,
                    }} resizeMode="contain" />

                    <Text style={styles.buttonText}>Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, {
                    borderColor: selectedRole === 'scrapper' ? "rgba(251, 91, 43, 1)" : "gray"
                }]}
                    onPress={() => {
                        setSelectedRole('scrapper');
                        AsyncStorage.setItem('userRole', "scrapper");  // AsyncStorage में save
                        navigation.navigate(ScreenNameEnum.ReadyScreen);
                    }}
                >
                    <Image source={imageIndex.scrapper} style={{
                        height: 60,
                        width: 60,
                    }} resizeMode="contain" />
                    <Text style={styles.buttonText}>Scrapper</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    mainBg: {
        width: wp(100),
        height: hp(100),
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 100
    },
    logo: {
        height: 70,
        width: 70,
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 55,
        lineHeight: 28,
        color: "black"
    },
    subHeading: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        lineHeight: 21
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    radioButtonSelected: {
        backgroundColor: '#e6f7ff',
        borderColor: 'green',
    },
    radioInner: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'green',
        marginRight: 8,
    },
    radioText: {
        fontSize: 16,
    },
    illustration: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 35,
        paddingHorizontal: 20,
    },
    bottomButton: {
        flex: 1,
        paddingVertical: 17,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 24
    },
});

export default WelcomeScreen;
