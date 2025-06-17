import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';

const ReadyScreen = ({ navigation }: any) => {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <Image source={imageIndex.appLogo} style={styles.logo} resizeMode="contain" />
                </View>
            </View>
            <Image source={imageIndex.readyBag} style={{
                height: 210,
                width: 300,
                marginTop: 30
            }} resizeMode="cover" />
            <Text style={styles.heading}>Ready to Start?</Text>
            <Text style={styles.subHeading}>Sign in or create an account to unlock all {"\n"}
                features!</Text>
            <Image source={imageIndex.Frame} style={{
                height: 10,
                width: 45,
                marginTop: 40
            }} resizeMode="contain" />
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={'Sign Up'}
                    onPress={() => navigation.replace(ScreenNameEnum.SignUpScreen)}
                    buttonStyle={{ marginHorizontal: 20, width: "40%" }}
                />
                <CustomButton
                    title={'Sign In'}
                    onPress={() => navigation.replace(ScreenNameEnum.LoginScreen)}
                    textStyle={{ color: "rgba(251, 91, 43, 1)" }}
                    buttonStyle={{ marginHorizontal: 20, width: "40%", backgroundColor: "white", borderWidth: 1, borderColor: "rgba(251, 91, 43, 1)" }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logoContainer: {
        marginBottom: 70,
        alignItems: 'center',
    },
    logo: {
        height: 70,
        width: 70,
    },

    logoText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 33,
        lineHeight: 28
    },
    subHeading: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        lineHeight: 21,
        textAlign: "center"
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
        position: 'absolute',
        bottom: 18,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 24
    },
});

export default ReadyScreen;
