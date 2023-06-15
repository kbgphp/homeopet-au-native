import { View, Image, TouchableOpacity } from 'react-native';
import { icons } from "../../../constants"

export default ({ props }) => {
    return (
        <View style={{ paddingLeft: 8 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()}>
                <Image
                    source={icons?.Back}
                    style={{ height: 28, width: 28 }}
                />
            </TouchableOpacity>
        </View>
    );
}
