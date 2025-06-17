import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import CustomHeader from '../../compoent/CustomHeader';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import { useNavigation } from '@react-navigation/native';
import { ChangePass_Api } from '../../Api/apiRequest';
import Loading from '../../utils/Loader';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangePasswordScreen = () => {
    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(false)
    const isLogin = useSelector((state: any) => state?.auth);

    const [oldpass, setOldPass] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validatePasswords = () => {
        if (!oldpass) {
            setErrorMessage("Please enter your old password.");
        } else if (!password) {
            setErrorMessage("Please enter a new password.");
        } else if (password.length < 6) {
            setErrorMessage("New password must be at least 6 characters long.");
        } else if (!confirmPassword) {
            setErrorMessage("Please confirm your new password.");
        } else if (password !== confirmPassword) {
            setErrorMessage("New Password and Confirm Password do not match.");
        } else {
            setErrorMessage("");
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            // let data = {
            //     oldpassw: "1234567",
            //     password: "1234567",
            //     confirmPassword: "1234567"
            // }
            let data = {
                oldpassw: oldpass,
                password: password,
                confirmPassword: confirmPassword
            }

            console.log("data", data)
            ChangePass_Api(data, isLogin.userData.id, confirmPasswordVisible, setLoading)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading /> : null}

            <StatusBarComponent />
            <View style={{ marginHorizontal: 12, flex: 1 }}>
                <CustomHeader
                    imageProps={{
                        height: 22,
                        width: 22
                    }}
                    mainView={{
                        marginTop: 20
                    }}
                    imageSource={imageIndex.menu} label="Change Password" />
                <View style={{ marginTop: 35 }}>

                    <View style={styles.inputContainer}>
                        <Image source={imageIndex.lock} style={styles.image} />
                        <TextInput
                            placeholder="Old Password"
                            secureTextEntry={!oldPasswordVisible}
                            style={styles.input}
                            placeholderTextColor="#FB5B2B"
                            value={oldpass}
                            onChangeText={setOldPass}
                        />

<TouchableOpacity onPress={() => setOldPasswordVisible(!oldPasswordVisible)}>
                            <Image source={!oldPasswordVisible ? imageIndex.eye : imageIndex.visible} style={styles.image} />

                        </TouchableOpacity>

                    </View>
                    <View style={styles.inputContainer}>
                        <Image source={imageIndex.lock} style={styles.image} />

                        <TextInput
                            placeholder="New Password"
                            secureTextEntry={!passwordVisible}
                            placeholderTextColor="#FB5B2B"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />

                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Image source={!passwordVisible ? imageIndex.eye : imageIndex.visible} style={styles.image} />

                        </TouchableOpacity>
                    </View>

                    {/* New Password */}


                    {/* Confirm Password */}
                    <View style={styles.inputContainer}>
                        <Image source={imageIndex.lock} style={styles.image} />
                        <TextInput
                            placeholder="Confirm Password"
                            secureTextEntry={!confirmPasswordVisible}
                            placeholderTextColor="#FB5B2B"
                            style={styles.input}

                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Image source={!confirmPasswordVisible ? imageIndex.eye : imageIndex.visible} style={styles.image} />

                        </TouchableOpacity>
                    </View>
                </View>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
                    <CustomButton
                        title="Save"
                        onPress={() => validatePasswords()}
                        buttonStyle={{
                            alignSelf: 'center',
                            width: "100%"
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    errorText: {
        color: "red",
        marginBottom: 10,
        marginLeft: 5
    },

    image: { tintColor: "rgba(251, 91, 43, 1)", height: 22, width: 22 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F4',
        borderRadius: 40,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 50,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#FB5B2B',

    },

});

export default ChangePasswordScreen;
