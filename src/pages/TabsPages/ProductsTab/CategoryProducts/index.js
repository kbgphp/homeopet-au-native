import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { BackTextButton, ProductListItem, QuickSearch } from "../../../../components/global"
import { _REST } from '../../../../services';
import { ActivityLoader, NoDataFound } from '../../../../components/elements';

export default function CategoryProducts(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const { categoryID } = props?.route?.params;
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [CAT_DATA, setCAT_DATA] = React.useState({});

    React.useEffect(() => {
        const getProductsByCatId = async () => {
            setIsProcessing(true);
            const res = await _REST.CUSTOM_POST("cat-products-list", { cat_id: categoryID, origin: "au" });
            setCAT_DATA(res?.data);
            setIsProcessing(false);
        }
        getProductsByCatId();
    }, []);


    return (
        <>
            <BackTextButton props={props} />
            {isProcessing ?
                <ActivityLoader /> :
                <ScrollView style={styles.scrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    <View style={{ backgroundColor: theme.colors.$white }}>
                        <View style={styles.catInfo}>
                            <Text style={styles.catName}>{CAT_DATA?.cat_name}</Text>
                            <Text style={styles.catDesc}>{CAT_DATA?.cat_info} </Text>
                        </View>

                        <View style={styles.recommendedMedicines}>
                            {CAT_DATA?.products && CAT_DATA?.products?.length > 0 ?
                                CAT_DATA?.products.map((item, i) => (
                                    <View key={i}>
                                        <ProductListItem props={props} data={item} />
                                    </View>
                                ))
                                :
                                <NoDataFound text={'No data found'} />
                            }
                        </View>
                    </View>
                </ScrollView>
            }
            <QuickSearch />
        </>

    );
}

const makeStyles = (theme) => StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: theme.colors.$white,

    },
    catInfo: {
        paddingHorizontal: 20,
    },
    catName: {
        textAlign: 'center',
        marginVertical: 12,
        color: theme.colors.$pink,
        fontSize: theme.fonts.$font_lg,
        fontFamily: theme.fonts.$serifReg,
    },
    catDesc: {
        color: theme.colors.$text,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
        marginBottom: 16,
        lineHeight: 18
    }
});
