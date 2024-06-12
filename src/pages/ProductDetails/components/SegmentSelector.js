import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default ({ selectedTab, setSelectedTab }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View style={styles.segmentContainer}>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedTab('Description')} style={[styles.segment, selectedTab === 'Description' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedTab === 'Description' ? styles.activeTitle : null]}>{"Description"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedTab('Advice Care')} style={[styles.segment, selectedTab === 'Advice Care' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedTab === 'Advice Care' ? styles.activeTitle : null]}>{"Advice Care"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} onPress={() => setSelectedTab('Ingredients')} style={[styles.segment, selectedTab === 'Ingredients' ? styles.activeSegment : null]}>
                <Text style={[styles.segmentTitle, selectedTab === 'Ingredients' ? styles.activeTitle : null]}>{"Ingredients"}</Text>
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
        paddingEnd:20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: theme.colors.$white,
        borderBottomWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid'
    },
    segment: {
        paddingHorizontal: 12,
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
