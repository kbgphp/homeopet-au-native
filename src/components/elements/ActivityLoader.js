import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';


export default ({ text, size = 40 }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <MaterialIndicator color={theme.colors.$pink} size={size} style={styles.loader} />
                {text && <Text style={styles.loaderText}>{text}</Text>}
            </View>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: theme.colors.$white
    },
    loader: {
        flexGrow: 0
    },
    loaderText: {
        fontFamily: theme.fonts.$sansReg,
        color: theme.colors.$pink,
        fontSize: theme.fonts.$sm,
        marginTop: 30
    }
});
