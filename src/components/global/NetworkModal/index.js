import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from 'react-native-paper';
import { View, Text, Image, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { images } from '../../../constants';

export default ({ }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener(state => {
            setIsOpen(state.isConnected ? false : true)
        });
        return () => removeNetInfoSubscription();
    });

    return (
        <Modal hideModalContentWhileAnimating={true} isVisible={isOpen}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image style={styles.networkLogo} source={images.not_avl_img} />
                    <Text style={styles.header}>Network Error!</Text>
                    <Text style={styles.message}>Please check your network</Text>                    
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        padding: 16,
        width: 320,
        height:300,
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
    networkLogo: {
        height: 150,
        width:120,
        resizeMode:'contain'
    },
    header:{
        marginVertical:12,
        color: theme.colors.$error,
        fontSize: theme.fonts.$font_std,
        fontFamily: theme.fonts.$sansBold,
    },
    message: {
        color: theme.colors.$error,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
    },
});
