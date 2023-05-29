import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default ({ selectedPet, setSelectedPet }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.segmentContainer}>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedPet('canine')} style={[styles.segment, selectedPet === 'canine' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedPet === 'canine' ? styles.activeTitle : null]}>{"Canine"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedPet('feline')} style={[styles.segment, selectedPet === 'feline' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedPet === 'feline' ? styles.activeTitle : null]}>{"Feline"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedPet('equine')} style={[styles.segment, selectedPet === 'equine' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedPet === 'equine' ? styles.activeTitle : null]}>{"Equine"}</Text>
            </TouchableOpacity>
        </View>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    segmentContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: theme.colors.$white,
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid'
    },
    segment: {
        flex: 1,
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
