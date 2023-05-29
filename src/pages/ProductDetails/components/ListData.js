import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default ({ data }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.root}>
            {!!data && data?.length > 0 ?
                (data.map((item, i) => (
                    <View key={i} style={styles.listItem}>
                        <View style={[styles.dotStyle]}></View>
                        <Text style={styles.bodyText}>{item?.value}</Text>
                    </View>
                )))
                : (
                    <View style={styles.listItem}>
                        <View style={[styles.dotStyle]}></View>
                        <Text style={styles.bodyText}>{" No data found "}</Text>
                    </View>
                )
            }
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    root: {
        paddingHorizontal: 20
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 1,
    },
    dotStyle: {
        height: 9,
        width: 9,
        marginEnd: 10,
        borderRadius: 50,
        backgroundColor: theme.colors.$text,
    },
    bodyText: {
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },
});
