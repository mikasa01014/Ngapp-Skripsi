import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    useTheme,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { User } from '../assets';
import { AuthContext } from '../components';


export function DrawerContent(props) {
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="home-outline"
                                    color={color}
                                    size={size} />
                            )}
                            label='Home'
                            onPress={() => {props.navigation.navigate('HomeTab') }} />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="account-outline"
                                    color={color}
                                    size={size} />
                            )}
                            label='Profile'
                            onPress={() => {props.navigation.navigate('Profile')}} />
                    </Drawer.Section>
                    <Drawer.Section title='Preferences'>
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents='none'>
                                    <Switch value={paperTheme.dark} />
                                </View>
                                
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>

            </DrawerContentScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarUser: {
        marginTop: 20,
        flexDirection: 'row',
    },
    userText: {
        marginLeft: 15,
        flexDirection: 'column',
    },

    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
