import * as React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { LogoTitle } from './components/elements';
import { WelcomeScreen, AppSettings, Notifications } from "./pages/Public";
import { resetFirstTime } from './redux/slices/isFirstTimeSlice';
import { getAppData, resetAppData } from './redux/slices/appDataSlice';

import Tabs from "./pages/Tabs";
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
        }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AppSettings" component={AppSettings} />
          <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


