import React, { useState, useEffect, createRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
    ApplicationState,
    onGetOrder,
    OrderModel,
    UserState
} from '../../redux'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native'

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { historyEmpty } from '../../assets';
import { colors as constantColors } from '../../constant';
import OrderCards from '../../components/atom/OrderCard';

interface HistoryPageProps {
    UserReducer: UserState,
    onGetOrder: Function,
}

const _Historys: React.FC<HistoryPageProps> = (props) => {
    var emptyOrderIcon = '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'

    const { colors } = useTheme();

    const navigation = useNavigation();

    const { ordersmenu, user } = props.UserReducer;

    const { orders } = ordersmenu
    

    console.log(orders)

    //console.log(`Available Orders ${JSON.stringify(orders)}`)

    useEffect(() => {
        props.onGetOrder(user);
    }, []);

    const onTapOrder = (item: OrderModel) => {
        navigation.navigate('HistoryDetails',  {
            screen: 'HistoryDetails',
            params: {order: item}
        })
    }

    // const onTapFood = ( item: FoodModel ) =>{
    //     navigation.navigate('FoodDetails', {
    //         screen: 'FoodDetails',
    //         params: {food: item}
    //     })
    // }

    const orderView = () => {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.body}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={
                                orders
                            }
                            renderItem={({ item }) => <OrderCards
                                item={item}
                                onTap={onTapOrder}
                            />
                            }
                            keyExtractor={(item) => `${item.id}`}
                        />
                    </View>
                    <View style={styles.footer}>
                    </View>

                </View>
            </ScrollView>
        )
    }

    return (
        orderView()
    )

    // if (orders) {

    //     return orderView();

    // } else {
    //     return (
    //         <View style={styles.emptyCart}>
    //             <Image source={{uri: `data:image/png;base64,${emptyOrderIcon}`}} style={styles.imgCartEmpty} />
    //             <View style={{ height: 20 }}></View>
    //             <Text style={[styles.emptyCartText, { color: colors.text }]}> Your Order is Empty! </Text>
    //         </View>
    //     )
    // }
}

const mapToStateProps = (state: ApplicationState) => ({
    UserReducer: state.UserReducer
})

const Historys = connect(mapToStateProps, { onGetOrder })(_Historys)

export default Historys

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    navigations: {
        flex: 0.7,
        paddingTop: 5,
    },
    searchBar: {
        flex: 9,
        display: 'flex',
        height: 40,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
    },
    body: {
        flex: 10,
    },
    emptyCart: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCartText: {
        fontSize: 25,
        fontWeight: '700'
    },
    imgCartEmpty: {
        width: 250,
        height: 250,
    },
    footer: {
        flex: 2,
        padding: 10,
        paddingBottom: 20,
    },
    ammountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20

    },
    popUpContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
    },
    paymentView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
        margin: 4,
        backgroundColor: constantColors.default,

    },
    paymentOption: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    options: {
        display: 'flex',
        height: 115,
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderColor: constantColors.default,
        backgroundColor: '#F2F2F2',
        borderWidth: 0.3,
        borderRadius: 10,
        margin: 8
    },
    optionIcons: {
        width: 100,
        height: 80
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
    },
    
})
