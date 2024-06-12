import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default ({ data }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.root}>
            {!!data ? (

                <View style={{}}>
                    <Text style={styles.bodyText}>{data}</Text>
                </View>
            )
                : (
                    <View style={{}}>
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
    bodyText: {
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },
});