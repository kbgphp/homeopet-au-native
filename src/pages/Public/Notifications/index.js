import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import { ActivityLoader } from '@src/components/elements';
import { BackIconButton } from "@src/components/global"
import NotificationOff from "./NotificationOff";
import ZeroNotification from './ZeroNotification';
import { resetNotificationCount } from '@src/redux/slices/notificationSlice';

export default function Notifications(props) {
    React.useEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => <BackIconButton props={props} />,
            headerRight: () => <HeaderRight />,
        })
    }, [])
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const NOTIFICATION = useSelector((state) => state?.notification);
    const isNotificationON = NOTIFICATION?.competitionNotificationOn || NOTIFICATION?.newProductNotificationOn || NOTIFICATION?.blogNotificationOn;

    const HeaderRight = () => (
        <View style={{ paddingRight: 8 }}>
            <Icon name="bell" size={28} style={styles.icon} />
        </View>
    )

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(resetNotificationCount());
        }, 2000);
    }, [])

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