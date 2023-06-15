import React, { useCallback, useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './Main';
import { theme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { toastConfig } from "./config";
import { _REST } from './services';
import { StatusBar, } from 'react-native';
import { NetworkModal,NotificationModal } from './components/global';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) { }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme} >
          <SafeAreaProvider>
            <NavigationContainer onReady={onLayoutRootView}>
              <StatusBar animated={true} backgroundColor="#c9407734" barStyle={'dark-content'} />
              <Main />
              <Toast config={toastConfig} />
              <NetworkModal />
              <NotificationModal />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

