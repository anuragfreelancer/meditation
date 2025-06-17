import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoardScreen from '../screen/BottomTab/Home/DashBoardScreen';
import CustomDrawerContent from '../compoent/CustomDrawerContent ';
 
const Drawer = createDrawerNavigator();

export default function DrawerNavgation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '75%',
         },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="DashBoardScreen" component={DashBoardScreen} />
    </Drawer.Navigator>
  );
}
