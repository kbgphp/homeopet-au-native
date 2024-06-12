import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import messaging from '@react-native-firebase/messaging';
import {  useDispatch } from 'react-redux';
import { addNotificationCount } from '@src/redux/slices/notificationSlice';


export default ({ }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [DATA, setDATA] = React.useState(null);


    React.useEffect(() => {
        // open state
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // (remoteMessage.data.url) ? props.navigation.navigate(remoteMessage.data.url) : null;

            dispatch(addNotificationCount());
            setIsOpen(true);
            setDATA(remoteMessage)
        });

        return unsubscribe;
    }, []);

    return (
        <Modal
            hideModalContentWhileAnimating={true}
            isVisible={isOpen}
            onBackButtonPress={() => { setIsOpen(false) }}
            onBackdropPress={() => { setIsOpen(false) }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.header}>{DATA?.notification?.title}</Text>
                    <Text style={styles.message}>{DATA?.notification?.body}</Text>
                    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => { setIsOpen(false) }} >
                        <Text style={styles.actionBtnText}>{"Okay"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}



const makeStyles = (theme) => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        padding: 16,
        width: 320,
        // height: 300,
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

    header: {
        marginBottom: 12,
        color: theme.colors.$light_green,
        fontSize: theme.fonts.$font_std,
        fontFamily: theme.fonts.$sansBold,
    },
    message: {
        color: theme.colors.$text,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
    },
    button: {
        marginVertical: 8,
        justifyContent:'flex-end',
        alignItems: 'flex-end',
    },
    actionBtnText: {
        color: theme.colors.$primary,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansBold,
    }
});
