import React from 'react';
import { StyleSheet, Text, Image, View, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';


export default ({ props }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.container}>
            <View style={styles.innerBox}>
                <Text style={styles.header}>Don't miss a thing!</Text>
                <Text style={styles.desc}>Turn on notifications and we will keep you up-to-date on all the latest in natural pet care.</Text>
                <TouchableOpacity  activeOpacity={0.8} onPress={() => props.navigation.navigate('AppSettings')}>
                    <Text style={styles.link}>Enable Notifications</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: theme.colors.$white,
        paddingHorizontal:20
    },
    innerBox:{
        justifyContent:'center',
        alignItems: 'center',
    },
    header:{
        fontSize: theme.fonts.$font_xl,
        fontFamily: theme.fonts.$serifReg,
        color: theme.colors.$pink,
    },
    desc:{
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
        color: theme.colors.$text,
        textAlign: 'center',
        maxWidth: 250,
        marginVertical:18
    },
    link:{
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
        color: theme.colors.$pink,
        textAlign: 'center',
        textDecorationLine:'underline'
    }
})