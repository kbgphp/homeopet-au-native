import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { PinkHeaderWithSticker } from '@src/components/elements';
import { getDimension } from '@src/utils';

export default ({ SYMPTOMS, PRODUCTS, getProducts, selectedIndex, isDataLoaded }) => {
    const theme = useTheme();
    const { window } = getDimension();
    const styles = makeStyles(theme, window);


    return (
        <>
            <View style={{ backgroundColor: theme.colors.$white }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <PinkHeaderWithSticker text={'Select Common Symptoms'} />
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                {SYMPTOMS && SYMPTOMS.length > 0 && SYMPTOMS.map((item, i) => (
                    <View key={i} style={[styles.boxStyle, (selectedIndex === i) ? styles.activeBox : '']}>
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
            {isDataLoaded ?
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Recommended {(PRODUCTS?.length > 1 ? 'Formulas' : 'Formula')}</Text>
                    </View>
                </View> : null
            }

        </>
    );
}

const makeStyles = (theme, window) => StyleSheet.create({

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
    },
    header: {
        marginTop: 18,
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
