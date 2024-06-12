import { useTheme } from 'react-native-paper';
import { StyleSheet,Text,Image} from 'react-native';
import { images } from "@src/constants"

export default ({text}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <Text style={styles.pageHeader}>{text}
            <Image style={styles.pinkBird} source={images?.pinkBird} />
        </Text>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    pageHeader: {
        fontSize: 24,
        fontFamily: theme.fonts.$serifReg,
        color: theme.colors.$pink,
        marginTop: 8,
        marginBottom: 8,
    },
    pinkBird: {
        width: 40,
        height: 32
    },
});
