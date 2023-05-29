import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { images } from "../../constants"
import { StyleSheet,Text,Image,View } from 'react-native';

export default ({ text }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.root}>
            <Text style={styles.pageHeader}>{text} </Text>
            <Image style={styles.bandage} source={images?.bandage} />
        </View>

    );
}


const makeStyles = (theme) => StyleSheet.create({
    root: {
        flex: 1,
        marginVertical: 8,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageHeader: {
        fontSize: 22,
        fontFamily: theme.fonts.$serifReg,
        color: theme.colors.$pink,

    },
    bandage: {
        width: 42,
        height: 38,
        resizeMode: 'contain',
    },
});
