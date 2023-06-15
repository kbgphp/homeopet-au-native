import { useTheme } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const languages = [
        { title: 'English (US)', value: 'eng_us' },
        { title: 'English (UK)', value: 'eng_uk' },
        { title: 'English (CA)', value: 'eng_ca' },

    ];

    return (
        <SelectDropdown
            data={languages}
            defaultValue={{ title: 'English (US)', value: 'eng_us' }}
            onSelect={(selectedItem, index) => {  }}
            defaultButtonText={'Select language'}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title; }}
            rowTextForSelection={(item, index) => { return item.title; }}
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
        minWidth: 130,
        maxWidth: 130,
        backgroundColor: '#FFF',
        height: 24,
        paddingHorizontal: 0
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
        borderRadius: 6
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
        paddingRight: 6,
        fontSize: theme.fonts.$font_sm,
        fontFamily: theme.fonts.$sansReg,
    },
});
