import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { COLORS } from "./colors";
import { FONTS } from "./fonts";
import { CUSTOMS } from "./customs";


export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...COLORS,
    },
    fonts: {
        ...DefaultTheme.fonts,
        ...FONTS
    },
    customs: {
        ...CUSTOMS
    }
}
