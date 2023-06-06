import React, { useState, useEffect } from "react";
import { useTheme } from 'react-native-paper';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Platform, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CountryDropdown, LanguageDropdown, RangeSlider, ModalPopUp } from "./components"
import { CONFIG } from "../../../config";
import { Switch } from "../../../components/elements";
import { BackIconButton } from "../../../components/global"
import { useSelector, useDispatch } from 'react-redux';
import { setCompetitionSetting, setNewAndSeasonalProductSetting, setBlogSetting, } from '../../../redux/slices/notificationSlice';

export default function AppSetting(props) {
    useEffect(() => { props.navigation.setOptions({ headerLeft: () => <BackIconButton props={props} />, }) }, [])
    const theme = useTheme();
    const styles = makeStyles(theme);
    const dispatch = useDispatch();

    const [storeRatingModalOpen, setStoreRatingModalOpen] = useState(false);
    const [contactSupportModalOpen, setContactSupportModalOpen] = useState(false);
    const [sliderValue, setSliderValue] = useState(6);
    const APP_DATA = useSelector((state) => state.appData?.BIG_DATA?.home);
    const NOTIFICATION = useSelector((state) => state?.notification);

    const goTo = async (url, title) => {
        props?.navigation?.navigate('WebInView', { url: url, title: title });
    }

    const openContactPage = () => {
        props?.navigation?.navigate('ContactUs');
        setContactSupportModalOpen(false);
    }
    const rateAppOnStore = async () => {
        await Linking.openURL(Platform.OS === 'android' ? APP_DATA?.google_play_url : APP_DATA?.apple_store_url);
        setStoreRatingModalOpen(false);
    }

    const toggleCompetition = () => dispatch(setCompetitionSetting(!NOTIFICATION?.competitionNotificationOn));
    const toggleSeasonalAndNew = () => dispatch(setNewAndSeasonalProductSetting(!NOTIFICATION?.newProductNotificationOn));
    const toggleBlog = () => dispatch(setBlogSetting(!NOTIFICATION?.blogNotificationOn));

    const sliderValueChanged = ({ value }) => {
        value >= 8 ? setStoreRatingModalOpen(true) : setContactSupportModalOpen(true);
    }

    return (
        <>
            <ScrollView style={styles.scrollView}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
            >
                <View>
                    <View style={styles.header}>
                        <Text style={styles.pinkText}>{"Settings"}</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.button} >
                            <Text style={styles.pinkText}>{"Done"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.listItem, styles.bottomBorder]}>
                        <Text style={styles.bodyText}>{"Country"}</Text>
                        <CountryDropdown />
                    </View>
                    <View style={[styles.listItem, styles.bottomBorder]}>
                        <Text style={styles.bodyText}>{"Language"}</Text>
                        <LanguageDropdown />
                    </View>
                </View>

                <View>
                    <View style={styles.header}>
                        <Text style={styles.pinkText}>{"Notification Settings"}</Text>
                    </View>
                    <View style={[styles.listItem, styles.bottomBorder]}>
                        <Text style={styles.bodyText}>{"Competitions"}</Text>
                        <Switch value={NOTIFICATION?.competitionNotificationOn} disabled={false} toggleSwitch={toggleCompetition} />
                    </View>
                    <View style={[styles.listItem, styles.bottomBorder]}>
                        <Text style={styles.bodyText}>{"Seasonal & New Products"}</Text>
                        <Switch value={NOTIFICATION?.newProductNotificationOn} disabled={false} toggleSwitch={toggleSeasonalAndNew} />
                    </View>
                    <View style={[styles.listItem, styles.bottomBorder]}>
                        <Text style={styles.bodyText}>{"Latest from the HomeoPet Blog"}</Text>
                        <Switch value={NOTIFICATION?.blogNotificationOn} disabled={false} toggleSwitch={toggleBlog} />
                    </View>
                </View>

                <View>
                    <View style={styles.header}>
                        <Text style={styles.pinkText}>{"Legal"}</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => goTo(APP_DATA?.terms_conditions_url, 'Terms of Use')} style={[styles.bottomBorder, { paddingVertical: 8 }]} >
                        <View style={[styles.listItem,]}>
                            <Text style={styles.bodyText}>{"Terms of Use"}</Text>
                            <FontAwesome name={'angle-right'} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => goTo(APP_DATA?.privacy_policy_url, 'Data Protection & Privacy')} style={[styles.bottomBorder, { paddingVertical: 8 }]}>
                        <View style={[styles.listItem]}>
                            <Text style={styles.bodyText}>{"Data Protection & Privacy Statement"}</Text>
                            <FontAwesome name={'angle-right'} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.bottomBorder, { paddingBottom: 18 }]}>
                    <View style={styles.header}>
                        <Text style={styles.pinkText}>{"Feedback"}</Text>
                    </View>
                    <Text style={styles.feedbackTag}>Rate & Review Our App</Text>

                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={styles.rangeEndMarker}>0</Text>
                        </View>

                        <View style={{ flex: 10 }}>
                            < RangeSlider value={sliderValue} sliderValueChanged={sliderValueChanged} />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={styles.rangeEndMarker}>10</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation?.navigate('ContactUs')} style={[styles.bottomBorder, { paddingVertical: 8 }]} >
                        <View style={[styles.listItem]}>
                            <Text style={styles.bodyText}>{"Help & Support"}</Text>
                            <FontAwesome name={'angle-right'} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.versionText} >v{CONFIG?.VERSION}</Text>
                </View>

                < ModalPopUp
                    storeRatingModalOpen={storeRatingModalOpen}
                    contactSupportModalOpen={contactSupportModalOpen}
                    setStoreRatingModalOpen={setStoreRatingModalOpen}
                    setContactSupportModalOpen={setContactSupportModalOpen}
                    openContactPage={openContactPage}
                    rateAppOnStore={rateAppOnStore}
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
    header: {
        flexDirection: 'row',
        backgroundColor: theme.colors.$border,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 20
    },
    pinkText: {
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansBold,
        color: theme.colors.$pink
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid',
    },
    bodyText: {
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },
    arrowIcon: {
        color: theme.colors.$text,
        fontSize: theme.fonts.$font_std,
    },
    feedbackTag: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: theme.fonts.$font_xs,
        fontFamily: theme.fonts.$sansReg,
        color: theme.colors.$text,
    },
    rangeEndMarker: {
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansBold,
        color: theme.colors.$text,
    },
    versionText: {
        marginVertical: 18,
        textAlign: 'center',
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansBold,
    }

});


