import axios from 'axios'
import { LocationGeocodedAddress } from 'expo-location';
import { Dispatch } from 'react'
import { Customer, CustomerModel, FoodAvailability, FoodModel, MerchantAntrian, MerchantModel, Merchants, Order, OrderModel, OrdersData, UserModel } from './models';
import AsyncStorage from '@react-native-async-storage/async-storage' 


//LOGIN
//USER
export const setUserTrue = (val) => {
    return {type:'SET_USER_TRUE', inputValue: val};
};

export const setUserFalse = (val) => {
    return {type:'SET_USER_FALSE', inputValue: val};
};
//PASSWORD
export const setPasswordTrue = (val) => {
    return {type:'SET_PASSWORD_TRUE', inputValue: val};
};

export const setPasswordFalse = (val) => {
    return {type:'SET_PASSWORD_FALSE', inputValue: val};
};
export const setPasswordVisible =() => {
    return {type:'SET_PASSWORD_VISIBLE'}
}
//VALID USER
export const setIsVallidUserTrue = () => {
    return {type:'SET_ISVALIDUSER_TRUE'}
}
export const setIsVallidUserFalse = () => {
    return {type:'SET_ISVALIDUSER_FALSE'}
}



//REGISTER
//FULLNAME
export const setNameTrue = (val) => {
    return {type:'SET_NAME_TRUE', inputValue: val};
};
export const setNameFalse = (val) => {
    return {type:'SET_NAME_FALSE', inputValue: val};
};
export const setLastNameTrue = (val) => {
    return {type:'SET_LASTNAME_TRUE', inputValue: val};
};
export const setLastNameFalse = (val) => {
    return {type:'SET_LASTNAME_FALSE', inputValue: val};
};
//EMAIL
export const setEmailTrue = (val) => {
    return {type:'SET_EMAIL_TRUE', inputValue: val};
};
export const setEmailFalse = (val) => {
    return {type:'SET_EMAIL_FALSE', inputValue: val};
};
//PHONE
export const setPhoneTrue = (val) => {
    return {type:'SET_PHONE_TRUE', inputValue: val};
};
export const setPhoneFalse = (val) => {
    return {type:'SET_PHONE_FALSE', inputValue: val};
};
//USER
export const setUserrTrue = (val) => {
    return {type:'SET_USERR_TRUE', inputValue: val};
};

export const setUserrFalse = (val) => {
    return {type:'SET_USERR_FALSE', inputValue: val};
};
//password
export const setPasswordrTrue = (val) => {
    return {type:'SET_PASSWORDR_TRUE', inputValue: val};
};

export const setPasswordrFalse = (val) => {
    return {type:'SET_PASSWORDR_FALSE', inputValue: val};
};
export const setPasswordrVisible =() => {
    return {type:'SET_PASSWORDR_VISIBLE'}
}
//confrim password
export const setCPasswordTrue = (val) => {
    return {type:'SET_CPASSWORD_TRUE', inputValue: val};
};

export const setCPasswordFalse = (val) => {
    return {type:'SET_CPASSWORD_FALSE', inputValue: val};
}
export const setCPasswordVisible =() => {
    return {type:'SET_CPASSWORD_VISIBLE'}
}

export const setIsVallidUserrTrue = () => {
    return {type:'SET_ISVALIDUSERR_TRUE'}
}
export const setIsVallidUserrFalse = () => {
    return {type:'SET_ISVALIDUSERR_FALSE'}
}
export const setIsVallidNameTrue = () => {
    return {type:'SET_ISVALIDNAME_TRUE'}
}
export const setIsVallidNameFalse = () => {
    return {type:'SET_ISVALIDNAME_FALSE'}
}
export const setIsVallidLastNameTrue = () => {
    return {type:'SET_ISVALIDLASTNAME_TRUE'}
}
export const setIsVallidLastNameFalse = () => {
    return {type:'SET_ISVALIDLASTNAME_FALSE'}
}
export const setIsVallidEmailTrue = () => {
    return {type:'SET_ISVALIDEMAIL_TRUE'}
}
export const setIsVallidEmailFalse = () => {
    return {type:'SET_ISVALIDEMAIL_FALSE'}
}
export const setIsVallidPhoneTrue = () => {
    return {type:'SET_ISVALIDPHONE_TRUE'}
}
export const setIsVallidPhoneFalse = () => {
    return {type:'SET_ISVALIDPHONE_FALSE'}
}

