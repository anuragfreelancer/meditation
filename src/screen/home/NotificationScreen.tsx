import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import EmptyListComponent from '../../compoent/EmptyListComponent';
import { Get_Notification_Api, } from '../../Api/apiRequest';
import Loading from '../../utils/Loader';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationsData = [
    {
        id: '1',
        title: 'Scrapper Accepted Your Item!',
        description: 'A scrapper is on the way to pick up your item.',
        time: '07:56 PM',
    },
    {
        id: '2',
        title: 'Your Item Was Marked as Taken',
        description: 'Your scrap listing has been successfully picked up.',
        time: '07:56 PM',
    },
    {
        id: '3',
        title: 'Subscription Renewal Reminder',
        description: 'Your subscription expires in 3 days. Renew now to continue pickups.',
        time: '07:56 PM',
    },
];

const NotificationScreen = () => {

    const [notificationsData, setNotificationsData] = useState(NotificationsData)
    const [loading, setLoading] = useState(false);
    const isLogin = useSelector((state: any) => state.auth);
    const get_Notfication_list = async () => {
        try {
            const state = await Get_Notification_Api(setLoading, isLogin?.userData?.id);
            setNotificationsData(state?.result)
        } catch (error) {
        }
    };
useEffect(()=>{
get_Notfication_list()
},[])

    const renderNotificationItem = ({ item }: any) => {
        return (
            <View style={styles.notificationItemContainer}>
                <View style={styles.iconContainer}>
                    <Image source={imageIndex.notifation} style={{ height: 50, width: 50 }}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.timeText}>A scrapper is on the way to pick up your item.</Text>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.descriptionText}>View Status</Text>
                        <Text style={styles.timeText}>{item.time}</Text>

                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            {loading ? <Loading /> : null}

            <CustomHeader
                imageSource={imageIndex.backorange} label="Notification" />
            <View style={{ marginHorizontal: 8 }}>
                {notificationsData.length >  0 && (
                                    <Text style={{ color: "black", fontWeight: "600", lineHeight: 27, marginTop: 20 }}>Today</Text>

                )}
                <View style={{ marginTop: 15 }}>

                    <FlatList
                        ListEmptyComponent={<EmptyListComponent message="No data found!" />}
                        showsVerticalScrollIndicator={false}
                        data={notificationsData}
                        renderItem={renderNotificationItem}

                        keyExtractor={(item: any) => item?.id}
                        contentContainerStyle={styles.listings}
                    />

                </View>
            </View>
        </SafeAreaView>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    listings: { paddingBottom: 11 },

    headerContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContent: {
        paddingVertical: 10
    },
    notificationItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#F9F9F9',
    },
    iconContainer: {

        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        marginLeft: 5
    },
    titleText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#000',
        marginTop: 6
    },
    descriptionText: {
        fontSize: 12,
        color: 'rgba(251, 91, 43, 1)',
        fontWeight: "600",
        lineHeight: 16,
        marginTop: 5
    },
    timeText: {
        fontSize: 12,
        color: 'rgba(168, 168, 168, 1)',
        fontWeight: "500",
        lineHeight: 16,
        marginTop: 5

    },
});
