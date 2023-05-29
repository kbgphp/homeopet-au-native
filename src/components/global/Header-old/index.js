import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { AppBar } from "@react-native-material/core";
import { images, icons } from "../../../constants"
import Icon from 'react-native-vector-icons/FontAwesome';



export default ({ props, backButton, rightButton }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const LogoTitle = () => (
        <Image
            style={{ width: 160, height: 26 }}
            source={images.logoWithoutTag}
        />
    );

    const BackArrowButton = () => (
        <View style={{ flexDirection: 'row', paddingLeft: 12 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                <Image
                    source={icons?.Back}
                    style={{ height: 28, width: 28 }}
                />
            </TouchableOpacity>
        </View>
    );

    const HeaderRight = () => {
        return (
            <View style={{ flexDirection: 'row', paddingRight: 12 }}>
                <TouchableOpacity activeOpacity={.8} onPress={() => props?.navigation.navigate('AppSettings')} style={styles.button}>
                    <Icon name="gear" size={28} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.8} onPress={() => props?.navigation.navigate('Notifications')} style={styles.button}>
                    <Icon name="bell" size={28} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <>
            <StatusBar />
            <View style={styles.container}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', height: 60 }}>
                    {(backButton && props?.navigation.canGoBack()) && <BackArrowButton />}
                </View>
                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', height: 60 }}>
                    <LogoTitle />
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: 60 }}>
                    {rightButton && <HeaderRight />}
                </View>
            </View>

        </>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.$white,
    },
    button: {
        paddingHorizontal: 4
    },
    icon: {
        color: theme.colors.$menu_icon,
    },
});