//AUTH
export const setToken = (userToken) => {
    return {type:'RETRIEVE_TOKEN', token:userToken};
}
export const setLogin = (userName, userToken) => {
    return {type:'LOGIN', id: userName, token:userToken};
}
export const setLogout = () => {
    return {type:'LOGOUT'};
}
export const setRegister = (userName, userToken) => {
    return {type:'REGISTER', id: userName, token:userToken};
}

//UserActions
//----------------------------------------------------------------------
export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION'
    payload: LocationGeocodedAddress
}

export interface UserErrorAction{
    readonly type: 'ON_USER_ERROR'
    payload: any
}

export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART'
    payload: FoodModel
}

export interface UserLoginAction{
    readonly type: 'ON_USER_LOGIN',
    payload: UserModel
}

export interface CreateOrderAction{
    readonly type: 'ON_CREATE_ORDER',
    payload: OrderModel
}

export interface ViewOrderAction{
    readonly type: 'ON_VIEW_ORDER',
    payload: OrdersData
}

export interface UserLogoutAction{
    readonly type: 'ON_USER_LOGOUT',
}

export interface UserGetData{
    readonly type: 'ON_USER_GETDATA'
    payload: CustomerModel
}

export interface OrderGetData{
    readonly type: 'ON_GET_ORDERDATA'
    payload: Order
}

export interface OrderDoneAction{
    readonly type: 'ON_DONE_ORDER'
    payload: Order
}

export interface ErrorNullAction{
    readonly type: 'ON_ERROR_NULL',
}

export type UserAction = 
    UpdateLocationAction | 
    UserErrorAction | 
    UpdateCartAction | 
    UserLoginAction | 
    CreateOrderAction |
    ViewOrderAction |
    UserLogoutAction |
    UserGetData |
    OrderGetData |
    OrderDoneAction |
    ErrorNullAction;

// User Actions trigger from Components

