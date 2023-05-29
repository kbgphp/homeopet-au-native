import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { TOAST, getDimension } from "../../../utils"



export default ({ props }) => {
    const theme = useTheme();
    const { window } = getDimension();
    const styles = makeStyles(theme, window);
    const [searchText, onChangeSearchText] = React.useState('');
    const searchThis = () => {
        if (!!searchText) {
            props.navigation.navigate('SearchResults',{searchText:searchText});
        } else {
            TOAST.show('warn', 'Please enter some keywords');
        }
    }

    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', backgroundColor: '#adadad',paddingVertical:8 }}>
                <View style={{ flex: 4, }}>
                    <Text style={styles.header}>{"Quick Search"}</Text>
                </View>
                <View style={{ flex: 7, justifyContent: "center" }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeSearchText}
                        value={searchText}
                        autoComplete='off'
                        enterKeyHint={'done'}
                        placeholder="Enter product or symptom"
                        inputMode='search'
                        clearButtonMode='while-editing'
                    />
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity activeOpacity={!searchText ? 0.2 : 0.8} onPress={() => searchThis()} style={styles.button}>
                        <Text style={[styles.btnText, !searchText ? styles.disabled : '']}>{"GO"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const makeStyles = (theme, window) => StyleSheet.create({
    header: {
        paddingVertical:4,
        alignItems: 'center',
        paddingLeft: 12,
        fontSize: window.width > 360 ? theme.fonts.$font_md : theme.fonts.$font_std,
        color: theme.colors.$white,
        fontFamily: theme.fonts.$sansReg,
    },
    input: {
        height: 30,
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontSize: theme.fonts.$font_sm,
        borderRadius: 6,
        color: theme.colors.$dark,
        backgroundColor: theme.colors.$light,
        fontFamily: theme.fonts.$sansReg,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        backgroundColor: theme.colors.$light,
        borderRadius: 6,
        paddingHorizontal: 12,
        color: theme.colors.$gray,
    },
    btnText: {
        color: theme.colors.$gray,
        fontFamily: theme.fonts.$sansBold,
        fontSize: theme.fonts.$font_sm,
    },
    disabled: {
        color: theme.colors.$border,
    }
});
