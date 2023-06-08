import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTab from '../TabsPages/HomeTab';
import ProductsTab from '../TabsPages/ProductsTab';
import SearchTab from '../TabsPages/SearchTab';
import SymptomsCheckerTab from '../TabsPages/SymptomsCheckerTab';
import { LogoTitle } from '../../components/elements';
import { HeaderRight, } from '../../components/global';


const Tab = createBottomTabNavigator();
export default function Tabs(props) {
    const theme = useTheme();
    return (

        <Tab.Navigator initialRouteName="Products"
            activeColor={theme.colors.$pink}
            inactiveColor={theme.colors.$menu}
            barStyle={{ backgroundColor: theme.colors.$light_gray }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Products') {
                        iconName = focused ? 'cube' : 'cube-outline';
                    } else if (route.name === 'Symptoms') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    }
                    return <Ionicons name={iconName} size={28} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.$pink,
                tabBarInactiveTintColor: theme.colors.$menu,
                tabBarLabelStyle: { fontSize: 13, fontFamily: theme.fonts.$sansReg },
                headerTitle: () => <LogoTitle />,
                headerStyle: {
                    borderBottomColor: 'primary',
                },
                safeAreaInsets: { top: 0 },
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerRight: () => <HeaderRight theme={theme} {...props} />,
            })}>

            <Tab.Group >
                <Tab.Screen name="Home" component={HomeTab}
                    listeners={() => ({ tabPress: e => { props.navigation.navigate('Home') } })} />
                <Tab.Screen name="Products" component={ProductsTab}
                    listeners={() => ({ tabPress: e => { props.navigation.navigate('Products') } })} />
                <Tab.Screen name="Symptoms" component={SymptomsCheckerTab}
                    listeners={() => ({ tabPress: e => { props.navigation.navigate('Symptoms') } })} />
                <Tab.Screen name="Search" component={SearchTab}
                    listeners={() => ({ tabPress: e => { props.navigation.navigate('Search') } })} />
            </Tab.Group>
        </Tab.Navigator>
    );
}