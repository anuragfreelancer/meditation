import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import imageIndex from "../../assets/imageIndex";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import CustomHeader from "../../compoent/CustomHeader";
import TextInputField from "../../utils/TextInputField";
import CustomButton from "../../compoent/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import ImagePickerModal from "../../compoent/ImagePickerModal";
import { EditProfile_Api } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import { GetUserApi } from "../../redux/feature/getSliceUser";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserDetailsScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const isLogins = useSelector((state: any) => state?.feature?.userGetData);
  const isLogin = useSelector((state: any) => state?.auth);
  const [image, setImage] = useState<any>(null);
  const [liveImg, setLiveImg] = useState<any>(null)
   const dispatch = useDispatch();
  const navigation = useNavigation()
  useEffect(() => {
    setLoading(true)
    setFullName(isLogins?.user_name?.toString()),
      setEmail(isLogins?.email)
      setLiveImg(isLogins.image)
    setLoading(false)

  }, [])

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: false,
    })
      .then((image: any) => {
        setImage(image);
        setIsModalVisible(false)
      })
      .catch((error) => console.log(error));
  };
  const takePhotoFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        // cropping: false,
      });
      setImage(image);
      setIsModalVisible(false)

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      const params = {
        name: fullName,
        images: image,
        userId: isLogin?.userData?.id

      };
      const response = await EditProfile_Api(params, setLoading, navigation);
      dispatch(GetUserApi(isLogin?.userData?.id));
    } catch (error) {
    }
  }


  return (

    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    // >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBarComponent />
          {isLoading ? <LoadingModal /> : null}

          <CustomHeader
            mainView={{ marginTop: 15, marginHorizontal: 12 }}
            imageSource={imageIndex.backorange}
            label="Profile"
          />

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.profileContainer}>
                {image ? 
                  (
                  <Image
                    source={{ uri: image.path }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                ):
                liveImg?
                (
                  <Image
                    source={{ uri: liveImg }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                ) :
                 (
                  <Image
                    source={imageIndex.user}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                )
              }

                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() => setIsModalVisible(true)}
                >
                  <Image
                    source={imageIndex.edit}
                    style={{ height: 17, width: 17, tintColor: 'white' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 45 }}>
                <TextInputField
                  placeholder="Email"
                  firstLogo={true}
                  img={imageIndex.emai}
                  text={email}
                  onChangeText={setEmail}
                  editable={false}
                />
                <TextInputField
                  placeholder="Full Name"
                  firstLogo={true}
                  img={imageIndex.profile}
                  text={fullName}
                  onChangeText={setFullName}
                />
              </View>


            </View>

          </ScrollView>
          <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'flex-end', paddingBottom: 20, }}>

            <CustomButton
              title="Submit"
              onPress={handleSubmit}
              buttonStyle={{ marginTop: 45 }}
            />
          </View>
          <ImagePickerModal
            modalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            pickImageFromGallery={pickImageFromGallery}
            takePhotoFromCamera={takePhotoFromCamera}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginHorizontal: 15
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    // borderColor: "rgba(251, 91, 43, 1)",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(251, 91, 43, 1)",
    padding: 7,
    borderRadius: 15,
  },
  // input: {
  //   width: "90%",
  //   backgroundColor: "#fff",
  //   borderRadius: 10,
  //   padding: 10,
  //   marginTop: 15,
  // },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#FB5B2B',

  },
});

export default UserDetailsScreen;