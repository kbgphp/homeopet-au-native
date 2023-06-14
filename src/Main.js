import * as React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { LogoTitle } from './components/elements';
import { WelcomeScreen, AppSettings, Notifications, WebInView } from "./pages/Public";
import { getAppData } from './redux/slices/appDataSlice';
import { setNotificationPermission,addNotificationCount } from './redux/slices/notificationSlice';
import Tabs from "./pages/Tabs";


import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
const Stack = createNativeStackNavigator();

export default function Main() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isFirstTime = useSelector((state) => state.isFirstTime?.value);

  React.useEffect(() => {
    dispatch(getAppData());                     // fetch App Data
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
          dispatch(setNotificationPermission(enabled));
          // await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
          console.log('token: ', token);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    initializeNotification()
  }, [])



  // background state
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    dispatch(addNotificationCount());
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


