import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchTab from "./SearchTab";
import ProductDetails from "../../ProductDetails";
import SearchResults from "../../SearchResults";
import ProductImagesSlider from "../../ProductImagesSlider";
import RecommendedProducts from '../../RecommendedProducts';
import { About,Blog ,BlogDetails,ContactUs,FAQs,Testimonials} from "../../Public"
const Stack = createNativeStackNavigator();


export default function ProductsTab() {

    return (
        <>
            <Stack.Navigator initialRouteName="SearchTab" screenOptions={{ headerShown: false}}>
                <Stack.Group>
                    <Stack.Screen name="SearchTab" component={SearchTab} options={{  }} />
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{}} />
                    <Stack.Screen name="ProductImagesSlider" component={ProductImagesSlider} />
                    <Stack.Screen name="SearchResults" component={SearchResults} options={{}} />
                    <Stack.Screen name="RecommendedProducts" component={RecommendedProducts} options={{}} />
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen name="About" component={About} options={{}} />
                    <Stack.Screen name="Blog" component={Blog} options={{}} />
                    <Stack.Screen name="BlogDetails" component={BlogDetails} options={{}} />
                    <Stack.Screen name="ContactUs" component={ContactUs} options={{}} />
                    <Stack.Screen name="FAQs" component={FAQs} options={{}} />
                    <Stack.Screen name="Testimonials" component={Testimonials} options={{}} />
                </Stack.Group>
            </Stack.Navigator>
        </>
    );
}
