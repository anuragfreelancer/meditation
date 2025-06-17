import { useEffect, useRef, useState } from 'react';
// import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid } from 'react-native';

const useLiveLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const locationInterval = useRef<NodeJS.Timeout | null>(null);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        return (
          granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS
  };

  const startPollingLocation = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      console.warn('Location permission denied');
      return;
    }

    // Immediately get the first location
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     setCurrentLocation({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //   },
    //   (error) => console.error('Initial getCurrentPosition error:', error),
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    // );

    // Then start polling every 5 seconds
    locationInterval.current = setInterval(() => {
      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     const coords = {
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude,
      //     };
      //     setCurrentLocation(coords);
      //   },
      //   (error) => {
      //     console.error('Polling getCurrentPosition error:', error);
      //   },
      //   {
      //     enableHighAccuracy: true,
      //     timeout: 15000,
      //     maximumAge: 0,
      //   }
      // );
    }, 10000);
  };

  const stopPollingLocation = () => {
    if (locationInterval.current) {
      clearInterval(locationInterval.current);
      locationInterval.current = null;
    }
  };

  useEffect(() => {
    startPollingLocation();
    return () => stopPollingLocation(); // Cleanup on unmount
  }, []);

  return currentLocation;
};

export default useLiveLocation;
