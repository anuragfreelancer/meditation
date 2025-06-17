import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import imageIndex from '../assets/imageIndex';
import { width } from '../utils/Constant';
import { color } from '../constant';

const iconMap = [
    {
        inactive: imageIndex.home,
        active: imageIndex.home,
        label: 'Home',
    },
    {
        inactive: imageIndex.meditation,
        active: imageIndex.meditation,
        label: 'Meditation',
    },
    {
        inactive: imageIndex.layer,
        active: imageIndex.layer,
        label: 'Journal',
    },
    {
        inactive: imageIndex.apple,
        active: imageIndex.apple,
        label: 'Nutrition',
    },
    {
        inactive: imageIndex.userSqr,
        active: imageIndex.userSqr,
        label: 'Training',
    },
];

const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const icon = isFocused ? iconMap[index].active : iconMap[index].inactive;
                    const label = iconMap[index].label;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={styles.tabButton}
                            activeOpacity={0.7}
                        >
                            <Image source={icon} style={styles.icon} resizeMode="contain" tintColor={isFocused? color.tomato:color.grey}/>
                            <Text style={[styles.tabLabel, isFocused && styles.focusedLabel]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        width: width ,
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderRadius: 40,
        // elevation: 4,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        paddingHorizontal: 8,
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    icon: {
        height: 24,
        width: 24,
        marginBottom: 4,
    },
    tabLabel: {
        fontSize: 11,
        color: '#888',
    },
    focusedLabel: {
        color: color.tomato, // Match active color from your screenshot
        fontWeight: 'bold',
    },
});

export default CustomTabBar;
