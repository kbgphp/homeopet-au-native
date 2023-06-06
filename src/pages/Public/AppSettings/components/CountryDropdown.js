import * as React from 'react';
import { useTheme } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import {  StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const countries = ['USA', 'CA', 'UK'];
    return (
        <SelectDropdown
            data={countries}
            defaultValue={'USA'}
            onSelect={(selectedItem, index) => { }}
            defaultButtonText={'Select country'}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
            rowTextForSelection={(item, index) => { return item; }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => { return <FontAwesome name={isOpened ? 'caret-up' : 'caret-down'} style={styles.arrowIcon} />; }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
        />
    );
}


const makeStyles = (theme) => StyleSheet.create({
    dropdownBtnStyle: {
        minWidth: 90,
        maxWidth: 90,
        backgroundColor: '#FFF',
        height: 24,
        paddingHorizontal:0
    },
    dropdownBtnTxtStyle: {
        color: theme.colors.$text,
        fontSize: theme.fonts.$font_sm,
        textAlign: 'right',
        fontFamily: theme.fonts.$sansReg,
    },
    dropdownDropdownStyle: {
        backgroundColor: theme.colors.$white,
        height: 'auto',
        borderRadius:6
    },
    arrowIcon: {
        color: theme.colors.$text,
        fontSize: theme.fonts.$font_sm,
    },
    dropdownRowStyle: {
        backgroundColor: theme.colors.$white,
        borderBottomColor: theme.colors.$border,
        height: 'auto',
        paddingVertical: 4
    },
    dropdownRowTxtStyle: {
        color: theme.colors.$text,
        textAlign: 'right',
        paddingVertical: 0,
        paddingRight:6,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg
    },
});
