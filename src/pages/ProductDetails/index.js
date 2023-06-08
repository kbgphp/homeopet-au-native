import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Image, Linking, View, ScrollView, KeyboardAvoidingView,Platform, TouchableOpacity } from 'react-native';
import { BackTextButton, ProductListItem, QuickSearch } from "../../components/global";


import { PinkButton, ActivityLoader } from "../../components/elements"
import SegmentSelector from "./components/SegmentSelector";
import ListData from "./components/ListData";
import ReviewList from "./components/ReviewList";
import { _REST } from '../../services';
import ProductImgDualSlider from './components/ProductImgDualSlider';
import { useSelector, useDispatch } from 'react-redux';


import { fetchProductDetails } from '../../redux/slices/productDetailsSlice';

export default function ProductDetails(props) {
    const { productId } = props?.route?.params;
    const theme = useTheme();
    const styles = makeStyles(theme);
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = React.useState('Symptoms');
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const PRODUCT = useSelector((state) => state?.productData?.data);
    const { isProcessing } = useSelector((state) => state?.productData);
    const { error } = useSelector((state) => state?.productData);

    React.useEffect(() => {
        const getData = async () => {
            if (!!productId) {
                dispatch(fetchProductDetails(productId)).then((res) => { setDataLoaded(true); })
                if (error) {
                    props.navigation.goBack();
                }
            }
        };
        getData();
    }, [])



    const goTo = async (type) => {
        await Linking.openURL(`https://homeopet.com.au/collections/all-products/${(type === 'Instore') ? '' : `?p=${productId}`}`);
    };


    const imageClicked = async (i) => {
        props.navigation.navigate('ProductImagesSlider', { imgIndex: i });
    }

    return (

        <View style={{ flex: 1 }}>
            <BackTextButton props={props} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 140}
            >
                {isProcessing ? <ActivityLoader /> : null}
                {(!isProcessing && dataLoaded) ?
                    <ScrollView style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    >
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 20 }}>
                            <Text style={styles.productName}>{PRODUCT?.title}</Text>
                            <Text style={styles.productDesc}>{PRODUCT?.body_html}</Text>
                        </View>

                        <ProductImgDualSlider props={props} product_gallery={PRODUCT?.product_gallery} imageClicked={imageClicked} />

                        <View style={{ flexDirection: 'row', paddingHorizontal: 14, marginTop: 12, marginBottom: 18 }}>
                            <PinkButton text={'Shop Online'} goTo={() => goTo('Online')} />
                            <PinkButton text={'Shop Instore'} goTo={() => goTo('Instore')} />
                        </View>

                        <SegmentSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                        <View style={{ marginTop: 12, marginBottom: 18 }}>
                            {selectedTab === 'Symptoms' && <ListData data={PRODUCT?.symptoms} />}
                            {selectedTab === 'Benefits' && <ListData data={PRODUCT?.benefits} />}
                            {selectedTab === 'Reviews' && <ReviewList data={PRODUCT?.review} />}
                        </View>
                    </ScrollView> : null
                }

                <QuickSearch props={props} />
            </KeyboardAvoidingView>
        </View>
    );
}



const makeStyles = (theme) => StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: theme.colors.$white,
    },
    productName: {
        fontSize: theme.fonts.$font_xxl,
        color: theme.colors.$green,
        fontFamily: theme.fonts.$sansReg,
        marginTop: 12,
        marginBottom: 4
    },

    productDesc: {
        lineHeight: 18,
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontWeight: 400,
        fontFamily: theme.fonts.$sansReg,
    },

});
