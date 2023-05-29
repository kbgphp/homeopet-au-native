import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text,  Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";


export default ({
    storeRatingModalOpen,
    contactSupportModalOpen,
    setStoreRatingModalOpen,
    setContactSupportModalOpen
}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={[styles.centeredView, { opacity: 0.1 }]}>
            <Modal
                hideModalContentWhileAnimating={true}
                isVisible={storeRatingModalOpen}
                onBackButtonPress={() => { setStoreRatingModalOpen(!storeRatingModalOpen) }}
                onBackdropPress={() => { setStoreRatingModalOpen(!storeRatingModalOpen) }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleText}>Thanks! Want to share your opinion on the app store?</Text>
                        <Text style={styles.bodyText}>Please take a moment to rate HomeoPet Med Ed on the {Platform.OS === 'android' ? 'Google Play' : 'Apple App'} store.</Text>

                        <View style={styles.btnGroup}>
                            <TouchableOpacity activeOpacity={0.8} style={[styles.button, { marginEnd: 18 }]} onPress={() => { setStoreRatingModalOpen(!storeRatingModalOpen) }} >
                                <Text style={styles.actionBtnText}>{"Close"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.button} >
                                <Text style={styles.actionBtnText}>{"Contact"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                hideModalContentWhileAnimating={true}
                isVisible={contactSupportModalOpen}
                onBackButtonPress={() => { setContactSupportModalOpen(!contactSupportModalOpen) }}
                onBackdropPress={() => { setContactSupportModalOpen(!contactSupportModalOpen) }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleText}>Tell us how to improve</Text>
                        <Text style={styles.bodyText}>Thanks for feedback. If you want to
                            report a problem or tell us how to
                            improve we would love to hear from you.</Text>

                        <View style={styles.btnGroup}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => { setContactSupportModalOpen(!contactSupportModalOpen) }}>
                                <Text style={styles.actionBtnText}>{"Close"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.button} >
                                <Text style={styles.actionBtnText}>{"Contact"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}




const makeStyles = (theme) => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalView: {
        margin: 8,
        padding: 16,
        width: 280,
        height: 144,
        borderRadius: 6,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titleText: {
        color: theme.colors.$text,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansBold,
        marginBottom: 12,
    },
    bodyText: {
        color: theme.colors.$text,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingEnd: 12,
        marginTop: 12
    },
    button: {
        marginHorizontal: 8,
    },
    actionBtnText: {
        color: theme.colors.$primary,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansBold,
    }


});
