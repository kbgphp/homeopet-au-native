import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { trimText } from "../../../utils";

export default ({ props, data, img = '' }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const viewProduct = (id) => {
        props.navigation.navigate('ProductDetails', { productId: id });
    }

    return (
        <View style={styles.productBox}>
            <TouchableOpacity onPress={() => viewProduct(data?.id)} activeOpacity={.8} style={styles.imageBox}>
                <Image style={styles.productImg} source={{ uri: img ? img : data?.image }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => viewProduct(data?.id)} activeOpacity={.8} style={styles.contentBox}>
                <View style={{}}>
                    <Text style={styles.productName}>{data?.title}</Text>
                    <Text style={styles.productDesc}>{trimText(140, data?.body_html)}</Text>
                    <TouchableOpacity activeOpacity={.8} onPress={() => viewProduct(data?.id)} style={{ marginTop: 12 }}>
                        <Text style={styles.viewProduct}>{"View product..."}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    productBox: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 200,
        paddingHorizontal: 12,
        borderColor: theme.colors.$border,
        borderBottomWidth: 1,
        backgroundColor: theme.colors.$white,
    },
    imageBox: {
        flex: 4,
        paddingVertical: 12,
        paddingHorizontal: 8,
        justifyContent: 'center',
        maxHeight: 200
    },
    contentBox: { flex: 7, padding: 12, justifyContent: 'flex-start' },
    productName: {
        marginBottom: 6,
        fontWeight: 400,
        color: theme.colors.$dark_green,
        fontSize: theme.fonts.$font_xl,
        fontFamily: theme.fonts.$sansReg,
    },
    productDesc: {
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
        lineHeight: 18,
    },
    productImg: {
        width: 'auto',
        resizeMode: 'contain',
        height: 175,
        transform: [{ scale: 1.6 }],
    },
    viewProduct: {
        fontWeight: 400,
        color: theme.colors.$green,
    },
});
