import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Platform, UIManager, LayoutAnimation, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_CODES } from "./colorCodes"
import { getDimension } from '../../../utils';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default ({areaExpanded,setAreaExpanded}) => {
    const theme = useTheme();
    const { window } = getDimension();
    const styles = makeStyles(theme, window);
 
    function toggleItem() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAreaExpanded(!areaExpanded);
    }

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem} activeOpacity={0.9}>
                <Text style={styles.accordTitle}>{"Problem Area Key"}</Text>
                <Icon name={areaExpanded ? 'minus' : 'plus'} size={16} color="#bbb" />
            </TouchableOpacity>
            {areaExpanded && (
                <View style={styles.accordBody}>
                    <View style={styles.mainBody}>
                        {COLOR_CODES && COLOR_CODES.map((item, i) => (
                            <View key={i} style={styles.symptomItem}>
                                <View style={[styles.symptomColor, { backgroundColor: item?.color, }]}></View>
                                <Text style={styles.symptomName}>{item?.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

const makeStyles = (theme,window) => StyleSheet.create({
    accordContainer: {
        paddingVertical: 8,
        backgroundColor: theme.colors.$white,
        borderTopWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid'
    },
    accordHeader: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    accordTitle: {
        fontSize: theme.fonts.$font_xs,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansBold,
    },
    accordBody: {
        paddingHorizontal: 20,
        marginTop: 6
    },
    mainBody: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    symptomItem: {
        width: (window.width - 40) / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    symptomColor: {
        height: 9,
        width: 9,
        marginEnd: 10,
        borderRadius: 50,
    },
    symptomName: {
        fontSize: theme.fonts.$font_xs,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },

});
