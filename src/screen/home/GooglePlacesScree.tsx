import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import { errorToast } from '../../utils/customToast';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

const GooglePlacesSearchMap = () => {
    const [places, setPlaces] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigation = useNavigation();
    const apiKey = 'AIzaSyDgFGS91BvviXh_f-nmvtEggUHJcaGyUwA';
    const fetchPlaces = async (input: string) => {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&language=en`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            console.log('Places API Result:', result);

            if (result?.predictions?.length) {
                setPlaces(result.predictions);
            } else {
                setPlaces([]);
            }
        } catch (error) {
            console.error('Error fetching places:', error);
            Alert.alert('Error', 'Failed to fetch places');
            setPlaces([]);
        }
    };

    const fetchPlaceDetails = async (placeId: string) => {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            console.log('Place Details Result:', result);

            if (result?.result?.geometry?.location) {
                const { lat, lng } = result.result.geometry.location;
                setSelectedLocation({ latitude: lat, longitude: lng });
            } else {
                Alert.alert('Error', 'Failed to fetch place details');
            }
        } catch (error) {
            console.error('Error fetching place details:', error);
            Alert.alert('Error', 'Failed to fetch place details');
        }
    };

    const handleSelectPlace = (place: any) => {
        setSearchText(place.description);  // Set selected place in input
        setPlaces([]);  // Clear suggestions
        fetchPlaceDetails(place.place_id);  // Fetch coordinates & show on map
    };
    const onSumitButt = () => {
        if (selectedLocation) {
            navigation.navigate(ScreenNameEnum.PostScrapItem,{
                AddLocation:selectedLocation
            })
        } else {
            errorToast("Please select the location");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {/* <MapView
                    style={styles.map}
                    region={{
                        latitude: selectedLocation?.latitude || 25.276987,  // Default to Dubai
                        longitude: selectedLocation?.longitude || 55.296249,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {selectedLocation && (
                        <Marker
                            coordinate={selectedLocation}
                            title="Selected Location"
                        />
                    )}
                </MapView> */}
                <View style={{ position: "absolute", top: 15, width: "100%" }}>
                    <View style={styles.searchBar}>
                        <Image source={imageIndex.search} style={{ height: 20, width: 20 }} resizeMode='cover' />
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 16,
                                color: "black",
                                marginLeft: 15
                            }}
                            placeholder="Search for a place"
                            value={searchText}
                            onChangeText={(text) => {
                                setSearchText(text);
                                fetchPlaces(text);
                            }}
                            placeholderTextColor="rgba(48, 45, 45, 1)"
                        />
                    </View>
                    {places.length > 0 && (
                        <View style={{ backgroundColor: "white", marginHorizontal: 20, borderRadius: 10 }}>
                            <FlatList
                                data={places}
                                keyExtractor={(item) => item.place_id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.suggestionItem}
                                        onPress={() => handleSelectPlace(item)}
                                    >
                                        <Text style={styles.suggestionText}>{item.description}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}

                </View>
            </View>
            <CustomButton title='Submit' buttonStyle={{ marginHorizontal: 20 }} onPress={onSumitButt} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 10,
        width: "100%",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    suggestionText: {
        fontSize: 16,
    },
    mapContainer: {
        flex: 1,
    },
    searchBar:
    {
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 15,
         borderColor: "gray",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 10,
        marginBottom: 20,
        height: 55,
        marginTop: 30,
        marginHorizontal: 20
    },
    searchInput: {
        flex: 1,
        padding: 15,
        fontSize: 14,
        color: "black",
        lineHeight: 24
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default GooglePlacesSearchMap;
