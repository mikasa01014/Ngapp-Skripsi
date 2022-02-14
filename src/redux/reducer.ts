import { LocationGeocodedAddress } from "expo-location";
import { combineReducers } from "redux";
import { UserAction, ShoppingAction } from './action'
import { UserState, UserModel, FoodAvailability, ShoppingState, FoodModel, OrderModel, Merchants, CustomerModel, MerchantModel, Customer, OrdersData, MerchantAntrian } from './models'


//REGISTER
const initialStateRegister = {
    data:{
        first_name: '',
        last_name:'',
        email: '',
        password: '',
        phone_number: '',
        check_textInputChange: false,
        check_lastNameInputChange: false,
        check_userInputChange: false,
        check_emailInputChange: false,
        check_phoneInputChange: false,
        secureTextEntry: true,
        confrim_securityTextEntry:true,
        isValidUser: true,
        isValidName: true,
        isValidLastName: true,
        isValidEmail:true,
        isValidPassword: true,
        isValidCPassword:true,
        isValidPhone:true,

    },
};

const RegisterReducer = (state = initialStateRegister, action) => {
    //firstname
    if (action.type === 'SET_NAME_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                first_name: action.inputValue,
                check_textInputChange: true,
                isValidName:true
            },
        };
    }
    if (action.type === 'SET_NAME_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                first_name: action.inputValue,
                check_textInputChange: false,
                isValidName:false
            },
        }
    }
    //lastname
    if (action.type === 'SET_LASTNAME_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                last_name: action.inputValue,
                check_lastNameInputChange: true,
                isValidLastName:true
            },
        };
    }
    if (action.type === 'SET_LASTNAME_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                last_name: action.inputValue,
                check_lastNameInputChange: false,
                isValidLastName:false
            },
        }
    }
    //email
    if (action.type === 'SET_EMAIL_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                email: action.inputValue,
                check_emailInputChange: true,
                isValidEmail:true
            },
        };
    }
    if (action.type === 'SET_EMAIL_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                email: action.inputValue,
                check_emailInputChange: false,
                isValidEmail:false
            },
        }
    }
    //user
    if (action.type === 'SET_USERR_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                username: action.inputValue,
                check_userInputChange: true,
                isValidUser:true
            },
        };
    }
    if (action.type === 'SET_USERR_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                username: action.inputValue,
                check_textInputChange: false,
                isValidUser:false
            },
        }
    }
    //phone
    if (action.type === 'SET_PHONE_TRUE') {
        return {
            ...state,
            data:{
                ...state.data,
                phone_number: action.inputValue,
                check_phoneInputChange: true,
                isValidPhone:true
            },
        };
    }
    if (action.type === 'SET_PHONE_FALSE') {
        return{
            ...state,
            data:{
                ...state.data,
                phone_number: action.inputValue,
                check_phoneInputChange: false,
                isValidPhone: false
            },
        }
    }
    //password
    if (action.type === 'SET_PASSWORDR_TRUE'){
        return {
            ...state,
            data:{
                ...state.data,
                password: action.inputValue,
                isValidPassword: true
            }
        }
    }
    if(action.type === 'SET_PASSWORDR_FALSE'){
        return {
            ...state,
            data:{
                ...state.data,
                password: action.inputValue,
                isValidPassword: false
            }
        }
    }
    if(action.type === 'SET_PASSWORDR_VISIBLE'){
        return {
            ...state,
            data:{
                ...state.data,
                secureTextEntry: !state.data.secureTextEntry,
            }
        }
    }
    //confirm password
    if (action.type === 'SET_CPASSWORD_TRUE'){
        return {
            ...state,
            data:{
                ...state.data,
                confirm_password: action.inputValue,
                isValidCPassword: true
            }
        }
    }
    if(action.type === 'SET_CPASSWORD_FALSE'){
        return {
            ...state,
            data:{
                ...state.data,
                confirm_password: action.inputValue,
                isValidCPassword: false
            }
        }
    }
    if(action.type === 'SET_CPASSWORD_VISIBLE'){
        return {
            ...state,
            data:{
                ...state.data,
                confrim_securityTextEntry: !state.data.confrim_securityTextEntry,
            }
        }
    }

    if(action.type === 'SET_ISVALIDUSERR_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidUser: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDUSERR_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidUser: false
                }
        }
    }
    if(action.type === 'SET_ISVALIDNAME_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidName: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDNAME_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidName: false
                }
        }
    }
    if(action.type === 'SET_ISVALIDLASTNAME_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidLastName: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDLASTNAME_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidLastName: false
                }
        }
    }
    if(action.type === 'SET_ISVALIDEMAIL_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidEmail: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDEMAIL_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidEmail: false
                }
        }
    }
    if(action.type === 'SET_ISVALIDPHONE_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidPhone: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDPHONE_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidPhone: false
                }
        }
    }

    return state;
};

//LOGIN
const initialStateLogin = {
    data:{
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    },
};

