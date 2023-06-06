import React from 'react';
import { StyleSheet, Text, Image, View, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import { ActivityLoader } from '../../../components/elements';
import { BackIconButton } from "../../../components/global"
import NotificationOff from "./NotificationOff";
import ZeroNotification from './ZeroNotification';

export default function Notifications(props) {
    React.useEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => <BackIconButton props={props} />,
            headerRight: () => <HeaderRight />,
        })
    }, [])
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const NOTIFICATION = useSelector((state) => state?.notification);
    console.log('NOTIFICATION: ', NOTIFICATION);
    const isNotificationON = NOTIFICATION?.competitionNotificationOn || NOTIFICATION?.newProductNotificationOn || NOTIFICATION?.blogNotificationOn;


    const HeaderRight = () => (
        <View style={{ paddingRight: 8 }}>
            <Icon name="bell" size={28} style={styles.icon} />
        </View>
    )

    return (
        <>
            {isProcessing ? <ActivityLoader /> :
                isNotificationON ?
                    <ZeroNotification /> : <NotificationOff props={props} />
            }
        </>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    icon: {
        color: theme.colors.$pink,
    },

})