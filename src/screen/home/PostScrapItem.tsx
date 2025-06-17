import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    useNavigation,
} from '@react-navigation/native';
import TextInputField from '../../utils/TextInputField';
import Loading from '../../utils/Loader';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomButton from '../../compoent/CustomButton';
import CustomHeader from '../../compoent/CustomHeader';
import CustomDropdown from '../../compoent/CustomDropdown';
import ImagePicker from "react-native-image-crop-picker";
import ImagePickerModal from '../../compoent/ImagePickerModal';
import LocationPicker from '../../compoent/LocationPicker';
import CommonMapView from '../../compoent/CommonMapView';
import { MapApiKey } from '../../redux/Api';
import {  AddPostApi, Get_category } from '../../Api/apiRequest';
import { useSelector } from 'react-redux';
import { getAddressFromCoordinates, getCurrentLocation } from '../locationCurrent';
import { SafeAreaView } from 'react-native-safe-area-context';
 
export default function PostScrapItem() {
    const [ItemName, setItemName] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [Description, setDescription] = useState('');
    const [Category, setCategory] = useState('');
    const [CategoryData, setCategoryData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [locationModal, setLocationModal] = useState(false);
    const [image, setImage] = useState<any>("");
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setisLoading] = useState(false);
    const navigation = useNavigation()
    const [address, setAddress] = useState('');
    const [location, setlocation] = useState <any>('');
    const isLogin = useSelector((state: any) => state?.auth);
    useEffect(() => {
        fetchLocationAndAddress()
    }, [isLogin])
    // const fetchLocation = async () => {
    //      const location = await getCurrentLocation();
    //     if (location) {
    //          const address = await getAddressFromCoordinates(location.latitude, location.longitude);
    //         console.log("address",address)
    //         setAddress(address),
    //             setlocation(location,)
    //     }
    // };
    const fetchLocationAndAddress = async () => {
         try {
            const loc = await getCurrentLocation();
            setlocation(loc,)
            console.log(loc)
            if (loc) {
                 const addr = await getAddressFromCoordinates(loc.latitude, loc.longitude);
                 setAddress(addr);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch location or address');
        }
     };



    const handleLocationSelect = async (location: { latitude: number, longitude: number }) => {
        setSelectedLocation(location);
        console.log('selected locala')
        console.log(location)
        setlocation(location)
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}&key=${MapApiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK" && data.results.length > 0) {
                const formattedAddress = data.results[0].formatted_address;
                setAddress(formattedAddress);
            } else {
                setAddress('Address not found');
            }
        } catch (error) {
            setAddress('Error fetching address');
        }
    };
    const validateForm = () => {
        const newErrors: any = {};
        if (!Description.trim()) {
            newErrors.Description = 'Please enter a description.';
        }
        if (!Category) {
            newErrors.Category = 'Please select a category.';
        }
        // if (!address) {
        //     newErrors.adderror = 'Please select a location';
        // }
        if (!ItemName.trim()) {
            newErrors.ItemName = 'Please enter item name.';
        }
        if (!image) {
            newErrors.Image = 'Please upload an image.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;  // returns true if no errors
    };

    const pickImageFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            // cropping: true,
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
                // cropping: true,
            });
            setImage(image);
            setIsModalVisible(false)

        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    const handleSubmit = async () => {
console.log("Addd",address);
console.log("Location",location)
        if (validateForm()) {
            try {
                const params = {
                    itemName: ItemName,
                    image: image,
                    description: Description,
                    category: Category,
                    location: location,
                    navigation: navigation,
                    address: address,
                    id: isLogin?.userData?.id
                };
                console.log(params)
                 const response = await AddPostApi(params, setisLoading,);
            } catch (error) {
            }
        } else {
        }
    }
    useEffect(() => {
        get_states_list()
    }, [])
    const get_states_list = async () => {
        try {
            const state = await Get_category();
            if (state) {
                setCategoryData(state?.result)
            }
        } catch (error) {
        }
    };
    return (
        <SafeAreaView style={{
            backgroundColor: '#FFF',
            flex: 1,
        }}>
            <StatusBarComponent />
            <View style={{ flex: 1, marginHorizontal: 15 }}>
                {isLoading ? <Loading /> : null}
                <CustomHeader imageSource={imageIndex.backorange} label="Post Scrap Item" />
                <ScrollView showsVerticalScrollIndicator={false}  >
                    <View style={{ marginTop: 30, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsModalVisible(true)
                            }}
                            style={{ alignItems: "center", justifyContent: "center", height: 175, width: "100%", borderRadius: 20, backgroundColor: "rgba(247, 248, 248, 1)" }}>

                            {image ? (
                                <Image
                                    source={{ uri: image?.path }}
                                    style={{ height: 175, width: "100%", borderRadius: 20, }}
                                    resizeMode='cover'
                                />
                            ) : (
                                <>
                                    <Image
                                        source={imageIndex.upload}
                                        style={{ height: 34, width: 34 }}
                                        resizeMode="cover"
                                    />
                                    <Text
                                        style={{ marginTop: 10, color: "rgba(148, 148, 148, 1)", fontSize: 16, lineHeight: 18 }}
                                    >
                                        Upload Image
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                    {errors?.Image && <Text style={styles.redText}>{errors?.Image}</Text>}
                    <TextInputField
                        text={ItemName}
                        onChangeText={setItemName}
                        placeholder={'Item Name'}
                        img={imageIndex.lock}
                    />
                    {errors?.ItemName && <Text style={[styles.redText, { bottom: 6 }]}>{errors?.ItemName}</Text>}
                    <View style={{
                        height: 140,
                        paddingHorizontal: 10,
                        paddingTop: 4,
                        borderRadius: 15,
                        backgroundColor: 'rgba(247, 248, 248, 1)',
                    }}>
                        <TextInput
                            placeholderTextColor="#ADA4A5"
                            style={{
                                paddingHorizontal: 5,
                                textAlignVertical: 'top',  // For multiline to start text from top
                                color: 'black',
                                fontWeight: '500',
                                fontSize: 14,
                                marginTop: 6
                            }}
                            value={Description}
                            onChangeText={setDescription}
                            placeholder="Description"
                            multiline={true}
                        />
                    </View>
                    {errors?.Description && <Text style={styles.redText}>{errors?.Description}</Text>}
                    <TouchableOpacity
                        onPress={() => setLocationModal(true)}
                        style={styles.locationView}
                    >
                        <Text style={{
                            color:   "rgba(173, 164, 165, 1)",
                            // color: address ? "black" : "rgba(173, 164, 165, 1)",
                            fontWeight: '500',
                            fontSize: 13,
                            marginLeft: 6,
                            flex: 1
                        }}>
                            Selected Location
                            </Text>
                            <Image source={imageIndex?.downarrow} tintColor={"gray"} style={{ height: 17, width: 17, right: 5 }} />

                             {/* {address ? address : "Selected Location"}</Text>
                        {!address && (<Image source={imageIndex?.downarrow} tintColor={"gray"} style={{ height: 17, width: 17, right: 5 }} />
                        )} */}
                    </TouchableOpacity>
                    {errors.adderror && <Text style={styles.redText}>{errors.adderror}</Text>}

                    <View style={{ marginTop: 10, }}>
                        <CustomDropdown
                            data={CategoryData?.map((item: any) => ({
                                label: item?.category_name,
                                value: item?.id, // yahan 'id' ki jagah 'value' use kiya hai
                            }))}
                            onSelect={(item: any) => {
                                setCategory(item?.value);
                            }}
                            placeholder="Category"
                        />

                    </View>
                    
                    {errors?.Category && <Text style={styles.redText}>{errors?.Category}</Text>}
                    <CommonMapView
                        latitude={location.latitude||selectedLocation?.latitude}
                        longitude={location.longitude || selectedLocation?.longitude}
                        title="Delhi Marker"
                        description="This is Delhi Location"
                    />
                    {/* <CommonMapView
                        latitude={selectedLocation?.latitude}
                        longitude={selectedLocation?.longitude}
                        title="Delhi Marker"
                        description="This is Delhi Location"
                    /> */}
                    {/* <View style={{ marginTop: 10, marginBottom: 22 }}>
                        <CustomDropdown
                            data={AvailabilityData.map((item: any) => ({
                                label: item?.name,
                                value: item?.value, // yahan 'id' ki jagah 'value' use kiya hai
                            }))}
                            onSelect={(item: any) => {
                                setCategory(item?.label);
                            }}
                            placeholder="select Item Availability"
                        />
                        {errors?.Availability && <Text style={styles.redText}>{errors?.Availability}</Text>}

                    </View> */}

                    <CustomButton title='Submit' buttonStyle={{ marginBottom: 5, marginTop: 20 }} onPress={() => handleSubmit()} />
                </ScrollView>
                <ImagePickerModal
                    modalVisible={isModalVisible}
                    setModalVisible={setIsModalVisible}
                    pickImageFromGallery={pickImageFromGallery}
                    takePhotoFromCamera={takePhotoFromCamera}
                />
                <LocationPicker
                    apiKey={MapApiKey}
                    onSumit={() => {
                         if (address) {

                            setLocationModal(false);
                        } else {
                            Alert.alert("Location Required", "Please select a location before closing.");

                        }
                    }}
                    onClose={() => setLocationModal(false)}
                    visible={locationModal}
                    onLocationSelected={handleLocationSelect}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    redText: { color: 'red', marginTop: 4 },
    locationView: {
        height: 55,
        paddingHorizontal: 10,
        paddingTop: 4,
        marginTop: 10, borderRadius: 15,
        backgroundColor: 'rgba(247, 248, 248, 1)',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    }
});
