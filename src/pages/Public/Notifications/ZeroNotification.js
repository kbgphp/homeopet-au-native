import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';


export default ({ }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.container}>
            <View style={styles.innerBox}>
                <Text style={styles.header}>You have no notifications.</Text>
                <Text style={styles.desc}>Check back here regularly to find new notifications.</Text>
            </View>
        </View>
    );
}
const makeStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.$white,
        paddingHorizontal: 20
    },
    innerBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: theme.fonts.$font_md,
        fontFamily: theme.fonts.$serifReg,
        color: theme.colors.$pink,
    },
    desc: {
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
        color: theme.colors.$text,
        textAlign: 'center',
        maxWidth: 250,
        marginVertical: 18
    },

})