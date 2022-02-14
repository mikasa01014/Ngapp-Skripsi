import React, { useState, useEffect } from 'react'
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import {
    Merchants,
    FoodModel,
    ApplicationState,
    onUpdateCart,
    UserState,
    getMerchantData,
    getMerchantAntrian,
    ShoppingState,
    MerchantAntrian
} from '../../redux'
import { RouteProp } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors as constantColors } from '../../constant'

import { useNavigation } from '@react-navigation/native';
import FoodCards from '../../components/atom/FoodCard'
import { checkExistance } from '../../util'
import { connect } from 'react-redux'



interface RestaurantsDetailProps {
    UserReducer: UserState,
    ShoppingReducer: ShoppingState,
    onUpdateCart: Function,
    getMerchantData: Function,
    getMerchantAntrian: Function,
    route: RouteProp<{ params: { merchants: Merchants } }, 'params'>
}

const _Restaurants: React.FC<RestaurantsDetailProps> = (props) => {
    const { merchants } = props.route.params;

    const navigation = useNavigation();

    const { Cart, user } = props.UserReducer

    const onTapFood = (item: FoodModel) => {
        navigation.navigate('FoodDetails', {
            screen: 'FoodDetails',
            params: { food: item }
        })
    }

    const { merchantData, merchantAntrianData } = props.ShoppingReducer

    const {antrian} = merchantAntrianData

    console.log(merchantData)

    console.log(antrian)




    useEffect(() => {
        props.getMerchantData(user, merchants)
        props.getMerchantAntrian(user, merchants)
    }, [])

    const goToCart = ( item : Merchants, item2 : MerchantAntrian ) => {
        navigation.navigate('My Cart', {
            screen: 'My Cart',
            params: { 
                merchant : item,
                merchantAntrianData : item2
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <ImageBackground
                    source={{ uri: `data:image/jpeg;base64,${merchantData.image}` }}
                    style={styles.background}
                >
                    <View style={styles.textBackground}>
                        <Text style={{
                            color: 'white',
                            fontSize: 35,
                            fontWeight: '700'
                        }}>{merchantData.name}</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: '500'
                        }}> {merchantData.address} {merchantData.phone_number}
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: '500'
                        }}> Total Antrian : {antrian}
                        </Text>
                    </View>
                </ImageBackground>
                {/* <View style={styles.background}>
                
                </View> */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={merchantData.products}
                    renderItem={({ item }) => <FoodCards
                        item={checkExistance(item, Cart)}
                        onTap={onTapFood}
                        onUpdateCart={props.onUpdateCart}
                    />}
                    keyExtractor={(item) => `${item.id}`}
                />
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => goToCart(merchants, merchantAntrianData)} style={styles.floatingButton}>
                <Icon name='cart-outline' color={constantColors.default} size={40} />
            </TouchableOpacity>

        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    ShoppingReducer: state.ShoppingReducer,
    UserReducer: state.UserReducer
})

const Restaurants = connect(mapToStateProps, { onUpdateCart, getMerchantData, getMerchantAntrian })(_Restaurants)


export default Restaurants

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    background: {
        width: Dimensions.get('screen').width,
        height: 300,
        justifyContent: 'flex-end',
    },
    textBackground: {
        height: 140,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
    },
    floatingButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        left: 15,
        bottom: 15,
        borderColor: constantColors.default,
        borderWidth: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
})
