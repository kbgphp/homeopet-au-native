import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default ({ text, goTo}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={goTo} >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    button: {
        backgroundColor: theme.colors.$pink,
        marginVertical: 6,
        marginHorizontal:6,
        minWidth: 100,
        maxWidth: 100,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 2
    },
    text: {
        textAlign: 'center',
        color:theme.colors.$white,
        fontSize: theme.fonts.$font_sm,
        paddingVertical: 10,
        fontFamily: theme.fonts.$sansBold,
    },
});