const LoginReducer = (state = initialStateLogin, action) => {
    //user
    if (action.type === 'SET_USER_TRUE'){
        return {
            ...state,
            data:{
                ...state.data,
                email: action.inputValue,
                check_textInputChange:true,
                isValidUser: true
            }
        }
    }
    if(action.type === 'SET_USER_FALSE'){
        return {
            ...state,
            data:{
                ...state.data,
                email: action.inputValue,
                check_textInputChange:false,
                isValidUser: false
            }
        }
    }
    //password
    if (action.type === 'SET_PASSWORD_TRUE'){
        return {
            ...state,
            data:{
                ...state.data,
                password: action.inputValue,
                isValidPassword: true
            }
        }
    }
    if(action.type === 'SET_PASSWORD_FALSE'){
        return {
            ...state,
            data:{
                ...state.data,
                password: action.inputValue,
                isValidPassword: false
            }
        }
    }
    if(action.type === 'SET_PASSWORD_VISIBLE'){
        return {
            ...state,
            data:{
                ...state.data,
                secureTextEntry: !state.data.secureTextEntry,
            }
        }
    }

    if(action.type === 'SET_ISVALIDUSER_TRUE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidUser: true
                }
        }
    }
    if(action.type === 'SET_ISVALIDUSER_FALSE'){
        return {
            ...state,
                data:{
                    ...state.data,
                    isValidUser: false
                }
        }
    }

    return state;
};

//LoginAuth
const initialStateLoginAuth = {
        isLoading: true,
        userName: null,
        userToken: null,
};
const LoginAuthReducer = (state = initialStateLoginAuth, action) => {
    if (action.type === 'RETRIEVE_TOKEN'){
        return {
            ...state,
            userToken: action.token,
            isLoading: false
        }
    }
    if (action.type === 'LOGIN'){
        return {
            ...state,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
        }
    }
    if (action.type === 'LOGOUT'){
        return {
            ...state,
            userName: null,
            userToken: null,
            isLoading: false,
        }
    }
    if (action.type === 'REGISTER'){
        return {
            ...state,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
        }
    }
    return state;
};
//-----------------------------------------------------------------------
//userReducer
const initialStateUser: UserState = {
    user: {} as UserModel,
    customer: {} as Customer,
    location: {} as LocationGeocodedAddress,
    error: {} as string,
    Cart: {} as [FoodModel],
    ordersmenu: {} as OrdersData,
    orderData: {} as OrderModel

}

const UserReducer = (state: UserState = initialStateUser, action: UserAction) => {
    switch(action.type){
        case 'ON_UPDATE_LOCATION' :
            return{
                ...state,
                location: action.payload
            }
        case 'ON_UPDATE_CART' : 
           if(!Array.isArray(state.Cart)){
               return{
                   ...state,
                   Cart: [action.payload]
               }
           }

           const existingFoods = state.Cart.filter(item => item.id === action.payload.id)

           if(existingFoods.length > 0) {
            let updateCart = state.Cart.map((food) => {
                if(food.id === action.payload.id){
                    food.unit = action.payload.unit
                }

                return food;
            })

            return {
                ...state,
                Cart: updateCart.filter(item => item.unit > 0)
            }

           } else {
               return{
                   ...state,
                   Cart: [...state.Cart, action.payload]
               }
           }
        case 'ON_USER_LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'ON_USER_LOGOUT':
            return{
                ...state,
                user: {} as UserModel
            }
        case 'ON_CREATE_ORDER':
            if(!Array.isArray(state.ordersmenu)){
                return{
                    ...state,
                    Cart: [],
                    ordersmenu: [action.payload],
                }
            } else{
                return{
                    ...state,
                    Cart: [],
                    ordersmenu: [...state.ordersmenu, action.payload],
                }
            }
        case 'ON_VIEW_ORDER':
            return{
                ...state,
                ordersmenu: action.payload
            }
        case 'ON_USER_GETDATA':
            return{
                ...state,
                customer: action.payload
            }
        case 'ON_GET_ORDERDATA':
            return{
                ...state,
                orderData: action.payload
            }
        case 'ON_DONE_ORDER':
            return{
                ...state,
                orderData: action.payload
            }
        case 'ON_USER_ERROR' : 
            return{
                ...state,
                error: action.payload
            }
        case 'ON_ERROR_NULL' :
            return{
                ...state,
                error: {} as string
            }
        default:
            return state;
    }
}

//shoppingReducer

const initialStateShopping ={
    mainmenu:{} as FoodAvailability,
    availableRestaurants:{} as [Merchants],
    merchantData: {} as Merchants,
    merchantAntrianData:{} as MerchantAntrian
}

const ShoppingReducer = (state: ShoppingState = initialStateShopping, action: ShoppingAction) => {
    switch(action.type){
        case 'ON_AVAILABILITY':
            return {
                ...state,
                mainmenu: action.payload
            }
        case 'ON_RESTAURANTS_SEARCHS':
            return {
                ...state,
                availableFoods: action.payload
            } 
        case 'ON_GETDATA_RESTAURANT': 
            return {
                ...state,
                merchantData: action.payload
            }
        case 'ON_GETANTRIAN_RESTAURANT' :
            return {
                ...state,
                merchantAntrianData: action.payload
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    RegisterReducer,
    LoginReducer,
    LoginAuthReducer,
    UserReducer,
    ShoppingReducer
});


export type ApplicationState = ReturnType<typeof reducer>

export default reducer;