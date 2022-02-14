import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { colors as constantColors } from '../../constant'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';

import { connect, useSelector } from 'react-redux'
import {
    onAvailability,
    UserState,
    ShoppingState,
    ApplicationState,
    Merchants,
    FoodModel,
    onSearchFoods
} from '../../redux'

import SearchBars from '../../components/atom/SearchBars'
import IconButtons from '../../components/atom/MaterialCommunityIconButtons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import CategoryCards from '../../components/atom/CategoryCard'
import RestaurantCards from '../../components/atom/RestaurantCard'
import RestaurantCards2 from '../../components/atom/RestaurantCard2'


interface HomeProps {
    UserReducer: UserState,
    ShoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

const _Home: React.FC<HomeProps> = (props) => {
    const { location } = props.UserReducer;
    const { mainmenu } = props.ShoppingReducer;
    const { user } = props.UserReducer

    console.log(user)

    const { colors } = useTheme();
    const theme = useTheme();

    const { merchants } = mainmenu
    console.log(merchants)
    console.log(location)

    const navigation = useNavigation();


    useEffect(() => {
        props.onAvailability(user)
        setTimeout(() => {
            props.onSearchFoods(user)
        }, 1000)
    }, [])

    const onTapRestaurant = (item: Merchants) => {
        navigation.navigate('Restaurants', {
            screen: 'Restaurants',
            params: { merchants: item }
        })
    }



    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={theme.dark ? "light-content" : "dark-content"}
                backgroundColor={constantColors.default}
            />
            <View style={styles.navigation}>
                <View style={styles.location}>
                    <Icon2 name='location-outline' size={25} color={constantColors.default} />
                    <Text style={{
                        color: constantColors.default,
                        fontSize: 16,
                        fontWeight: 'bold',
                        paddingTop: 2
                    }}>
                        {`${location.postalCode}, ${location.street}`}
                    </Text>
                </View>
                <View style={styles.searchBar}>
                    <SearchBars
                        didTouch={() => {
                            navigation.navigate('Searchs')
                        }}
                        onTextChange={() => { }}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: constantColors.default,
                            marginLeft: 15,

                        }}
                        >
                            Restaurant
                        </Text>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={merchants}
                        renderItem={({ item }) => <RestaurantCards2 item={item} onTap={onTapRestaurant} />}
                        keyExtractor={(item) => `${item.id}`}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    UserReducer: state.UserReducer,
    ShoppingReducer: state.ShoppingReducer
})

const Home = connect(mapToStateProps, { onAvailability, onSearchFoods })(_Home)

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 3
    },
    navigation: {
        flex: 1.5,

    },
    location: {
        flex: 4.5,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 8,

        borderWidth: 2,
        width: 390,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        borderColor: constantColors.default

    },
    searchBar: {
        flex: 9,
        display: 'flex',
        height: 60,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4

    },
    body: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
