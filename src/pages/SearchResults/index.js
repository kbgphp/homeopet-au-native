import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { BackTextButton, ProductListItem, QuickSearch } from "../../components/global"
import { _REST } from '../../services';
import { ActivityLoader, NoDataFound } from '../../components/elements';

export default function SearchResults(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const { searchText } = props?.route?.params;
    const resultsPerPage = 10;
    const [pageNo, setPageNo] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [PRODUCTS, setPRODUCTS] = React.useState([]);

    React.useEffect(() => {
        const searchProducts = async () => {
            setIsProcessing(true);
            const res = await _REST.CUSTOM_POST("search", {
                search: searchText,
                record_per_page: resultsPerPage,
                paged: pageNo
            });
            if (res.data?.products) {
                setPRODUCTS([...PRODUCTS, ...res.data?.products]);
            }
            if (res?.data?.total_pages) {
                setTotalPages(res?.data?.total_pages)
            }
            setIsProcessing(false);
            setDataLoaded(true);
        }
        searchProducts();
    }, [pageNo, searchText]);


    React.useEffect(() => {
        setDataLoaded(false);
    }, [searchText]);

    const fetchMoreData = () => {
        if (!isProcessing && pageNo < totalPages) {
            setPageNo(pageNo + 1)
        }
    }


    const Header = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>Recommended {(PRODUCTS?.length > 1 ? 'Medicines' : 'Medicine')}</Text>
        </View>
    )

    const renderFooter = () => (
        <View style={styles.footer}>
            {isProcessing && <ActivityLoader size={30} text={'Loading more...'} />}
            {(totalPages === pageNo && !isProcessing) && <Text style={styles.footerText}>That's all</Text>}
        </View>
    )


    return (
        <>
            <BackTextButton props={props} />
            {isProcessing && !dataLoaded ?
                <ActivityLoader /> :

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={PRODUCTS}
                    renderItem={({ item }) => <ProductListItem props={props} data={item} />}
                    ListHeaderComponent={<Header />}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={<NoDataFound text={'No data found'} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={({ distanceFromEnd }) => {
                        if (distanceFromEnd === 0) return;
                        fetchMoreData()
                    }}
                    style={{ backgroundColor: theme.colors.$white }}

                />
            }
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
    footer: {
        paddingVertical: 8,
        backgroundColor: theme.colors.$white,
        alignItems: 'center'
    },
    footerText: {
        fontFamily: theme.fonts.$sansReg,
        color: theme.colors.$text,
        fontSize: theme.fonts.$xs,
    }
});
