import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";
async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "App needs access to your location",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}
const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return;
 
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log('Latitude:', latitude, 'Longitude:', longitude);
    },
    (error) => {
      console.error('Location error:', error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    }
  );
};