import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View,  TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-web-swiper';
import { icons } from '@src/constants';

export default ({ props, product_gallery, imageClicked }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const swiperRef = React.useRef(null);
    const swiperRef2 = React.useRef(null);

    const previousSlide = async () => {
        let currentThumbIndex = swiperRef2.current.getActiveIndex();
        if (currentThumbIndex > 0)
            swiperRef2.current.goTo(currentThumbIndex - 1)
    }
    const nextSlide = async () => {
        let currentThumbIndex = swiperRef2.current.getActiveIndex();
        if (currentThumbIndex < (product_gallery?.length - 1))
            swiperRef2.current.goTo(currentThumbIndex + 1)
    }

    const goToSlide = async (index) => {
        swiperRef.current.goTo(index);
    };

    const zoomIconClicked = async () => {
        const index = swiperRef.current.getActiveIndex();
        imageClicked(index)
    };

    return (

        <View
            style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 6, height: 300, }} >
                <View style={styles.swiperContainer}>
                    {product_gallery?.length > 0 &&
                        <Swiper ref={swiperRef} controlsEnabled={false}>
                            {product_gallery?.length > 0 && product_gallery?.map((item, i) => (
                                <TouchableOpacity key={i} activeOpacity={.8} onPress={() => imageClicked(i)} style={{ flex: 1, padding: 12, justifyContent: 'center', width: '100%' }}>
                                    <Image style={styles.productImg} source={{ uri: item }} />
                                </TouchableOpacity>
                            ))}
                        </Swiper>
                    }
                </View>
                <TouchableOpacity activeOpacity={.8} onPress={() => zoomIconClicked()} style={styles.zoomIconPos}>
                    <Image source={icons.ZoomIcon} style={styles.zoomIcon} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3, height: 300, paddingTop: 60, }} >
                <View style={{ height: 175 }}>
                    <TouchableOpacity activeOpacity={.8} onPress={previousSlide} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name={'angle-up'} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <View style={[styles.swiperContainer,]}>
                        {product_gallery?.length > 0 &&
                            <Swiper
                                ref={swiperRef2}
                                vertical
                                controlsEnabled={false}
                                containerStyle={{}}
                                innerContainerStyle={{ height: 145, }}
                                swipeAreaStyle={{ height: 165 }}
                                slideWrapperStyle={{ height: 108, }}
                            >
                                {product_gallery?.length > 0 && product_gallery.map((item, i) => (
                                    <TouchableOpacity key={i} activeOpacity={.8} onPress={() => goToSlide(i)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={[styles.thumbImg, styles.border]} source={{ uri: item }} />
                                    </TouchableOpacity>
                                ))}
                            </Swiper>
                        }
                    </View>
                    <TouchableOpacity activeOpacity={.8} onPress={nextSlide} style={{ justifyContent: 'center', alignItems: 'center', bottom: -32 }}>
                        <FontAwesome name={'angle-down'} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    swiperContainer: {
        flex: 1,
        width: '100%',
    },
    productImg: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },

    thumbImg: {
        height: 99,
        width: 65,
        opacity: 0.9,
        resizeMode: 'contain',
    },
    zoomIconPos:{
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 0,
        right: 10,
        zIndex: 999,
    },
    zoomIcon: {
        width: 50,
        height: 50,
        resizeMode:'contain',
    },
    border: {
        borderWidth: 1,
        borderColor: theme.colors.$border,
        borderRadius: 4
    },

    arrowIcon: {
        color: theme.colors.$light_green,
        fontSize: 2 * theme.fonts.$font_std,
    },
});
