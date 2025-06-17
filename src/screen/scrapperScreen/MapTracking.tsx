import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, PanResponder } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import CustomButton from '../../compoent/CustomButton';
import imageIndex from '../../assets/imageIndex';
import { useNavigation, useRoute } from '@react-navigation/native';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
// import MapViewDirections from 'react-native-maps-directions';
import { DirectionKey, MapApiKey } from '../../redux/Api';
import CustomProgressBar from '../../compoent/ProgressBar';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const MapTracking = () => {
    const route = useRoute()
    const { item } = route.params
    console.log(item)
    const isLogins = useSelector((state: any) => state?.feature?.userGetData);
    const [speed, setSpeed] = useState(20); // Default speed
    const [progress, setProgress] = useState(0.5)
    const navigation = useNavigation()
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            const newX = Math.min(Math.max(gestureState.moveX - 20, 0), width - 80);
            const newSpeed = Math.round((newX / (width - 80)) * 100);
            setSpeed(newSpeed);
        },
    });
    const steps = [
        { completed: true },
        { completed: false },

    ];

    return (
        <View style={styles.container}>
            <StatusBarComponent />
            {/* <MapView
                style={styles.map}
                initialRegion={{
                    latitude: item?.lat ? parseFloat(item?.lat) : 22.7196,
                    longitude: item?.long? parseFloat(item?.long) : 75.8577,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={{ latitude:item?.lat ? parseFloat(item?.lat)  : 75.8577, longitude: item?.long? parseFloat(item?.long) : 73.1812 }}
                    title={"Scraper Location"}
                    description={"Current Position"}
                />

            </MapView> */}

            {/* Bottom Card */}
            <View style={styles.bottomCard}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                        <Image source={imageIndex.circle} style={{ height: 55, width: 55 }} />
                        <View style={{ flexDirection: "column", }}>
                            <Text style={styles.vehicleTitle}>{item?.title}</Text>
                            <Text style={styles.dateRange}>{item?.date_time}</Text>
                        </View>
                    </View>

                    <Image source={imageIndex.arrowright} style={{ height: 18, width: 18 }} />

                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 6,
                    marginBottom: 5,
                    width: '100%'
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center",
                        width: "100%",
                        alignSelf: 'center'
                    }}>
                        {/* Circle */}
                        <View style={[
                            {
                                width: 29,
                                height: 29,
                                borderRadius: 29,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                backgroundColor: '#FF5722',
                                borderColor: '#FF5722',
                                marginRight: -5
                                // step.completed ? {
                                //     backgroundColor: '#FF5722',
                                //     borderColor: '#FF5722',
                                // } : {
                                // backgroundColor: '#FFFFFF',
                                // borderColor: '#FF5722'
                            }
                        ]}>
                            <Image source={imageIndex.right} style={{ height: 13, width: 13 }} />

                        </View>
                        <CustomProgressBar progress={progress} />

                        <View style={[
                            {
                                width: 29,
                                height: 29,
                                borderRadius: 29,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                marginLeft: -5,
                                // step.completed ? {
                                //     backgroundColor: '#FF5722',
                                //     borderColor: '#FF5722',
                                // } : {
                                backgroundColor: '#FFFFFF',
                                borderColor: '#FF5722'
                            }
                        ]}>
                            {/* <Image source={imageIndex.right} style={{ height: 13, width: 13 }} /> */}

                        </View>

                        {/* Line between circles (but not after the last circle) */}
                        {/* {index < steps.length - 1 && (
                                <View style={[
                                    {
                                        width: 40,
                                        height: 1,
                                    },
                                    steps[index].completed && steps[index + 1].completed ? {
                                        backgroundColor: '#FF5722'
                                    } : {
                                        borderWidth: 1,
                                        borderColor: '#FF5722',
                                        borderStyle: 'dashed'
                                    }
                                ]} />
                            )} */}


                    </View>

                </View>

                {/* Location Row */}
                <View style={styles.locationRow}>
                    <Text style={[styles.locationText1, { color: "rgba(251, 91, 43, 1)" }]}>From</Text>
                    <Text style={[styles.locationText, { color: "rgba(251, 91, 43, 1)" }]}>To</Text>
                </View>
                <View style={styles.locationRow}>
                    <Text style={styles.locationText1}>{isLogins?.address}</Text>

                    <Text style={styles.locationText}>{item?.address}</Text>
                    {/* .split(',').slice(-3).join(',') */}
                    {/* <Text style={styles.locationText}>{item?.address.split(',')[2] || item?.address.split(',')[1] || item?.address.split(',')[0]}</Text> */}
                </View>
            </View>
            <CustomButton
                title={'End Tracking'}
                onPress={() => navigation.goBack()}
                buttonStyle={{
                    marginHorizontal: 20, borderRadius: 40,
                    bottom: 20
                }}
            />
            <TouchableOpacity style={{
                position: "absolute",
                left: 15,
                top: 18,
            }}
                onPress={() => {
                    setProgress(1)
                    navigation.goBack()
                }}
            >
                <Image source={imageIndex.backorange} style={{ marginTop: 25, height: 35, width: 35 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        flex: 1,
    },
    bottomCard: {
        position: 'absolute',
        bottom: 110,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,

    },
    vehicleTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 12,
        color: "rgba(53, 53, 53, 1)",
        marginTop: 5
    },
    dateRange: {
        fontSize: 12,
        color: 'rgba(171, 171, 171, 1)',
        marginVertical: 4,
        marginLeft: 12,

    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
        marginTop: 5
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        width: '40%',
        textAlign: 'right',
        marginRight: 15
    },
    locationText1: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        width: '40%',
        textAlign: 'left',
        marginLeft: 5,
        textAlignVertical:'top'
    },
    dottedLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'orange',
        marginHorizontal: 8,
    },
    speedLabel: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginBottom: 6,
    },
    sliderContainer: {
        width: '100%',
        height: 24,
        justifyContent: 'center',
        marginBottom: 4,
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 2,
    },
    sliderThumb: {
        width: 20,
        height: 20,
        backgroundColor: 'orange',
        borderRadius: 10,
        position: 'absolute',
        top: -8,
    },
    speedLabelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    speedLabelText: {
        fontSize: 12,
        color: 'gray',
    },
    endTrackingButton: {
        marginTop: 16,
        backgroundColor: 'orange',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    endTrackingButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
});

export default MapTracking;
