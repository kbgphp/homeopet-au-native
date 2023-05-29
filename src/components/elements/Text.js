import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Text, } from "@react-native-material/core";

export default function H3({ text }) {
    const theme = useTheme();
    return (
        <>
            <Text variant="h3">h3. Heading</Text>
        </>
    );
}

export default function H4({ text }) {
    const theme = useTheme();
    return (
        <>
            <Text variant="h4">h4. Heading</Text>
        </>
    );
}

export default function H5({ text }) {
    const theme = useTheme();
    return (
        <>
            <Text variant="h5">h5. Heading</Text>
        </>
    );
}
export default function H6({ text }) {
    const theme = useTheme();
    return (
        <>
            <Text variant="h6">h6. Heading</Text>
        </>
    );
}


export default function BODY({ text }) {
    const theme = useTheme();
    return (
        <>
            <Text variant="subtitle1">Body. Text</Text>
        </>
    );
}
const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Angelina'
    },
});
