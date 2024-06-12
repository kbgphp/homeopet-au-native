
import StarRating from 'react-native-star-rating-widget';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';

export default ({ rating = 0 }) => {
    const theme = useTheme();

    return (
        <View style={{}}>
            <StarRating
                rating={rating}
                enableHalfStar
                onChange={() => { }}
                enableSwiping={false}
                color={theme.colors.$yellow}
            />
        </View>
    );
}
