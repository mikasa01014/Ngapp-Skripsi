import React, { useState, useEffect, createRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
    ApplicationState,
    ShoppingState,
    FoodModel,
    onUpdateCart,
    onCreateOrder,
    onErrorNull,
    UserState,
    Merchants,
    MerchantModel,
    MerchantAntrian
} from '../../redux'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native'

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { checkExistance } from '../../util';
import CartCards from '../../components/atom/CartCard';
import { BankTransfer, Cash, EmptyCart } from '../../assets';
import TitleButtons from '../../components/atom/buttonTitle';
import PaymentTypePopup from 'react-native-raw-bottom-sheet';
import { colors as constantColors } from '../../constant';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momment from 'moment'

interface CartPageProps {
    UserReducer: UserState,
    ShoppingReducer: ShoppingState,
    onUpdateCart: Function,
    onCreateOrder: Function,
    onErrorNull: Function,
    route: RouteProp<{ params: { merchant: Merchants, merchantAntrianData: MerchantAntrian } }, 'params'>
}

const _ShoppingCarts: React.FC<CartPageProps> = (props) => {
    const { colors } = useTheme();
    const theme = useTheme();
    var bankTransferIcon = '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'
    var emptyCartIcon = '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'
    let randomNumber = Math.floor((Math.random() * 50) + 1);
    const { merchant, merchantAntrianData } = props.route.params

    console.log(randomNumber)

    console.log(merchantAntrianData.antrian)

    console.log(merchant)
    const { Cart, ordersmenu, user, error } = props.UserReducer;

    const [totalAmmount, setTotalAmmount] = useState(0)
    const [totalTax, setTotalTax] = useState(0)
    const [payable, setPayable] = useState(0)
    const [payableUnik, setPayableUnik] = useState(0)
    const [order_type, setPickerOrderType] = useState('Basic')
    // const [pickup_time, setCurrentTime] = useState('')
    const [visble, setVisble] = useState(false)
    const [priorityCharge, setPriorityCharge] = useState(0)

    const navigation = useNavigation();

   

    const { orders } = ordersmenu;

    const popupRef = createRef<PaymentTypePopup>();

    console.log(Cart);

    console.log(payable);


    const onTapFood = (item: FoodModel) => {
        navigation.navigate('FoodDetails', {
            screen: 'FoodDetails',
            params: { food: item }
        })
    }

    useEffect(() => {
        onCalculateAmmount()
        //navigation.addListener('focus', onCalculateAmmount)
    }, [Cart]);

    const onCalculateAmmount = () => {
        let total = 0;

        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit
            })
        }


        const tax = (total * 2 / 100 * (merchantAntrianData.antrian))
        const tax0 = (total * 2 / 100 * (merchantAntrianData.antrian + 1))
        const priorityExtraCharge = (total )

        if (total > 0 && merchantAntrianData.antrian == 0) {
            setTotalTax(tax0)
        } else {
            setTotalTax(tax)
        }

        setTotalAmmount(total)
        const afterTax = (total + tax)
        const afterTax0 = (total + tax0)

        if (order_type === 'Priority') {
            if(merchantAntrianData.antrian == 0) {
                setPriorityCharge(priorityExtraCharge)
                setPayable(afterTax0)
                setPayableUnik(afterTax0 + randomNumber)
            } else {
                setPriorityCharge(priorityExtraCharge)
                setPayable(afterTax)
                setPayableUnik(afterTax + randomNumber)
            }
        } else {
            setPayable(total)
            setPayableUnik(total + randomNumber)
        }

    }

    console.log(payableUnik)

    const onValidateOrder = () => {
        popupRef.current?.open();
    }

    const onTapOrder = () => {
        props.onCreateOrder(
            Cart, 
            user, 
            order_type, 
            "Bank Transfer" , 
            payableUnik,
            merchant)
        popupRef.current?.close();
    }

    // const onTapTransfer = () => {
    //     navigation.navigate('TransferBanks', {
    //         payable: payable,
    //         pickerOrderType :order_type,
    //     })
    //     popupRef.current?.close();
    // }

    const popupView = () => {
        return (
            <PaymentTypePopup
                height={400}
                ref={popupRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(52, 52, 52, 0.5)',
                    },
                    draggableIcon: {
                        backgroundColor: '#000'
                    },
                    container: {
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        borderRadius: 20,
                    }

                }}
            >
                <View style={styles.popUpContainer}>
                    <View style={styles.pickupView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            Payment Amount + Unik Number
                        </Text>
                        <Text
                            style={{ fontSize: 20, fontWeight: '700', color: 'white' }}
                        >
                            Rp. {payableUnik.toFixed(0)}
                        </Text>
                    </View>
                    <View style={styles.paymentView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            Order Type
                        </Text>
                        <Text
                            style={{ fontSize: 20, fontWeight: '700', color: 'white' }}
                        >
                            {order_type}
                        </Text>
                    </View>
                    {/* {pickup_time !== '' &&
                        <View style={styles.pickupView}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                Pickup Time
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', paddingTop: 10}}>{pickup_time}</Text>
                        </View>
                    } */}
                    <View style={styles.pickupView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}> 
                            Must pay first through This BCA account number:
                        </Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white',}}>
                            {merchant.account_number}
                        </Text>
                    </View>
                    <View style={{}}>
                        
                    </View>

                    <ScrollView horizontal={true}>
                        <View style={styles.paymentOption}>
                            <TouchableOpacity
                                onPress={() => onTapOrder()}
                                style={styles.options}
                            >
                                <Image
                                    source={{uri : `data:image/png;base64,${bankTransferIcon}`}}
                                    style={styles.optionIcons}
                                />
                                <Text
                                    style={styles.optionText}
                                >
                                    Bank Transfer
                                </Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                onPress={() => { }}
                                style={styles.options}
                            >
                                <Image
                                    source={BankTransfer}
                                    style={styles.optionIcons}
                                />
                                <Text
                                    style={styles.optionText}
                                >
                                    Bank Transfer
                                </Text>
                            </TouchableOpacity> */}

                        </View>
                    </ScrollView>
                </View>
            </PaymentTypePopup>
        );
    }

    const footerContent = () => {
        if (theme.dark) {
            return (
                <View style={{ flex: 1, display: 'flex' }}>
                    <View style={[styles.row, { height: 270, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', backgroundColor: colors.background }]}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'grey', marginBottom: 10, flex: 1, marginLeft: 5 }}>Payment Detail</Text>
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Total</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {totalAmmount.toFixed(0)}</Text>
                        </View>
                        {order_type !== 'Basic' &&
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Tax</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {totalTax.toFixed(0)}</Text>
                        </View>
                        }
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>OrderType</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>{order_type}</Text>
                        </View>
                        {/* {order_type !== 'Basic' &&
                            <View style={styles.paymentInfo}>
                                <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Priority Extra Charge</Text>
                                <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {priorityCharge}</Text>
                            </View>
                        } */}
                        {/* <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>PickUp Time</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>{pickup_time}</Text>
                        </View> */}
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Grand Total</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {payable.toFixed(0)}</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, display: 'flex' }}>
                    <View style={[styles.row, { height: 270, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', backgroundColor: '#F2F2F2', }]}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'grey', marginBottom: 10, flex: 1, marginLeft: 5 }}>Payment Detail</Text>
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Total</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {totalAmmount.toFixed(0)}</Text>
                        </View>
                        { order_type !== 'Basic' &&
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Tax</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {totalTax.toFixed(0)}</Text>
                        </View>
                        }
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>OrderType</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>{order_type}</Text>
                        </View>
                        {/* {order_type !== 'Basic' &&
                            <View style={styles.paymentInfo}>
                                <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Priority Extra Charge</Text>
                                <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {priorityCharge}</Text>
                            </View>
                        } */}
                        {/* {pickup_time !== '' &&
                            <View style={styles.paymentInfo}>
                                <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>PickUp Time</Text>
                                <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>{pickup_time}</Text>
                            </View>
                        } */}
                        <View style={styles.paymentInfo}>
                            <Text style={{ flex: 1, fontSize: 15, color: colors.text, fontWeight: 'bold' }}>Grand Total</Text>
                            <Text style={{ fontSize: 16, color: constantColors.default, fontWeight: '700' }}>Rp. {payable.toFixed(0)}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }


    if (Cart.length > 0) {
        return (
            <View style={styles.container}>
                <View style={styles.navigations} >
                    <View style={{
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: constantColors.default,
                        }}>Pick Up Setting</Text>
                    </View>
                    <View style={styles.searchBar}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: constantColors.default,
                        }}>Order Type :</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={order_type}
                            onValueChange={(itemValue) => setPickerOrderType(itemValue)}
                        >
                            <Picker.Item label='Basic' value='Basic' />
                            <Picker.Item label='Priority' value='Priority' />
                        </Picker>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* <TouchableOpacity style={[styles.timeButton, {
                            borderColor: constantColors.default,
                            borderWidth: 1,
                            marginTop: 8
                        }]} onPress={showDatePicker}>
                            <Text style={[styles.textTime, {
                                color: constantColors.default
                            }]}>
                                Set Your Pick Up Time
                            </Text>
                        </TouchableOpacity> */}
                        {/* <DateTimePickerModal
                            isVisible={visble}
                            mode='time'
                            date={new Date()}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            is24Hour={true}
                            display='spinner'
                        /> */}
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={
                            Cart
                        }
                        renderItem={({ item }) => <CartCards
                            onTap={onTapFood}
                            item={checkExistance(item, Cart)}
                            onUpdateCart={props.onUpdateCart}
                        />}
                        keyExtractor={(item) => `${item.id}`}
                        ListFooterComponent={footerContent}
                    />
                </View>
                <View style={styles.footer}>
                    { error.toString().toLowerCase().includes("400") ?
                        Alert.alert('Error', 'Please make a payment to merchant account number',[
                            {
                                text: 'Ok', 
                                onPress: () => {
                                    props.onErrorNull();
                                }
                            }
                        ])
                    : null
                    }
                    <View style={styles.ammountContainer}>
                        <Text style={{ fontSize: 19, color: colors.text, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontSize: 19, color: constantColors.default, fontWeight: '700' }}>Rp. {payable.toFixed(0)}</Text>
                    </View>
                    <TitleButtons title={"Order"} onTap={onValidateOrder} width={320} height={45} />
                </View>
                {popupView()}
            </View>
        )
    } else {
        return (
            <View style={styles.emptyCart}>
                <Image source={{uri : `data:image/png;base64,,${emptyCartIcon}`}} style={styles.imgCartEmpty} />
                <View style={{ height: 20 }}></View>
                <Text style={[styles.emptyCartText, { color: colors.text }]}> Your cart is Empty! </Text>
            </View>
        )
    }
}

const mapToStateProps = (state: ApplicationState) => ({
    ShoppingReducer: state.ShoppingReducer,
    UserReducer: state.UserReducer
})

const ShoppingCarts = connect(mapToStateProps, { onUpdateCart, onCreateOrder, onErrorNull })(_ShoppingCarts)

export default ShoppingCarts

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    navigations: {
        flex: 2.5,
        paddingTop: 5,
        borderWidth: 2,
        borderColor: constantColors.default,
        borderRadius: 15,
        marginTop: 8,
        marginLeft: 7,
        marginRight: 7,
    },
    searchBar: {
        flex: 2,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 4,
        flexDirection: 'row'
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
        height: 150,
    },
    footer: {
        flex: 2.5,
        padding: 10,
        paddingBottom: 25,
        marginBottom: 20,
    },
    ammountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,

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
        borderRadius:15
    },
    pickupView: {
        justifyContent: 'center',
        padding: 8,
        margin: 4,
        backgroundColor: constantColors.default,
        borderRadius:15,
        alignItems: 'center'
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
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: constantColors.default,
        borderRadius: 15,
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 13,
    },
    paymentInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-around',
        paddingRight: 10,
        paddingLeft: 10
    },
    picker: {
        width: 200,
        height: 40,
        borderColor: constantColors.default,
        borderWidth: 2,
        borderRadius: 15,
        color: constantColors.default,
        textAlign: 'center'
    },
    timeButton: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textTime: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
