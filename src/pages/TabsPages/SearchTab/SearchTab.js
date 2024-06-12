import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';

import { ActivityLoader, NoDataFound } from "@src/components/elements";
import { NavBar, QuickSearch, Disclaimer, ProductListItem } from "@src/components/global";
import { _REST } from '@src/services';
import { fetchProducts } from "@src/redux/slices/productsListSlice";
import SymptomsGrid from './components/SymptomsGrid';


export default function SearchTab(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const flatListRef = React.useRef(null);
    // const dispatch = useDispatch();
    const SYMPTOMS = useSelector((state) => state.appData?.BIG_DATA?.search?.symptoms);
    // const { PRODUCTS } = useSelector((state) => state?.recProducts);
    const [selectedIndex, setSelectedIndex] = React.useState('');

    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [PRODUCTS, setProducts] = React.useState([]);

    React.useEffect(() => {
        setProducts([]); setIsDataLoaded(false); setSelectedIndex('');
    }, [])

    const getProducts = async (symptom_id, index) => {
        setSelectedIndex(index); setIsProcessing(true); setIsDataLoaded(false); setProducts([]);
        // dispatch(fetchProducts(symptom_id)).then((res) => {
        //     setIsProcessing(false); setIsDataLoaded(true)
        // })
        const products = await _REST.CUSTOM_POST("symptom-products", { symptom_id, origin: "au" }).then((response) => response?.data?.medicines);
        setIsProcessing(false); setIsDataLoaded(true);

        if (products) {
            setProducts(products)
            setTimeout(() => { flatListRef?.current?.scrollToIndex({ animated: true, index: 0 }); }, 1000);
        }else{
            setTimeout(() => { flatListRef?.current?.scrollToOffset({ animated: true, offset: 250 }); }, 1000); 
        }
    };

    const Header = () => (
        <SymptomsGrid
            getProducts={getProducts}
            SYMPTOMS={SYMPTOMS}
            selectedIndex={selectedIndex}
            PRODUCTS={PRODUCTS}
            isDataLoaded={isDataLoaded}
        />
    )

    const NoData = () => (
        <View style={{ marginVertical: 90 }}>
            <NoDataFound text={'No formula found'} />
        </View>
    )


    return (
        <>
            <NavBar props={props} />
            <QuickSearch props={props} />
            {isProcessing && <Spinner visible customIndicator={<ActivityLoader />} />}
            <FlatList
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
                data={PRODUCTS}
                renderItem={({ item, index }) => <ProductListItem props={props} data={item} img={item?.featured_image} />}
                ListHeaderComponent={<Header />}
                ListEmptyComponent={isDataLoaded ? <NoData /> : null}
                style={{ backgroundColor: theme.colors.$white }}
            />
            <Disclaimer />
        </>
    );
}


const makeStyles = (theme) => StyleSheet.create({


});
