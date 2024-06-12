import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { images, icons } from "@src/constants";

export default ({symptomPoint, setSymptomPoint}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const equineSymptoms = [
        {
            name: 'horse_anxiety',
            icon: 'Anxiety',
            iconOver: 'Anxiety_Over',
        },
        {
            name: 'horse_stomach_bowel',
            icon: 'Stomach',
            iconOver: 'Stomach_Over',
        },
        // {
        //     name: 'horse_worms',
        //     icon: 'Worms',
        //     iconOver: 'Worms_Over',
        // },
        // {
        //     name: 'horse_upper_respiratory',
        //     icon: 'Respiratory',
        //     iconOver: 'Respiratory_Over',
        // },
        {
            name: 'horse_leg_joints',
            icon: 'LegJoint',
            iconOver: 'LegJoint_Over',
        },
        {
            name: 'horse_skin_coat_allergies',
            icon: 'SkinCoat',
            iconOver: 'SkinCoat_Over',
        },
        {
            name: 'horse_injuries',
            icon: 'Injuries',
            iconOver: 'Injuries_Over',
        }
    ];
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
            <View style={{ width: 360, height: 368, }}>
                <Image style={[styles.equineImg]} source={images?.equine} />
                {equineSymptoms.map((item, i) => (
                    <TouchableOpacity key={i} activeOpacity={.8} onPress={() => setSymptomPoint(item.name)} style={[styles.touchPoint, styles?.[`${item.name}`]]}>
                        <Image style={[styles.symptomIcon, symptomPoint === item.name ? styles.selectedPoint : '']} source={symptomPoint === item.name ? icons?.[`${item.iconOver}`] : icons?.[`${item.icon}`]} />
                    </TouchableOpacity>
                ))}

            </View>

        </View>
    );
}
const makeStyles = (theme) => StyleSheet.create({
    equineImg: {
        width: 360,
        height: 368,
        resizeMode: 'cover',
    },
    touchPoint: {
        width: 45,
        height: 45,
        position: 'absolute',
    },
    symptomIcon: {
        width: 45,
        height: 45,
    },
    selectedPoint: {
        transform: [{ scale: 1.2 }],
    },

    horse_anxiety: {
        top: 13,
        left: 14,
    },
    horse_stomach_bowel: {
        top: 138,
        right: 67,
    },
    horse_worms: {
        top: 81,
        right: 17,
    },
    horse_upper_respiratory: {
        top: 110,
        left: 31,
    },
    horse_leg_joints: {
        bottom: 97,
        left: 60,
    },
    horse_skin_coat_allergies: {
        top: 75,
        left: 172,
    },
    horse_injuries: {
        top: 143,
        left: 118,
    }
});