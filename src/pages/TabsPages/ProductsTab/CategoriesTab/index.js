import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { NavBar, QuickSearch } from "../../../../components/global"
import { PinkHeaderWithBird } from "../../../../components/elements"
import { getDimension } from '../../../../utils';
import { useSelector } from 'react-redux';


export default function CategoriesTab(props, setIsNavbarPage) {
    const theme = useTheme();
    const { window } = getDimension();
    const styles = makeStyles(theme, window);
    const CATEGORIES = useSelector((state) => state.appData?.BIG_DATA?.categories);

    const selectCategory = (catId) => {
        props?.navigation?.navigate('CategoryProducts', { categoryID: catId });
    }

    return (
        <View style={{ flex: 1 }}>
            <NavBar props={props} setIsNavbarPage={setIsNavbarPage} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={70}
            >
                <ScrollView style={styles.scrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}>
                    <View style={{ backgroundColor: 'white' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View>
                                <PinkHeaderWithBird text={'Categories'} />
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 8 }}>
                                <Text style={styles.descText}>Choose the category.</Text>
                                <Text style={[styles.descText, { marginTop: 6 }]}>The app will show you the possibilities</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 24 }}>
                        {CATEGORIES && CATEGORIES?.length > 0 && CATEGORIES?.map((item, i) => (
                            <View key={i} style={styles.boxStyle} >
                                <TouchableOpacity activeOpacity={.8} onPress={() => selectCategory(item?.id)} style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={styles.categoryImg} source={{ uri: item?.image }} />
                                    <Text style={styles.categoryName}>{item?.title}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <QuickSearch props={props} />
            </KeyboardAvoidingView>
        </View>
    );
}

const makeStyles = (theme, window) => StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    descText: {
        lineHeight: 18,
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontWeight: 400,
        fontFamily: theme.fonts.$sansReg,
    },

    boxStyle: {
        height: 160,
        width: window.width / 3,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryImg: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    categoryName: {
        textAlign: 'center',
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$pink,
        fontFamily: theme.fonts.$sansReg,
        maxWidth: 100
    },

});
