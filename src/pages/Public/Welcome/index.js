import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { images } from "../../../constants"
import Swiper from 'react-native-web-swiper';
import { getDimension } from '../../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { appOpened } from '../../../redux/slices/isFirstTimeSlice';
import { getAppData } from '../../../redux/slices/appDataSlice';
import { ActivityLoader } from "../../../components/elements"

export default function WelcomeScreen(props) {
    const swiperRef = React.useRef(null);
    const dispatch = useDispatch();
    const theme = useTheme();
    const { window } = getDimension();
    const styles = makeStyles(theme, window);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const goTo = (num) => {
        swiperRef.current.goTo(num);
    }

    const { BIG_DATA } = useSelector((state) => state.appData);

    const goToHome = () => {
        if (BIG_DATA?.home) {
            dispatch(appOpened());                  // User Completed First Open
            props?.navigation?.replace('Tabs');
        } else {
            setIsProcessing(true);
            dispatch(getAppData()).then((res) => {
                if (res) {
                    dispatch(appOpened());                  // User Completed First Open
                    props?.navigation?.replace('Tabs');
                }
                setIsProcessing(false);
            });
        }
    }

    return (isProcessing ? <ActivityLoader /> :
        <View style={styles.swiperContainer}>
            <Swiper ref={swiperRef}
                style={styles.wrapper}
                controlsEnabled={true}
                controlsProps={{
                    dotsTouchable: true,
                    dotsPos: 'bottom',
                    prevPos: false,
                    nextPos: false,
                    dotsWrapperStyle: {
                        position: 'absolute',
                        bottom: (window.height * 17) / 100
                    },
                    dotActiveStyle: { backgroundColor: theme.colors.$pink, height: 12, width: 12, borderRadius: 10 }
                }}

            >
                <View style={styles.slide1}>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end' }} >
                        <Text style={styles.title}>Welcome to the</Text>
                        <Image style={styles.logo} source={images?.logoWithoutTag} />
                        <Text style={styles.title}>Training App</Text>

                    </View>

                    <View style={{ flex: 5, alignItems: 'center', }} >
                        <Image style={styles.centerLogo} source={images?.animalsLogo} />
                        <View>
                            <Text style={styles.headerText}>Natural healthcare</Text>
                            <Text style={styles.headerText}>for animals, large & small</Text>
                        </View>
                        <View style={{ marginTop: 24 }}>
                            <Text style={styles.bodyText}>Easy access to the product info needed to help </Text>
                            <Text style={styles.bodyText}>your customer make an informed decision.</Text>
                        </View>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }} >
                        <TouchableOpacity activeOpacity={0.8} onPress={() => goTo(1)} style={{ position: 'absolute', top: '22%' }}>
                            <Text style={[styles.bodyText, styles.nextText]}>{"Next"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.slide2}>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end' }} >
                        <Text style={styles.title}>Welcome to the</Text>
                        <Image style={styles.logo} source={images?.logoWithoutTag} />
                        <Text style={styles.title}>Training App</Text>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center', }} >
                        <Image style={styles.centerLogo} source={images?.animalsLogo} />
                        <View style={{ marginTop: 18 }}>
                            <Text style={styles.bodyText}>Our Box has all the Sales Information you need.</Text>
                            <Text style={styles.bodyText}>Symptom Checker at your fingertips (Literally!).</Text>
                        </View>
                    </View>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }} >
                        <TouchableOpacity activeOpacity={0.8} onPress={goToHome} style={styles.nextPage}>
                            <Image style={styles.pawImg} source={images?.pawPrint} />
                            <Text style={styles.pinkText}>{"Continue to App"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goTo(0)} style={styles.previousPage}>
                            <Text style={styles.bodyText}>{"Previous"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        </View>
    );
}



const makeStyles = (theme, window) => StyleSheet.create({
    swiperContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.$white
    },
    wrapper: {
        backgroundColor: theme.colors.$white,
    },
    slide1: {
        flex: 1,
    },
    title: {
        fontSize: theme.fonts.$font_md,
        fontFamily: theme.fonts.$angelina,
        color: theme.colors.$text,
        textAlign: 'center',
        letterSpacing: 2
    },
    logo: {
        width: 175,
        height: 32,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    centerLogo: {
        width: 290,
        height: 80,
        alignSelf: 'center',
        resizeMode: 'stretch',
        marginTop: 60,
        marginBottom: 24,
    },
    headerText: {
        fontSize: 22,
        textAlign: 'center',
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg
    },
    bodyText: {
        fontSize: 14,
        textAlign: 'center',
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pawImg: {
        width: 35,
        height: 35
    },
    nextPage: {
        position: 'absolute',
        top: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    previousPage: {
        top: -32,
    },
    pinkText: {
        minWidth: 125,
        color: theme.colors.$pink
    }

})
