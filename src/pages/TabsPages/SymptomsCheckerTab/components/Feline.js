import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { images, icons } from "@src/constants";


export default ({ symptomPoint, setSymptomPoint }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);


    const felineSymptoms = [
        {
            name: 'cat_anxiety',
            icon: 'Anxiety',
            iconOver: 'Anxiety_Over',
        },
        {
            name: 'cat_dental',
            icon: 'Dental',
            iconOver: 'Dental_Over',
        },
        {
            name: 'cat_stomach_bowel',
            icon: 'Stomach',
            iconOver: 'Stomach_Over',
        },
        // {
        //     name: 'cat_worms',
        //     icon: 'Worms',
        //     iconOver: 'Worms_Over',
        // },
        // {
        //     name: 'cat_upper_respiratory',
        //     icon: 'Respiratory',
        //     iconOver: 'Respiratory_Over',
        // },
        {
            name: 'cat_leg_joints',
            icon: 'LegJoint',
            iconOver: 'LegJoint_Over',
        },
        {
            name: 'cat_skin_coat_allergies',
            icon: 'SkinCoat',
            iconOver: 'SkinCoat_Over',
        },
        {
            name: 'cat_injuries',
            icon: 'Injuries',
            iconOver: 'Injuries_Over',
        }
    ];
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
            <View style={{ width: 360, height: 368, }}>
                <Image style={[styles.felineImg]} source={images?.feline} />
                {felineSymptoms.map((item, i) => (
                    <TouchableOpacity key={i} activeOpacity={.8} onPress={() => setSymptomPoint(item.name)} style={[styles.touchPoint, styles?.[`${item.name}`]]}>
                        <Image style={[styles.symptomIcon, symptomPoint === item.name ? styles.selectedPoint : '']} source={symptomPoint === item.name ? icons?.[`${item.iconOver}`] : icons?.[`${item.icon}`]} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
const makeStyles = (theme) => StyleSheet.create({
    felineImg: {
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

    cat_anxiety: {
        top: -3,
        left: 90,
    },
    cat_dental: {
        top: 74,
        right: 154,
    },
    cat_stomach_bowel: {
        bottom: 52,
        right: 128
    },
    cat_worms: {
        bottom: 42,
        right: 45,
    },
    cat_upper_respiratory: {
        top: 95,
        left: 72
    },
    cat_leg_joints: {
        bottom: 72,
        left: 86,
    },
    cat_skin_coat_allergies: {
        top: 144,
        right: 63,
    },
    cat_injuries: {
        top: 180,
        left: 145,
    }


});