
import { useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View,Image } from 'react-native';
import { icons } from '../../../../constants';

export default ({ web_rotate_3d_url }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.container3DBox}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.boxHeader}>Our simple training starts with our box...</Text>
            </View>

            <View style={{ position: 'relative' }}>
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: web_rotate_3d_url }}
                    style={{ height: 380, width: "100%" }}
                />
                <Image source={icons.Three60Deg} style={styles.three60} />
            </View>
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
    three60:{
        width: 35,
        height:60,
        resizeMode:'contain',
        position: 'absolute',
        bottom: 90,
        left: 20
    }
});
