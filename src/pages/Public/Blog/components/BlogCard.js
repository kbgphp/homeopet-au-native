import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BlogImage } from '@src/components/elements';

export default function BlogCard({ props, data }) {

    const theme = useTheme();
    const styles = makeStyles(theme);
    const handleBlogDetails = (id) => {
        props?.navigation?.navigate("BlogDetails", { id });
    }

    return (
        <View style={styles.card}>
            <TouchableOpacity activeOpacity={.8} style={styles.box} onPress={() => handleBlogDetails(data?.id)}>
                <BlogImage image={data.src} day={data.dateFormate?.date} month={data.dateFormate?.month} />
                <View style={{ paddingHorizontal: 18, paddingVertical: 12 }}>
                    <Text style={styles.blogTitle}>{data.title} </Text>
                    <View style={styles.divider}></View>
                    <Text style={styles.blogShortDesc} numberOfLines={2}>{data.summary_html} </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    card: {
        paddingHorizontal: 20,
        backgroundColor: theme.colors.$white,
        paddingBottom: 18,
    },
    box: {
        borderWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid'
    },
    imgContainer: {
        width: "100%",
        height: 200,
        position: 'relative'
    },
    blogTitle: {
        fontSize: theme.fonts.$font_std,
        color: theme.colors.$pink,
        fontFamily: theme.fonts.$serifReg,
    },
    divider: {
        width: 40,
        height: 3,
        backgroundColor: theme.colors.$border,
        marginVertical: 8
    },
    blogShortDesc: {
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },

})
