import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

import { useTheme } from 'react-native-paper';


export default function BlogDetails(props) {

    const theme = useTheme();
    const styles = makeStyles(theme);


    return (
        <View>
            <Text style={styles.bodyText}>{"Blog Details"}</Text>
        </View>
    );
}



const makeStyles = (theme) => StyleSheet.create({
   
    bodyText: {
        fontSize: 14,
        textAlign: 'center',
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg
    },

   

})
