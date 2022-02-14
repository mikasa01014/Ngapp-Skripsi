import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
    Akun,
    Carts,
    FoodDetail,
    HistoryDetail,
    Historys,
    Home,
    Notification,
    Restaurants,
    Searchs,
    SplashMainRoots,
} from '../pages';
import { colors } from '../constant';
import { Button } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const SearchStack = createStackNavigator();
const RestaurantStack = createStackNavigator();
const FoodDetailStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const HistoryDetailStack = createStackNavigator();
const CartStack = createStackNavigator();
const TransferBankStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AllStack = createStackNavigator();

const AllStackScreen = () => {
    return (
        <AllStack.Navigator>
            {/* <AllStack.Screen name="SplashMainRoot" component={SplashMainRoots} options={{ headerShown: false }} /> */}
            <AllStack.Screen name="HomeAll" component={MainStack} options={{ headerShown: false }} />
        </AllStack.Navigator>
    )
}


const MainStack = () => {
    return (
        <Tab.Navigator initialRouteName="HomeTab" activeColor="#ffffff" shifting={true}>
            <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{
                tabBarLabel: 'Home',
                tabBarColor: colors.default,
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={25} />
                ),
            }} />
            <Tab.Screen name="History" component={HistoryStackScreen} options={{
                tabBarLabel: 'History',
                tabBarColor: colors.default,
                tabBarIcon: ({ color }) => (
                    <Icon2 name="archive" color={color} size={25} />
                ),
            }} />
            {/* <Tab.Screen name="Cart" component={CartStackScreen} options={{
                tabBarLabel: 'Cart',
                tabBarColor: colors.default,
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-cart" color={color} size={25} />
                ),
            }} /> */}
            <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
                tabBarLabel: 'Profile',
                tabBarColor: colors.default,
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={25} />
                ),
            }} />
        </Tab.Navigator>
    )
}

export default AllStackScreen

//------------------------------------------------------------------------------------------------------------------------------------
// HomeStack
const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <HomeStack.Screen name="HomeScreen" component={Home} options={{
                headerLeft: () => (
                    <Button type='icon' name='drawer' onPress={() => navigation.openDrawer()} />
                ),
                // headerRight:() => (
                //     <Button type='icon' name='notif' onPress={() => navigation.navigate('Notification')} style={styles.buttonNotif} />
                // )
            }} />
            {/* <HomeStack.Screen name="Notification" component={NotificationStackScreen} options={{ headerShown: false }}/> */}
            <HomeStack.Screen name="Searchs" component={SearchStackScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="Restaurants" component={RestaurantStackScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="FoodDetails" component={FoodDetailStackScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="My Cart" component={CartStackScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    )
};


const SearchStackScreen = ({ navigation }) => {
    return (
        <SearchStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <SearchStack.Screen name="Searchs" component={Searchs} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack} />
                ),
            }} />
        </SearchStack.Navigator>
    )
};

const RestaurantStackScreen = ({ navigation }) => {
    return (
        <RestaurantStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <RestaurantStack.Screen name="Restaurants" component={Restaurants} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack} />
                ),
            }} />
        </RestaurantStack.Navigator>
    )
};

const FoodDetailStackScreen = ({ navigation }) => {
    return (
        <FoodDetailStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <FoodDetailStack.Screen name="FoodDetails" component={FoodDetail} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack} />
                ),
            }} />
        </FoodDetailStack.Navigator>
    )
};
//------------------------------------------------------------------------------------------------------------------------------------
// HistoryStack
const HistoryStackScreen = ({ navigation }) => {
    return (
        <HistoryStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <HistoryStack.Screen name="Historys" component={Historys} options={{
                headerLeft: () => (
                    <Button type='icon' name='drawer' onPress={() => navigation.openDrawer()} />
                ),
                // headerRight:() => (
                //     <Button type='icon' name='notif' onPress={() => navigation.navigate('Notification')} style={styles.buttonNotif} />
                // )
            }} />
            <HistoryStack.Screen name="HistoryDetails" component={HistoryDetailStackScreen} options={{ headerShown: false }} />
        </HistoryStack.Navigator>
    )
};
const HistoryDetailStackScreen = ({ navigation }) => {
    return (
        <HistoryDetailStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <HistoryDetailStack.Screen name="HistoryDetails" component={HistoryDetail} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack} />
                ),
            }} />
        </HistoryDetailStack.Navigator>
    )
};
//------------------------------------------------------------------------------------------------------------------------------------
//CartStack
const CartStackScreen = ({ navigation }) => {
    return (
        <CartStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <CartStack.Screen name="My Cart" component={Carts} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack} />
                ),
                // headerRight:() => (
                //     <Button type='icon' name='notif' onPress={() => navigation.navigate('Notification')} style={styles.buttonNotif} />
                // )
            }} />
        </CartStack.Navigator>
    )
};


//----------------------------------------------------------------------------------------------------------------------------------------
//ProfileStack
const ProfileStackScreen = ({ navigation }) => {
    return (
        <ProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <ProfileStack.Screen name="Profile" component={Akun} options={{
                headerLeft: () => (
                    <Button type='icon' name='drawer' onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </ProfileStack.Navigator>
    )
};
//----------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    buttonNotif: {
        marginTop: 10,
        paddingRight: 10.

    },
    buttonBack: {
        paddingLeft: 5,
    }
})
