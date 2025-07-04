import 'react-native-gesture-handler';
import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ScreenNameEnum from '../routes/screenName.enum';
import _routes from '../routes/routes';
import DrawerNavgation from './DrawerNavgation';
const Stack = createNativeStackNavigator();



const RegistrationRoutes: FunctionComponent = () => {
  return (
    <Stack.Navigator
      // initialRouteName={ScreenNameEnum.SPLASH_SCREEN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',

      }}>
      {_routes.REGISTRATION_ROUTE.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
        />
      ))}
   
 
   <Stack.Screen name="DrawerNav" component={DrawerNavgation} />


    </Stack.Navigator>
  );
};

export default RegistrationRoutes;
