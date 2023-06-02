import * as React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { LogoTitle } from './components/elements';
import { WelcomeScreen, AppSettings, Notifications, WebInView } from "./pages/Public";
import { resetFirstTime } from './redux/slices/isFirstTimeSlice';
import { getAppData, resetAppData } from './redux/slices/appDataSlice';
import {setNotificationPermission} from './redux/slices/notificationSlice';
import Tabs from "./pages/Tabs";
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
const Stack = createNativeStackNavigator();

export default function Main(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isFirstTime = useSelector((state) => state.isFirstTime?.value);


  React.useEffect(() => {
    // dispatch(resetFirstTime());                          //reset firstTime (Test Purpose only)
    // dispatch(resetAppData());                            // reset appData (Test Purpose only)
    dispatch(getAppData()).then((res) => { });              // fetch App Data
  }, []);


  React.useEffect(() => {
    async function initializeNotification() {
      try {
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);  //native way
        }

        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('enabled: ', enabled);
          console.log('Authorization status:', authStatus);
            dispatch(setNotificationPermission(enabled)); 
          await messaging().registerDeviceForRemoteMessages();

          const token = await messaging().getToken();
          console.log('token: ', token);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    initializeNotification()
  }, [])

  React.useEffect(() => {

    // open state
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={isFirstTime ? "Welcome" : "Tabs"} screenOptions={{}}>
        <Stack.Group>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        </Stack.Group>
        <Stack.Group screenOptions={{
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            borderBottomColor: theme.colors.$white,
          },
          safeAreaInsets: { top: 0 },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerBackVisible: false
        }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AppSettings" component={AppSettings} />
          <Stack.Screen name="WebInView" component={WebInView} options={{ title: '' }} />
          <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


