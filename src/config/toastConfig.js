
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const toastConfig = {
  customToast: ({ text1, props }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
      <View style={styles.root}>
        <View style={[
          styles.body,
          (props?.type === 'success') ? styles.success : (props?.type === 'error') ? styles.error : styles.warn
        ]} >
          <Text style={[styles.text]}>{text1}</Text>
        </View>
      </View>
    )
  }
};



const makeStyles = (theme) => StyleSheet.create({
  root: { margin: 18 },
  body: { alignSelf: 'center', padding: 12, borderRadius: 6 },
  success: { backgroundColor: theme.colors.$light_green },
  error: { backgroundColor: theme.colors.$error },
  warn: { backgroundColor: theme.colors.$yellow },
  text: { fontSize: theme.fonts.$font_sm, color: theme.colors.$white, fontFamily: theme.fonts.$sansBold, }

});