export const onUpdateLocation = (location: LocationGeocodedAddress) => {
    return async ( dispatch: Dispatch<UserAction>) => {
        try {
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_loaction', locationString)
            // save our location in local storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUpdateCart = (item: FoodModel) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        })
    }
}

export const onUserLogin = (email: string, password: string) => {
    return async ( dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>('https://ngapp-backend.herokuapp.com/login/customer', {
                email,
                password
            })

            console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserSignUp = (email: string, phone_number: string, password: string, first_name: string, last_name: string, account_name: string) => {
    return async ( dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>('https://ngapp-backend.herokuapp.com/register/customer', {
                email,
                phone_number,
                password,
                first_name,
                last_name,
                account_name
            })

            console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const getCustomerData = (user: UserModel) => {
    return async ( dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<Customer>('https://ngapp-backend.herokuapp.com/menu/customer/profile')

            //console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_GETDATA',
                    payload: response.data.customer
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}


export const onCreateOrder = (
    products: [FoodModel],
    user: UserModel, 
    order_type: string, 
    paid_thru: string,
    total_price: number, 
    merchant : Merchants,
    ) => {
    
    let cart = new Array();

    products.map(item => {
        cart.push({id: item.id, unit: item.unit})
    })
    
    
    return async ( dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.post<OrderModel>(`https://ngapp-backend.herokuapp.com/order/${merchant.id}`, {
                products: cart,
                order_type,
                paid_thru,
                total_price
            })

            //console.log("JSON", response.data.error)

            console.log(response.data)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: response.status
                })
            } else {
                dispatch({
                    type: 'ON_CREATE_ORDER',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onGetOrder = (user: UserModel) => {
    
    return async ( dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<OrdersData>('https://ngapp-backend.herokuapp.com/order/view/customer')

            console.log(response.data)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            } else {
                dispatch({
                    type: 'ON_VIEW_ORDER',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const getOrderData = (user: UserModel, order: OrderModel) => {
    return async ( dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<OrderModel>(`https://ngapp-backend.herokuapp.com/order/detail/customer/${order.id}`)

            console.log(response.data)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            } else {
                dispatch({
                    type: 'ON_GET_ORDERDATA',
                    payload: response.data.order
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onDoneOrder = (order: OrderModel, user: UserModel ) => {
    
    return async ( dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.patch<OrderModel>(`https://ngapp-backend.herokuapp.com/order/done/${order.id}`)

            console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            } else {
                dispatch({
                    type: 'ON_DONE_ORDER',
                    payload: response.data.order
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

// export const onCancelOrder = (order: OrderModel, user: UserModel ) => {
    
//     return async ( dispatch: Dispatch<UserAction>) => {
//         try {

//             axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

//             const response = await axios.delete<[OrderModel]>(`${BASE_URL}user/order/${order.id}`)

//             console.log(response)

//             if(!response){
//                 dispatch({
//                     type: 'ON_USER_ERROR',
//                     payload: 'User Verification error'
//                 })
//             } else {
//                 dispatch({
//                     type: 'ON_CANCEL_ORDER',
//                     payload: response.data
//                 })
//             }
//         } catch (error) {
//             dispatch({
//                 type: 'ON_USER_ERROR',
//                 payload: error
//             })
//         }
//     }
// }

export const onErrorNull = () => {
    return async ( dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({
                type: 'ON_ERROR_NULL',
            })
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserLogout = () => {
    
    return async ( dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_USER_LOGOUT',
            })
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

//----------------------------------------------------------------------

//ShoppingActions
//----------------------------------------------------------------------

//availability Action
export interface AvailabilityAction{
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}

export interface MerchantGetData {
    readonly type: 'ON_GETDATA_RESTAURANT'
    payload: MerchantModel
}

export interface MerchantAntriaData {
    readonly type: 'ON_GETANTRIAN_RESTAURANT'
    payload: MerchantAntrian
}

export interface FoodSearchAction{
    readonly type: 'ON_RESTAURANTS_SEARCHS'
    payload: [Merchants]
}

export interface ShoppingErrorAction{
    readonly type: 'ON_SHOPPING_ERROR'
    payload: any
}

export type ShoppingAction =
 AvailabilityAction 
| ShoppingErrorAction 
| FoodSearchAction
| MerchantGetData
| MerchantAntriaData;

//Trigger actions from components

export const onAvailability = (user: UserModel) => {

    return async ( dispatch: Dispatch<ShoppingAction>) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.get<FoodAvailability>('https://ngapp-backend.herokuapp.com/menu/customer/main')

            console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const getMerchantData = (user: UserModel, merchant: Merchants) => {
    return async ( dispatch: Dispatch<ShoppingAction>) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.get<Merchants>(`https://ngapp-backend.herokuapp.com/menu/customer/merchant-detail/${merchant.id}`)
            

            console.log(response.data)

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                dispatch({
                    type: 'ON_GETDATA_RESTAURANT',
                    payload: response.data.merchant
                })
            }
            
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const getMerchantAntrian = (user: UserModel, merchant: Merchants) => {
    return async ( dispatch: Dispatch<ShoppingAction>) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.get<MerchantAntrian>(`https://ngapp-backend.herokuapp.com/menu/customer/merchant-detail/${merchant.id}`)
            

            console.log(response.data)

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                dispatch({
                    type: 'ON_GETANTRIAN_RESTAURANT',
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

//Trigger actions from components

export const onSearchFoods = (user: UserModel) => {
   

    return async ( dispatch: Dispatch<ShoppingAction>) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            const response = await axios.get<[Merchants]>('https://ngapp-backend.herokuapp.com/menu/customer/main')

            console.log(response)
            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                dispatch({
                    type: 'ON_RESTAURANTS_SEARCHS',
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}