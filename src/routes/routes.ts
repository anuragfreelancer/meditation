  import ChooseLocation from "../helper/ChooseLocation";
import ChooseRoleScreen from "../screen/auth/welcome";
import CreatePassword from "../screen/auth/CreateNewPassword";
import Login from "../screen/auth/Login";
import OtpScreen from "../screen/auth/OtpScreen";
import PasswordReset from "../screen/auth/PasswordReset";
import ReadyScreen from "../screen/auth/ReadyScreen";
import SignUp from "../screen/auth/SignUp";
import Splash from "../screen/auth/Splash";
import DashBoardDetail from "../screen/BottomTab/Home/AudioPlayer";
import GooglePlacesScree from "../screen/home/GooglePlacesScree";
 import NotificationScreen from "../screen/home/NotificationScreen";
 import PostScrapItem from "../screen/home/PostScrapItem";
import ChangePasswordScreen from "../screen/privay/ChangePassword";
import NotificationsSetting from "../screen/privay/NotificationsSetting";
import UserDetailsScreen from "../screen/privay/UserDetailsScreen";
import MapTracking from "../screen/scrapperScreen/MapTracking";
import TrackerMapScreen from "../screen/scrapperScreen/TrackerMapScreen";
  import ScreenNameEnum from "./screenName.enum";
import WelcomeScreen from "../screen/auth/welcome";
import OnboardingScreen from "../screen/auth/Onboarding";
import imageIndex from "../assets/imageIndex";
import DashBoardScreen from "../screen/BottomTab/Home/DashBoardScreen";
import Meditation from "../screen/BottomTab/Meditation/Meditation";
import Journal from "../screen/BottomTab/Journal/Journal";
import Nutrition from "../screen/BottomTab/Nutrition";
import Setting from "../screen/BottomTab/Setting";
import TabNavigator from "../navigators/TabNavigation";
import AudioPlayerScreen from "../screen/BottomTab/Home/AudioPlayer";
import TrainingScreen from "../screen/BottomTab/Training";
import MeditationDetail from "../screen/BottomTab/Meditation/MeditationDetail";
import UnlockFeaturesScreen from "../screen/BottomTab/Journal/UnlockFeaturesScreen";
import ChangeLanguage from "../screen/BottomTab/ChangeLanguage";
import About from "../screen/BottomTab/LegalPoliciesScreen";
import HelpSupportScreen from "../screen/BottomTab/HelpSupport";

const _routes:any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
    {
      name: ScreenNameEnum.Onboarding,
      Component: OnboardingScreen,
    },
  
    {
      name: ScreenNameEnum.SignUpScreen,
      Component: SignUp,
    },

    {
      name: ScreenNameEnum.LoginScreen,
      Component: Login,
    },
  
    {
      name: ScreenNameEnum.WelcomeScrren,
      Component: WelcomeScreen,
    },
 
    {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
    {
      name: ScreenNameEnum.CreatePassword,
      Component: CreatePassword,
    },
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },
    {
      name: ScreenNameEnum.Tab,
      Component:TabNavigator,
    },
    {
      name: ScreenNameEnum.AudioPlayer,
      Component:AudioPlayerScreen,
    },
    {
      name: ScreenNameEnum.MeditationDetail,
      Component:MeditationDetail,
    },
      {
      name: ScreenNameEnum.UnlockFeature,
      Component:UnlockFeaturesScreen,
    },
     {
      name: ScreenNameEnum.Settings,
      Component:Setting,
    },
    
    
 
  
 
    {
      name: ScreenNameEnum.language,
      Component:ChangeLanguage,
    },
 
   
    {
      name: ScreenNameEnum.LegalPoliciesScreen,
      Component:About,
    },
    {
      name: ScreenNameEnum.HelpSupportScreen,
      Component:HelpSupportScreen,
    },
    {
      name: ScreenNameEnum.NotificationsSetting,
      Component:NotificationsSetting,
    },
    {
      name: ScreenNameEnum.NotificationScreen,
      Component:NotificationScreen,
    },
    {
      name: ScreenNameEnum.ChangePasswordScreen,
      Component:ChangePasswordScreen,
    },
   
    {
      name: ScreenNameEnum.TrackerMapScreen,
      Component:TrackerMapScreen,
    },
   
    {
      name: ScreenNameEnum.MapTracking,
      Component:MapTracking,
    },
    {
      name: ScreenNameEnum.GooglePlacesScree,
      Component:GooglePlacesScree,
    },
       {
      name: ScreenNameEnum.UserDetailsScreen,
      Component:UserDetailsScreen,
    },
       {
      name:'chooseLocation',
      Component:ChooseLocation,
    },

   
 
  ],
  BOTTOMTAB_ROUTE: [
      {
        name: ScreenNameEnum.DashBoardScreen,
        Component: DashBoardScreen,
        label: "Home",
        logo: imageIndex.home,
        logo1: imageIndex.home,
      },
      {
        name: ScreenNameEnum.Meditation,
        Component: Meditation,
        label: "Meditation",
        logo: imageIndex.meditation,
        logo1: imageIndex.meditation,
      },
      {
        name: ScreenNameEnum.Journal,
        Component: Journal,
        label: "Journal",
        logo: imageIndex.layer,
        logo1: imageIndex.layer,
      },
     
      {
        name: ScreenNameEnum.Nutrition,
        Component: Nutrition,
        label: "Nutrition",
        logo: imageIndex.apple,
        logo1: imageIndex.apple,
      },
      {
        name: ScreenNameEnum.training,
        Component: TrainingScreen,
        label: "Training",
        logo: imageIndex.userSqr,
        logo1: imageIndex.userSqr,
      },


    ],
 
};

export default _routes;
