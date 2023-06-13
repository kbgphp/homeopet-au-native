import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, FlatList,Platform } from 'react-native';
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


    const Header = () => (
        <View style={{ backgroundColor: theme.colors.$white }}>
            <View style={styles.catInfo}>
                <Text style={styles.catName}>{CAT_DATA?.cat_name}</Text>
                <Text style={styles.catDesc}>{CAT_DATA?.cat_info} </Text>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <BackTextButton props={props} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : null}
            >
                {isProcessing ?
                    <ActivityLoader /> :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={CAT_DATA?.products}
                        renderItem={({ item }) => <ProductListItem props={props} data={item}  />}
                        ListHeaderComponent={<Header />}
                        ListEmptyComponent={<NoDataFound text={'No data found'} />}
                        style={{ backgroundColor: theme.colors.$white }}
                    />
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
