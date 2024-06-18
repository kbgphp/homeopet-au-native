import { PinkHeaderWithBird } from "@src/components/elements";
import { NavBar, ProductListItem } from "@src/components/global";
import { getAppData } from '@src/redux/slices/appDataSlice';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Linking, Platform, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Container3DBox from "./components/Container3DBox";
import FeaturedProduct from "./components/FeaturedProduct";
import Vimeo from "./components/Vimeo";
import { CONFIG } from "@src/config";
import ModalPopUp from "./components/ModalPopUp";

export default function HomeTab(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const dispatch = useDispatch();
    const BIG_DATA = useSelector((state) => state.appData?.BIG_DATA);
    const PRODUCTS = useSelector((state) => state.appData?.BIG_DATA?.home?.featured_product?.products);
    const [refreshing, setRefreshing] = React.useState(false);
    const [updateAppModalOpen, setUpdateAppModalOpen] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getAppData()).then((res) => { setRefreshing(false) });
    }, []);

    const updateThisApp = async () => {
        await Linking.openURL(Platform.OS === 'android' ? CONFIG.PLAY_STORE : BIG_DATA?.home?.apple_store_url);
        setUpdateAppModalOpen(false);
    }

    React.useEffect(() => {
        const checkForUpdate = async () => {
            if (Platform.OS === 'android') {
                if (Number(BIG_DATA?.home?.android_version) > CONFIG.ANDROID_VER) {
                    setUpdateAppModalOpen(true)
                }
            }else if(Platform.OS === 'ios'){
                if (Number(BIG_DATA?.home?.ios_version) > CONFIG.IOS_VER) {
                    setUpdateAppModalOpen(true)
                }
            }
        };
        checkForUpdate();
    }, [BIG_DATA])

    return (
        <>
            <NavBar props={props} />
            <ScrollView style={styles.scrollView}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                overScrollMode="never"
                removeClippedSubviews={true}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.$pink]} tintColor={theme.colors.$text} />}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <PinkHeaderWithBird text={'Our Training App'} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 8 }}>
                        <Text style={styles.descText}>Search for what you need to make sales. or</Text>
                        <Text style={styles.descText}>for Seasonal products to promote today.</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 18 }}>
                        <Text style={styles.descText}>At a glance - all the into you need is here.</Text>
                    </View>
                </View>
                <Container3DBox web_rotate_3d_url={BIG_DATA?.home?.web_rotate_3d_url} />
                <Vimeo videoId={BIG_DATA?.home?.video_link?.split("/").pop()} />
                <FeaturedProduct props={props} featuredProduct={BIG_DATA?.home?.featured_product} />
                {PRODUCTS?.length > 0 && PRODUCTS.map((item, i) => (
                    <View key={i}>
                        <ProductListItem props={props} data={item} />
                    </View>
                ))}
                < ModalPopUp
                    updateAppModalOpen={updateAppModalOpen}
                    updateThisApp={updateThisApp}
                />
            </ScrollView>
        </>
    );
}

const makeStyles = (theme) => StyleSheet.create({
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
});
