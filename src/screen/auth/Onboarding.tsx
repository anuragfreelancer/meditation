import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../routes/screenName.enum';
import { hp, wp } from '../../utils/Constant';
import { color } from '../../constant';

const { width, height } = Dimensions.get('window');

interface Slide {
    id: string;
    title: string;
    title2: string;
    description: string;
}

const slides: Slide[] = [
    {
        id: '1',
        title: 'Welcome to ',
        title2:"Omnist App",
        description: 'ScrapApp connects people who need to get rid of scrap with scrappers who will pick it up for free.',
      
    },
    {
        id: '2',
        title: 'Welcome to ',
        title2:"Omnist App",
        description: 'Manage your scrap, schedule pickups, and track your requests seamlessly.',
       
    },
    {
        id: '3',
       title: 'Welcome to ',
        title2:"Omnist App",
        description: 'Recycle and dispose of scrap responsibly to help the environment.',
      
    },
];

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);

    const updateCurrentIndex = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const handleNextPress = () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        } else {
            navigation.replace('HomeScreen');  // Last slide pe Home ya Login pe navigate karna
        }
    };

    const renderSlide = ({ item }: { item: Slide }) => (
        <View style={styles.slide}>
            
             <Text style={styles.title}>{item.title}<Text style={[styles.title, {color:color.buttonColor}]}>{item.title2}</Text></Text>
            <Text style={styles.description}>Welcome! Please choose how you’d like to begin your journey.</Text>
        </View>
    );

    return (
          <ImageBackground source={imageIndex.welcomeBg} imageStyle={{opacity:1,}} style={styles.mainBg}>
            <View style={{flex:0.6}}></View>
            <View style={{flex:0.5, justifyContent:'flex-end' }}>
                <View style={{height:120}}>
                 <FlatList
                    data={slides}
                    horizontal
                    pagingEnabled
                    ref={flatListRef}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderSlide}
                    onScroll={updateCurrentIndex}
                    scrollEventThrottle={16}
                   
                />
                </View>
                <View style={{
                    // position: 'absolute',
                    // bottom: 180,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: wp(96),
                    marginBottom:50,
                    
                }}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
                {/* Next Button */}
                <CustomButton
                    title={'Sign In / Sign Up'}
                    onPress={() => navigation.replace(ScreenNameEnum.LoginScreen)}
                    // onPress={handleNextPress}
                    buttonStyle={{ marginHorizontal: 20, marginBottom: 20, borderRadius:25 }}
                />
                <CustomButton

                    title={'Continue as Guest'}
                    onPress={() => navigation.replace(ScreenNameEnum.ChooseRoleScreen)}
                    // onPress={handleNextPress}
                    textStyle={{color:color.buttonColor}}
                    buttonStyle={{ marginHorizontal: 20, marginBottom: 20, borderRadius:25, borderWidth:1, borderColor:color.buttonColor, backgroundColor:"#fff" }}
                />
                </View>
         </ImageBackground>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    mainBg: {
            width: wp(100),
            height: hp(100),
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#fff',
        },
    container: {
        // flex: 1,
        // backgroundColor: 'white',
    },
    slide: {
        width,
     
     },
    image: {
        width: "100%",
        height: 550,
          
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom:5
     },
    description: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
         paddingHorizontal: 16,
        lineHeight: 21,
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 80,
        backgroundColor: "red"
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 10,
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        width: 18,
        height: 8,
    },
    inactiveDot: {
        backgroundColor: 'gray',
        height: 8,
        width: 8,
    },
    skipButton: {
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 1,
    },
    skipText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
    },
});
