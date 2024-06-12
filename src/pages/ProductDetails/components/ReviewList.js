import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';

export default ({ data }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.root}>
            {!!data && data?.length > 0 ?
                (data.map((item, i) => (
                    <View key={i} style={[styles.listItem, (i !== data?.length - 1) ? styles.bottomBorder : '', i % 2 !== 0 && styles.oddItem, { paddingTop: (i !== 0) ? 6 : 2 }]}>
                        <Text style={styles.bodyText}>"{item?.body}"</Text>
                        <Text style={styles.author}>{item?.author} - <Text style={styles.date}>{format(new Date(item?.review_date), "MMMM do, yyyy")}</Text></Text>
                    </View>
                )))
                : (
                    <View style={[styles.listItem, { flexDirection: 'row', alignItems: 'center', }]}>
                        <View style={[styles.dotStyle]}></View>
                        <Text style={styles.bodyText}>{" There are no reviews yet."}</Text>
                    </View>
                )
            }
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    root: {},
    listItem: {
        paddingVertical: 1,
        paddingHorizontal: 20,
        paddingBottom: 4,
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid',
    },

    bodyText: {
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },
    author: {
        paddingTop: 8,
        paddingBottom: 4,
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansBold,
        fontStyle: 'italic',
    },
    date: {
        fontFamily: theme.fonts.$sansReg,
        fontStyle: 'italic',
    },
    dotStyle: {
        height: 9,
        width: 9,
        marginEnd: 10,
        borderRadius: 50,
        backgroundColor: theme.colors.$text,
    },
    oddItem: {
        backgroundColor: theme.colors.$light,
      },
});
