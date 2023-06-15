import { useTheme, Badge } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

export default ({ navigation }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const NOTIFICATION = useSelector((state) => state?.notification);
    return (
        <View style={{ flexDirection: 'row', paddingRight: 8 }}>
            <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('AppSettings')} style={styles.button}>
                <Icon name="gear" size={28} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('Notifications')} style={styles.button}>
                <Icon name="bell" size={28} style={[styles.icon, { position: 'relative' }]} />
                {NOTIFICATION?.newNotification ? <View style={styles.dot}></View> : null}
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
    dot: {
        backgroundColor: theme.colors.$pink,
        height: 13,
        width: 13,
        borderRadius: 50,
        position: 'absolute',
        top: 2,
        right: 5,
        borderColor: theme.colors.$white,
        borderWidth: 2
    }
})