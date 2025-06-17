import { StyleSheet } from "react-native";
import { color } from "../../../constant";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    greeting: {
        fontSize: 14,
        color: color.text,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.text,
    },
    settingIcon: {
        width: 40,
        height: 40,
    },
    streakCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginVertical: 20,
        alignItems: 'center',
        elevation:1
    },
    fireIcon: {
        width: 60,
        height: 60,
        marginHorizontal:20
    },
    streakTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    streakSubText: {
        textAlign: 'left',
        color: color.gray,
        fontSize: 13,
        marginBottom: 10,
        width:'90%'
    },
    daysRow: {
        flexDirection: 'row',
        // justifyContent: 'center',
        gap: 8,
    },
    dayCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#7B6F72',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayActive: {
        backgroundColor: color.primary,
    },
    dayText: {
        color: '#fff',
        fontSize: 13,
    },
    dayTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: color.text,
    },
    card: {
        flexDirection: 'row',
        // backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    cardImg: {
        width: 110,
        height: 95,
        borderRadius: 10,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: color.text,
    },
    cardDesc: {
        fontSize: 13,
        color: color.gray,
        marginVertical: 5,
    },
    cardTime: {
        fontSize: 12,
        color: color.primary,
    },
    viewMore: {
        color: color.primary,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    promptCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 1,
    },
    promptText: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: color.text,
        textAlign:'center'
    },
    writeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical:5
    },
    writeInput: {
        flex: 1,
        height: 40,
    },
    sendIcon: {
        width: 20,
        height: 20,
        tintColor: color.primary,
    },
    fastingCard: {
        flexDirection: 'row',
        // backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        paddingVertical:20,
        alignItems: 'center',
    },
    fastingIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    fastingIcon1: {
        width: 15,
        height: 15,
        marginRight: 10,
    },
    fastingTitle: {
        fontWeight: 'bold',
        color: color.text,
    },
    fastingStatus: {
        color: color.gray,
        fontSize: 12,
    },
});
