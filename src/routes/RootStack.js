import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { 
    Login2, 
    Register2, 
    Splash, 
    WelcomeAuth2 
} from '../pages';
import { AllStackScreen, DrawerStack } from '.';

const Stack = createStackNavigator();

const RootStack = ({ navigation }) => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login2} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register2} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomeAuth" component={WelcomeAuth2} options={{ headerShown: false }} />
            <Stack.Screen name="AllStack" component={DrawerStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default RootStack

