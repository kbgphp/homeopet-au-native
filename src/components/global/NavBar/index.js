import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default ({ props }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const pages = [
        { title: 'About', url: 'About' },
        { title: 'FAQs', url: 'FAQs' },
        { title: 'Testimonials', url: 'Testimonials', },
        { title: 'Blog', url: 'Blog' },
        { title: 'Contact', url: 'ContactUs' }
    ];

    const goTo = (page) => {
        props.navigation.navigate(page);
    }

    return (
        <View style={styles.container}>
            {pages.map((item, i) => (
                <TouchableOpacity key={i} activeOpacity={.8} onPress={() => goTo(item?.url)} style={styles.link}>
                    <Text style={[styles.text, (props?.route?.name === item?.url) ? styles.active : '']}>{item?.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.$white,
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderColor: theme.colors.$border,
    },
    link: {
        paddingTop: 4,
        paddingBottom: 4
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg
    },
    active:{
        color: theme.colors.$pink,
    }
});
