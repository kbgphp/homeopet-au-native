import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, View, Text, Image } from 'react-native';


export default ({ image, day, month }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.imgContainer}>
            <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />
            <View style={styles.dateContainer}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.month}>{month}</Text>
            </View>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    imgContainer: {
        width: "100%",
        height: 200,
        position: 'relative'
    },
    dateContainer: {
        backgroundColor: theme.colors.$light_green,
        padding: 6,
        position: "absolute",
        top: 20,
        left: 0,
    },
    day: {
        color: theme.colors.$white,
        fontSize: theme.fonts.$font_std,
        fontWeight: 600,
        textAlign: "center",
        fontFamily: theme.fonts.$sansBold,
    },
    month: {
        fontSize: theme.fonts.$font_xs,
        textAlign: "center",
        color: theme.colors.$white,
        fontFamily: theme.fonts.$sansBold,
    },
});
