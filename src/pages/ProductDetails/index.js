import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Linking, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BackTextButton, QuickSearch } from "@src/components/global";
import { PinkButton, ActivityLoader } from "@src/components/elements"
import { SegmentSelector, Content, ReviewList, ProductImgDualSlider } from "./components"
import { _REST } from '@src/services';
import { fetchProduct } from '@src/redux/slices/productsDetailsArrObjSlice';
import { CONFIG } from '@src/config';

export default function ProductDetails(props) {
    const { productId } = props?.route?.params;
    const theme = useTheme();
    const styles = makeStyles(theme);
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = React.useState('Description');
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const { isProcessing } = useSelector((state) => state?.productsArrObj);
    const { error } = useSelector((state) => state?.productsArrObj);
    const PRODUCT = useSelector((state) => state?.productsArrObj?.productsDetailsArrObj?.[productId]);

    React.useEffect(() => {
        const getData = async () => {
            if (!!productId) {
                dispatch(fetchProduct(productId)).then((res) => { setDataLoaded(true); })
                if (error) {
                    props.navigation.goBack();
                }
            }
        };
        getData();
    }, [])


    const goTo = async (type) => {
        if (type === 'Instore')
            await Linking.openURL(CONFIG.IN_STORE_LINK);
        else
            await Linking.openURL(PRODUCT?.store_url);
    };


    const imageClicked = async (i) => {
        props.navigation.navigate('ProductImagesSlider', { imgIndex: i, productId: productId });
    }

    return (

        <View style={{ flex: 1 }}>
            <BackTextButton props={props} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : null}
            >
                {isProcessing ? <ActivityLoader /> : null}
                {(!isProcessing && dataLoaded) ?
                    <ScrollView style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    >
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 20 }}>
                            <Text style={styles.productName}>{PRODUCT?.title}</Text>
                            {/* <Text style={styles.productDesc}>{PRODUCT?.body_html}</Text> */}
                        </View>
                        <ProductImgDualSlider props={props} product_gallery={PRODUCT?.product_gallery} imageClicked={imageClicked} />
                        <View style={{ flexDirection: 'row', paddingHorizontal: 14, marginTop: 12, marginBottom: 18 }}>
                            <PinkButton text={'Shop Online'} goTo={() => goTo('Online')} />
                            <PinkButton text={'Shop Instore'} goTo={() => goTo('Instore')} />
                        </View>
                        <SegmentSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                        <View style={{ marginTop: 12, marginBottom: 18 }}>
                            {selectedTab === 'Description' && <Content data={PRODUCT?.body_html?.description?.description} />}
                            {selectedTab === 'Advice Care' && <Content data={PRODUCT?.body_html?.advice?.description} />}
                            {selectedTab === 'Ingredients' && <Content data={PRODUCT?.body_html?.ingredients?.description} />}
                            {/* {selectedTab === 'Benefits' && <ListData data={PRODUCT?.benefits} />} */}
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
        marginBottom: 4,
        textTransform: 'uppercase'
    },
    productDesc: {
        lineHeight: 18,
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontWeight: 400,
        fontFamily: theme.fonts.$sansReg,
    }
});
