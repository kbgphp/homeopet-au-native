import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Platform, UIManager, LayoutAnimation, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [expanded, setExpanded] = React.useState(false);

    function toggleItem() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }
    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem} activeOpacity={0.9}>
                <Text style={styles.accordTitle}>
                    <Text style={styles.accordTitleBold}> {"Disclaimer:"} </Text>
                    {"For guidance purposes ONLY and NOT intended"}
                </Text>
                <Icon name={expanded ? 'minus' : 'plus'} size={16} color="#bbb" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.accordBody}>
                    <Text style={styles.textSmall}> as a definitive diagnosis. Some symptoms can have a wide range of causes so ALWAYS consult your vet if in any doubt.</Text>
                </View>
            )}
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    accordContainer: {
        paddingVertical: 8,
        backgroundColor: theme.colors.$white,
        borderTopWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid'
    },
    accordHeader: {
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    accordTitle: {
        fontSize: theme.fonts.$font_xs,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },
    accordTitleBold: {
        fontFamily: theme.fonts.$sansBold,
    },
    textSmall: {
        paddingHorizontal: 20,
        fontSize: theme.fonts.$font_xs,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    }
});
