import { Switch } from 'react-native-switch';
import { useTheme } from 'react-native-paper';

export default ({ value, disabled = false, toggleSwitch }) => {
    const theme = useTheme();
    return (
        <Switch
            value={value}
            onValueChange={toggleSwitch}
            disabled={disabled}
            activeText={'On'}
            inActiveText={'Off'}
            circleSize={26}
            barHeight={30}
            circleBorderWidth={0}
            backgroundActive={theme.colors.$menu_icon}
            backgroundInactive={theme.colors.$menu_icon}
            circleActiveColor={theme.colors.$pink}
            circleInActiveColor={theme.colors.$white}
            changeValueImmediately={true}
            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
            outerCircleStyle={{}}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2.2}
            switchBorderRadius={20}
        />
    );
}

