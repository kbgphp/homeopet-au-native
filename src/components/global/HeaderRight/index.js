import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ navigation }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={{ flexDirection: 'row', paddingRight: 8 }}>
            <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('AppSettings')} style={styles.button}>
                <Icon name="gear" size={28} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('Notifications')} style={styles.button}>
                <Icon name="bell" size={28} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    button: {
        paddingStart: 4,
        paddingEnd: 4
    },
    icon: {
        color: theme.colors.$menu_icon,
    },
})