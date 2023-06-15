import { useTheme } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';

export default ({ text }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.container}>
            <Text style={styles.noDataText}>{text}</Text>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.$white,
    },
    noDataText: {
        color: theme.colors.$pink,
        fontSize: theme.fonts.$font_std,
        fontFamily: theme.fonts.$sansReg,
    }
});
