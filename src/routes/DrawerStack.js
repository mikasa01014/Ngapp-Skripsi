import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import { Favorites, Settings,SplashMainRoots } from '../pages';
import AllStackScreen from './MainStack';


const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>       
            <Drawer.Screen name="HomeDrawer" component={AllStackScreen} />
            {/* <Drawer.Screen name="Favorite" component={Favorites} />
            <Drawer.Screen name="Settings" component={Settings} /> */}
        </Drawer.Navigator>
    )
}

export default DrawerStack


