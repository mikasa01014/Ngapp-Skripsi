import React, { useState, useEffect, createRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
    ApplicationState,
    onDoneOrder,
    getOrderData,
    OrderModel,
    UserState
} from '../../redux'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import moment from 'moment'

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { colors as constantColors } from '../../constant';
import FoodCards from '../../components/atom/FoodCard';
import TitleButtons from '../../components/atom/buttonTitle';
import { showNotif, cancelAllNotif } from '../../util/notification'

interface HistoryDetailPageProps {
    UserReducer: UserState,
    onDoneOrder: Function,
    getOrderData : Function,
    route: RouteProp<{ params: { order: OrderModel } }, 'params'>
}

const _HistoryDetail: React.FC<HistoryDetailPageProps> = (props) => {
    const { colors } = useTheme();

    const { order } = props.route.params;

    const navigation = useNavigation();

    const { user, orderData } = props.UserReducer;

    // const [timer, setTimer] = useState(10)

    // useEffect(() => {
    //     const countdown = setInterval(() => {
    //         let time = timer;
    //         time -= 1;
    //         setTimer(time)

    //         if (timer <= 0) {
    //             clearInterval(countdown)
    //         }
    //     }, 1000)
    // },[])

    // console.log(orderData.
    //     unit.
    //     toString().
    //     split(',').filter((item,index) => index % 2)
    // )
    
    
    useEffect(() => {
        props.getOrderData(user, order)
    },[order])


    const onTapDoneOrder = () => {
        
        Alert.alert(
            'Done Order' ,
            'Do you want to Done this order ?',
            [
                { text: 'Cancel', onPress: () =>{}, style: 'cancel' },
                { text: 'Yes', onPress: () => {
                    props.onDoneOrder(order, user);
                    navigation.goBack();
                    showNotif('Order Completed', 'Your Order Has Been Completed')
                }}
            ]
        )

    }

    

    const headerCard = () => {
        return (
            <View style={styles.headerContainer}>
                {orderData.order_status == 'ready' ? 
                     showNotif('Order Ready', 'Your Customer Order Has Been Ready')
                    
                :  null
                }
                {orderData.order_status == 'done' ? 
                    showNotif('Order Completed', 'Your Customer Order Has Been Completed')
                : null
                }
                <Text style={[styles.headerText, {
                    color: colors.text
                }]}>
                    Order Date: {moment(orderData.order_date).format('Do MMM YY, h:mm a')}
                </Text>
                <Text style={[styles.headerText, {
                    color: colors.text
                }]}>
                    Order Amount: Rp. {orderData.total_price}
                </Text>
                <Text style={[styles.headerText, {
                    color: colors.text
                }]}>
                    Paid Through: {orderData.paid_thru}
                </Text>
                <Text style={[styles.headerText, {
                    color: colors.text
                }]}>
                    Status: {orderData.order_status}
                </Text>
            </View>
        )
    }

    const footerCard = () => {
        if (orderData.order_status === "ready") {
            return (
                <>
                <View style={{ 
                    marginBottom: 10, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 300, 
                    borderWidth: 2,
                    borderColor: constantColors.default,
                    borderRadius: 15, 
                    margin: 10,
                }}>
                    <Text style={{ fontSize: 18, color: constantColors.default, textAlign: 'center' }}> Order With </Text>
                    <Text style={{ fontSize: 35, color: constantColors.default, textAlign: 'center', fontWeight: 'bold' }}> No. {order.id}</Text>
                    <Text style={{ fontSize: 18, color: constantColors.default, textAlign: 'center' }}> Have Been Ready</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <TitleButtons title={'Done Order'} onTap={() => {onTapDoneOrder();}} width={310} height={40}/>
                </View>
                </>
            )
        } else if (orderData.order_status === "done") {
            return (
                <View style={{ 
                    marginBottom: 10, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 300, 
                    borderWidth: 2,
                    borderColor: 'green',
                    borderRadius: 15, 
                    margin: 10,
                }}>
                    <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}> Order With </Text>
                    <Text style={{ fontSize: 35, color: 'green', textAlign: 'center', fontWeight: 'bold' }}> No. {order.id}</Text>
                    <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}> Have Been Completed</Text>
                </View>
            )
        } else {
            return (
                <>
                    <View style={{
                        display: 'flex',
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 300,
                        //backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: constantColors.default,
                        borderRadius: 15,
                    }}>
                        <Text style={{ fontSize: 28, color: constantColors.default }}> Your Order No. </Text>
                        <Text style={{ fontSize: 40, color: constantColors.default, fontWeight: 'bold' }}> {order.id} </Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TitleButtons title={'Done Order'} onTap={()=>{}} width={310} height={40} disable={true}/>
                        
                    </View>
                </>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigations} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>Order Detail</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={orderData.products}
                    renderItem={({ item, index }) => <FoodCards
                        item={item}
                        onTap={() => { }}
                        onUpdateCart={() => { }}
                        unit={orderData.
                            unit[index]
                        }
                    />
                    }
                    keyExtractor={(item) => `${item.id}`}
                    ListHeaderComponent={headerCard}
                    ListFooterComponent={footerCard}
                />
            </View>
            {/* <View style={styles.footer}>

            </View> */}

        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    UserReducer: state.UserReducer
})

const HistoryDetail = connect(mapToStateProps, { onDoneOrder, getOrderData })(_HistoryDetail)

export default HistoryDetail

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    navigations: {
        flex: 0.7,
        paddingTop: 5,
        alignItems: 'center',
    },
    searchBar: {
        display: 'flex',
        height: 60,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        flex: 11,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    headerContainer: {
        padding: 10,
        alignItems: 'flex-start',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: constantColors.default,
        margin: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    }
})

