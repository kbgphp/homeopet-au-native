import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { Vimeo } from 'react-native-vimeo-iframe';
import { StyleSheet, View, } from 'react-native';


export default ({videoId=737579206}) => {

    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={{ flex: 1 }}>
            <Vimeo
                originWhitelist={['*']}
                videoId={videoId}
                params={'api=1&autoplay=0'}
                style={styles.vimeo}
            />
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    vimeo: {
        height: 220,
        width: "100%",
        borderColor: theme.colors.$grey,
        borderWidth: 1,
        borderStyle: 'solid'
    }

});