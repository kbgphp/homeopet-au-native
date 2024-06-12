import React, { useEffect } from "react";
import { BackIconButton } from "@src/components/global"
import { WebView } from 'react-native-webview';
import { useTheme } from 'react-native-paper';


export default function WebInView(props) {
    const theme = useTheme();
    useEffect(() => { props.navigation.setOptions({
         headerLeft: () => <BackIconButton props={props} />, 
         headerTitle: () => null,
         title: props?.route?.params?.title,
         headerStyle: {
            borderBottomColor: theme.colors.$gray,
          },
          headerTitleStyle:{
            color:theme.colors.$pink,
          },
          headerShadowVisible: true,
          headerTitleAlign: 'center',
        }) }, [])

    return (
        <WebView
            source={{ uri: props?.route?.params?.url }}
        />
    );
}
