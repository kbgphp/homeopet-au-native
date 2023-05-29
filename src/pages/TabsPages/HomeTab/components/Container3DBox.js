
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View } from 'react-native';

export default ({web_rotate_3d_url}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container3DBox}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.boxHeader}>Our simple training starts with our box...</Text>
            </View>
            <WebView
                originWhitelist={['*']}
                source={{ uri:  web_rotate_3d_url}}
                style={{ height: 380, width: "100%" }}
            />
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container3DBox: {
        flex: 1,
        marginTop: 18,
    },
    boxHeader: {
        color: theme.colors.$light_green,
        fontSize: theme.fonts.$font_std,
        fontFamily: theme.fonts.$serifReg,
    },
});
