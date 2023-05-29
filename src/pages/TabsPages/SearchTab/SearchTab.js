import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavBar, ProductListItem, QuickSearch, Disclaimer } from "../../../components/global";
import { PinkHeaderWithSticker, ActivityLoader } from "../../../components/elements";
import { images } from "../../../constants";
import { getDimension } from '../../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { _REST } from '../../../services';
import { fetchProducts } from "../../../redux/slices/productsListSlice";
import Spinner from 'react-native-loading-spinner-overlay';

export default function SearchTab(props) {
    const theme = useTheme();
    const { window } = getDimension();
    const styles = makeStyles(theme, window);
    const dispatch = useDispatch();
    const SYMPTOMS = useSelector((state) => state.appData?.BIG_DATA?.search?.symptoms);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState('');

    const getProducts = async (symptom_id, index) => {
        setSelectedIndex(index); setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false); setSelectedIndex('');
        }, 3000);
        // dispatch(fetchProducts(symptom_id)).then((res) => {
        //     setIsProcessing(false); setSelectedIndex('');
        //     props.navigation.navigate('RecommendedProducts');
        // })
    };


    return (
        <>
            <NavBar props={props} />
            <QuickSearch props={props} />

            <ScrollView style={styles.scrollView} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                {isProcessing && <Spinner visible customIndicator={<ActivityLoader />} />}
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <PinkHeaderWithSticker text={'Select Common Symptoms'} />
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {SYMPTOMS && SYMPTOMS.length > 0 && SYMPTOMS.map((item, i) => (
                        <View key={i} style={[styles.boxStyle, (selectedIndex === i) ? styles.activeBox : '']} >
                            {(!!item?.icon && !!item?.value && !!item?.class) ?
                                <TouchableOpacity activeOpacity={.8} onPress={() => getProducts(item?.id, i)} style={[styles.gridText, (selectedIndex === i) ? styles.activeBox : '']}>
                                    <Text style={[styles.categoryName, (selectedIndex === i) ? styles.activeText : '']}>{item?.value}</Text>
                                    <Image style={[styles.bandageImg]} source={{ uri: item?.icon }} />
                                </TouchableOpacity>
                                : (!!item?.value && !item?.icon && !item?.class) ?
                                    <TouchableOpacity activeOpacity={.8} onPress={() => getProducts(item?.id, i)} style={[styles.gridImage, (selectedIndex === i) ? styles.activeBox : '']}>
                                       <Text style={[styles.categoryName, (selectedIndex === i) ? styles.activeText : '']}>{item?.value}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity activeOpacity={.8} onPress={() => getProducts(item?.id, i)} style={[styles.gridImage, (selectedIndex === i) ? styles.activeBox : '']}>
                                        <Image style={[styles.categoryImg]} source={{ uri: item?.icon }} />
                                    </TouchableOpacity>
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Disclaimer />
        </>
    );
}


const makeStyles = (theme, window) => StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: theme.colors.$white,
    },
    descText: {
        lineHeight: 18,
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontWeight: 400,
        fontFamily: theme.fonts.$sansReg,
    },

    boxStyle: {
        width: window.width / 3,
        marginBottom: 2,
        minHeight: 85,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.$white,
        paddingHorizontal: 1,
    },
    activeBox: {
        backgroundColor: theme.colors.$pink,
    },
    gridText: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        height: 85,
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.$light_gray,
        justifyContent: 'center',
        alignItems: 'center'
    },

    gridImage: {
        height: 85,
        width: '100%',
        backgroundColor: theme.colors.$light_gray,
        justifyContent: 'center',
        alignItems: 'center'
    },

    categoryName: {
        textAlign: 'center',
        fontSize: theme.fonts.$font_std,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },
    activeText: {
        color: theme.colors.$white,
    },
    bandageImg: {
        resizeMode: 'stretch',
        width: '100%',
        height: 85,
        position: 'absolute',
    },

    categoryImg: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    bottomRight: {
        right: 4,
        bottom: -4,
        transform: [{ rotate: '115deg' }]
    },
    topRight: {
        right: 4,
        bottom: -4,
        transform: [{ rotate: '327deg' }]
    },
    bottomLeft: {
        right: 4,
        bottom: -4,
        transform: [{ rotate: '327deg' }]
    },
    topLeft: {
        right: 4,
        bottom: -4,
        transform: [{ rotate: '115deg' }]
    }

});
