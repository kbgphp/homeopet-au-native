import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { NavBar, ProductListItem } from "../../../components/global"
import { PinkHeaderWithBird } from "../../../components/elements"
import Vimeo from "./components/Vimeo";
import FeaturedProduct from "./components/FeaturedProduct";
import Container3DBox from "./components/Container3DBox"
import { useSelector, useDispatch } from 'react-redux';
import { getAppData } from '../../../redux/slices/appDataSlice';

export default function HomeTab(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const dispatch = useDispatch();
    const BIG_DATA = useSelector((state) => state.appData?.BIG_DATA);
    const PRODUCTS = useSelector((state) => state.appData?.BIG_DATA?.home?.featured_product?.products);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getAppData()).then((res) => { setRefreshing(false) });
    }, []);

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
