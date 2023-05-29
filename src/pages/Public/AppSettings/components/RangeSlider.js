import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';

export default ({ value,sliderValueChanged }) => {
    const theme = useTheme();
    return (
        <Slider
            value={value}
            style={{ width: '100%' }}
            minimumValue={1}
            maximumValue={10}
            minimumTrackTintColor={theme.colors.$menu}
            maximumTrackTintColor={theme.colors.$border}
            step={1}
            thumbTintColor={theme.colors.$menu}
            onSlidingComplete={value => sliderValueChanged({ value })}
        />
    );
}
