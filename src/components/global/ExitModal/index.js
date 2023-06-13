import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text, TouchableOpacity, BackHandler, StyleSheet } from 'react-native';
import Modal from "react-native-modal";


export default ({ }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const backAction = () => {
            setIsOpen(true);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction,);
        return () => backHandler.remove();
    }, []);


    const exitApp = () => {
        setIsOpen(false)
        setTimeout(() => {
            BackHandler.exitApp();
        }, 200);
    }


    return (
        <View style={[styles.centeredView, { opacity: 0.1 }]}>
            <Modal
                hideModalContentWhileAnimating={true}
                isVisible={isOpen}
                onBackButtonPress={() => { setIsOpen(!isOpen) }}
                onBackdropPress={() => { setIsOpen(!isOpen) }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleText}>Hold On!</Text>
                        <Text style={styles.bodyText}>Are you sure you want to exit?</Text>

                        <View style={styles.btnGroup}>
                            <TouchableOpacity activeOpacity={0.8} style={[styles.button, { marginEnd: 18 }]} onPress={() => setIsOpen(false)} >
                                <Text style={styles.actionBtnText}>{"No"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={exitApp} >
                                <Text style={styles.actionBtnText}>{"Exit"}</Text>
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalView: {
        margin: 8,
        padding: 16,
        width: 280,
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
