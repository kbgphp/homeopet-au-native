import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-web-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function ProductImagesSlider(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const { imgIndex, productId } = props?.route?.params;

    React.useEffect(() => { props.navigation.setOptions({ headerShown: false, }) }, [])

    const PRODUCT = useSelector((state) => state?.productsArrObj?.productsDetailsArrObj?.[productId]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.$white }}>
            <TouchableOpacity activeOpacity={.8} onPress={() => props.navigation.goBack()} style={styles.closeBtn}>
                <Ionicons name={'close-outline'} color={'white'} style={styles.closeIcon} />
            </TouchableOpacity>

            <View style={styles.swiperContainer}>
                {PRODUCT?.product_gallery && PRODUCT?.product_gallery.length > 0 &&
                    <Swiper from={imgIndex}
                        controlsProps={{
                            dotsTouchable: true,
                            dotsPos: 'bottom',
                            prevPos: false,
                            nextPos: false,
                            dotActiveStyle: { backgroundColor: theme.colors.$pink, height: 12, width: 12, borderRadius: 10 }
                        }}
                    >
                        {PRODUCT?.product_gallery.map((item, i) => (
                            <Image key={i} style={styles.productImg} source={{ uri: item }} />
                        ))}
                    </Swiper>
                }
            </View>
        </View>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    swiperContainer: {
        padding: 20,
        flex: 1,
        width: '100%',
    },
    productImg: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },
    closeBtn: {
        right: '8%',
        top: '5%',
        position: 'absolute',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.$pink,
        borderRadius: 50,
        zIndex: 999
    },
    closeIcon: {
        fontSize: 40
    }


})
