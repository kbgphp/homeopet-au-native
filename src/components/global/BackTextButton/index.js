import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default ({ props }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.root}>
            <TouchableOpacity activeOpacity={.8} onPress={() => props.navigation.goBack()} style={styles.link}>
                <Text style={styles.text}>{"Back"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    root: {
        flexDirection: 'row',
        backgroundColor: theme.colors.$border,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    link: {
        paddingTop: 4,
        paddingBottom: 4,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg
    }
});
