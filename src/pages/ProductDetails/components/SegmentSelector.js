import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default ({ selectedTab, setSelectedTab }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.segmentContainer}>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedTab('Symptoms')} style={[styles.segment, selectedTab === 'Symptoms' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedTab === 'Symptoms' ? styles.activeTitle : null]}>{"Symptoms"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedTab('Benefits')} style={[styles.segment, selectedTab === 'Benefits' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedTab === 'Benefits' ? styles.activeTitle : null]}>{"Benefits"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedTab('Reviews')} style={[styles.segment, selectedTab === 'Reviews' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedTab === 'Reviews' ? styles.activeTitle : null]}>{"Reviews"}</Text>
            </TouchableOpacity>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    segmentContainer: {
        paddingLeft:20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.$white,
        borderBottomWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid'
    },
    segment: {
        paddingHorizontal: 18,
    },

    activeSegment: {
        borderBottomWidth: 3,
        borderColor: theme.colors.$pink,
        borderStyle: 'solid',
        color: theme.colors.$pink,
    },
    segmentTitle: {
        textAlign: 'center',
        paddingVertical: 6,
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
    },
    activeTitle: {
        color: theme.colors.$pink,
    },
});
