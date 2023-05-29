import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { BackTextButton, ProductListItem, QuickSearch } from "../../components/global"
import { _REST } from '../../services';
import {  NoDataFound } from '../../components/elements';
import { useSelector, } from 'react-redux';

export default function RecommendedProducts(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const { PRODUCTS } = useSelector((state) => state?.recProducts);

    const Header = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>Recommended {(PRODUCTS?.length > 1 ? 'Medicines' : 'Medicine')}</Text>
        </View>
    )

    return (
        <>
            <BackTextButton props={props} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={PRODUCTS}
                renderItem={({ item }) => <ProductListItem props={props} data={item} img={item?.featured_image} />}
                ListHeaderComponent={<Header />}
                ListEmptyComponent={<NoDataFound text={'No data found'} />}
                style={{ backgroundColor: theme.colors.$white }}

            />
            <QuickSearch props={props} />
        </>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        backgroundColor: theme.colors.$white,
    },
    headerText: {
        textAlign: 'center',
        marginVertical: 12,
        color: theme.colors.$pink,
        fontSize: theme.fonts.$font_lg,
        fontFamily: theme.fonts.$serifReg,
    },
});
