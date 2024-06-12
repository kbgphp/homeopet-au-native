import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { images, icons } from "@src/constants";

export default ({symptomPoint, setSymptomPoint}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const canineSymptoms = [
        {
            name: 'dog_anxiety',
            icon: 'Anxiety',
            iconOver: 'Anxiety_Over',
        },
        {
            name: 'dog_dental',
            icon: 'Dental',
            iconOver: 'Dental_Over',
        },
        {
            name: 'dog_stomach_bowel',
            icon: 'Stomach',
            iconOver: 'Stomach_Over',
        },
        // {
        //     name: 'dog_worms',
        //     icon: 'Worms',
        //     iconOver: 'Worms_Over',
        // },
        // {
        //     name: 'dog_upper_respiratory',
        //     icon: 'Respiratory',
        //     iconOver: 'Respiratory_Over',
        // },
        {
            name: 'dog_leg_joints',
            icon: 'LegJoint',
            iconOver: 'LegJoint_Over',
        },
        {
            name: 'dog_skin_coat_allergies',
            icon: 'SkinCoat',
            iconOver: 'SkinCoat_Over',
        },
        {
            name: 'dog_injuries',
            icon: 'Injuries',
            iconOver: 'Injuries_Over',
        }
    ];
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
            <View style={{ width: 360, height: 368,  }}>
                <Image style={[styles.canineImg]} source={images?.canine} />
                {canineSymptoms.map((item, i) => (
                    <TouchableOpacity key={i} activeOpacity={.8} onPress={() => setSymptomPoint(item.name)} style={[styles.touchPoint, styles?.[`${item.name}`]]}>
                        <Image style={[styles.symptomIcon, symptomPoint === item.name ? styles.selectedPoint : '']} source={symptomPoint === item.name ? icons?.[`${item.iconOver}`] : icons?.[`${item.icon}`]} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
const makeStyles = (theme) => StyleSheet.create({
    canineImg: {
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

    dog_anxiety: {
        top:-2,
        right: 180
    },
    dog_dental: {
        top: 63,
        right: 105
    },
    dog_stomach_bowel:{
        bottom: 58,
        right: 173
    },
    dog_worms:{
        bottom: 64,
        left: 45
    },
    dog_upper_respiratory:{
        top: 125,
        right: 163
    },
    dog_leg_joints:{
        bottom: 70,
        right: 90
    },
    dog_skin_coat_allergies:{
        top: 135,
        left: 95
    },
    dog_injuries:{
        top: 170,
        right: 103
    }
});