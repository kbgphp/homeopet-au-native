import { Image } from 'react-native';
import { images } from "../../constants"

export default () => {
    return (
        <Image
            style={{ width: 126, height: 20 }}
            source={images.logoWithoutTag}
        />
    );
}