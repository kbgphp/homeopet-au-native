import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';

import ContentLoader, { Rect } from "react-content-loader/native";


export default ({ width, height = 160 }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <>
            <ContentLoader
                speed={3}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#D3D3D3"
                foregroundColor="#ecebeb"
            >
                <Rect x="20" y="20" rx="4" ry="4" width="400" height="400" />
            </ContentLoader>

            <ContentLoader
                speed={3}
                width={400}
                height={50}
                backgroundColor="#D3D3D3"
                foregroundColor="#ecebeb"
            >
                <Rect x="20" y="20" rx="4" ry="4" width="400" height="400" />
            </ContentLoader>

            <ContentLoader
                speed={3}
                width={350}
                height={35}
                backgroundColor="#D3D3D3"
                foregroundColor="#ecebeb"
            >
                <Rect x="20" y="20" rx="4" ry="4" width="400" height="400" />
            </ContentLoader>

            <ContentLoader
                speed={3}
                width={300}
                height={30}
                backgroundColor="#D3D3D3"
                foregroundColor="#ecebeb"
            >
                <Rect x="20" y="20" rx="4" ry="4" width="400" height="400" />
            </ContentLoader>
        </>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

});
