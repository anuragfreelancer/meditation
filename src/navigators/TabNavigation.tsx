import React, { useEffect, useState } from "react";
import { Text, Image, Keyboard, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNameEnum from "../routes/screenName.enum";
import { color } from "../constant";
import { NavigationContainer } from "@react-navigation/native";
import _routes from "../routes/routes";
import CustomTabBar from "./customTabbar";

type TabScreen = {
    name: string;
    Component: React.ComponentType<any>;
    label?: string;
    logo: any;
    logo1: any;
};

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showEvent = Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
        const hideEvent = Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";

        const keyboardDidShowListener = Keyboard.addListener(showEvent, () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
            <Tab.Navigator
                // initialRouteName={ScreenNameEnum.DashBoardScreen}
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        display: isKeyboardVisible ? "none" : "flex",
                        paddingTop: 12,
                        height: 70,
                        backgroundColor: "black",
                        //   borderColor:color.background
                    },
                }}
            >

                {_routes.BOTTOMTAB_ROUTE.map((screen: TabScreen) => (
                    <Tab.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.Component}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <>
                                    <Image
                                        source={focused ? screen.logo1 : screen.logo}
                                        style={{
                                            width: 22,
                                            height: 22,
                                            resizeMode: "contain",
                                        }}
                                    />
                                    {/* {screen.label && (
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                color: focused ? "#008AC9" : "#8C8C8C",
                                                fontSize: 10,
                                                marginTop: 4,
                                                width: 55,
                                                textAlign: "center",
                                            }}
                                        >
                                            {screen.label}
                                        </Text>
                                    )} */}

                                    {screen.label && (
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                color: focused ? "#008AC9" : "#8C8C8C",
                                                fontSize: 10,
                                                marginTop: 4,
                                                width: 55,
                                                textAlign: "center",
                                            }}
                                        >
                                            {screen.label}
                                        </Text>
                                    )}
                                </>
                            ),
                        }}
                    />
                ))}
            </Tab.Navigator>
    );
}
