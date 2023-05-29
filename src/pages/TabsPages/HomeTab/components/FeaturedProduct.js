import * as React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { trimText } from "../../../../utils";
import { PinkHeaderWithBird } from "../../../../components/elements"



export default ({props,featuredProduct}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const viewProduct = (id) => {
        props.navigation.navigate('ProductDetails',{ productId: id});
    }
 
    
    return (
        <View style={styles.featuredProductBox}>
            <View style={{ alignItems: 'center' }} >
                <PinkHeaderWithBird text={'Featured Products'} />
            </View>
            <Image style={styles.featuredProductImg} source={{ uri: featuredProduct?.banner  }} />
            <Text style={styles.featuredText}>{trimText(140, featuredProduct?.single_product?.content)}
                <TouchableOpacity activeOpacity={.8} onPress={() => viewProduct(featuredProduct?.single_product?.id)}>
                    <Text style={styles.viewProduct}>{"view product"}</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    featuredProductBox: {
        flex: 1,
        borderColor: theme.colors.$border,
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    featuredProductImg: {
        width: 'auto',
        resizeMode: 'cover',
        height: 250,
        marginBottom: 8
    },
    featuredText: {
        marginHorizontal: 20,
        marginVertical: 18,
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
        lineHeight: 16,
    },
    viewProduct: {
        fontWeight: 600,
        color: theme.colors.$green,
    },
});
