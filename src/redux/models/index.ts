import { LocationGeocodedAddress } from 'expo-location'

//food model
export interface FoodModel{
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    ready_time: number;
    image: string;
    unit: number;
    merchants: Merchants;
}



//Restaurant Model
export interface Merchants{
    id: number;
    name: string;
    food_type: string;
    address: string;
    phone_number: string;
    account_number: string;
    image: string;
    products: [FoodModel];
    merchant: MerchantModel
    antrian: number
}

export interface MerchantModel{
    id: number;
    name: string;
    food_type: string;
    address: string;
    phone_number: string;
    account_number: string;
    image: string;
    products: [FoodModel];
    antrian: number;
}

export interface FoodAvailability{
    //categories: [Category];
    merchants: [Merchants];
    //foods: [FoodModel];
}

export interface MerchantAntrian {
    merchantantrian: Merchants;
    antrian: number
}

//todo: Modify later
//User Model
export interface UserModel{
    id:number
    first_name: string;
    last_name: string;
    password: string;
    phone_number: string;
    email: string;
    //verified: boolean;
    image: string
    token: string;
    user:Customer
}

export interface Customer{
    created_at: number;
    customer: CustomerModel;
    email: string;
    password: string;
    user_role: string;
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    image: string;
    account_name: string;
}

export interface CustomerModel{
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    image: string;
    account_name: string;
}

export interface UserState{
    user: UserModel;
    customer: Customer;
    location: LocationGeocodedAddress;
    error: string | undefined;
    Cart: [FoodModel];
    ordersmenu: OrdersData;
    orderData: OrderModel
}

//ShoppingState
export interface ShoppingState{
    mainmenu: FoodAvailability,
    availableRestaurants: [Merchants],
    merchantData : Merchants,
    merchantAntrianData: MerchantAntrian
    //other models
}


export interface CartModel {
    id: number;
    food: FoodModel;
    unit: number;
}

export interface OrdersData {
    orders: [OrderModel]
}

export interface OrderModel{
    id: number;
    order_date: number;
    order_type: string;
    total_price: number;
    order_status: string;
    paid_thru: string;
    payment_status: string;
    unit: [number]
    customer: CustomerModel;
    merchant: Merchants
    products: [FoodModel];   
    
    pickup_time: string;
    error: string;
    message: string;
    
    order: Order
    history: History
}

export interface Order{
    id: number;
    products: [CartModel];
    total_price: number;
    order_date: number;
    paid_thru: string;
    payment_status: string;
    order_type: string;
    pickup_time: string;
    order_status: string;
    customer: CustomerModel;
    merchant: Merchants
}

export interface History{
    id: number;
    products: [CartModel];
    total_price: number;
    order_date: number;
    paid_thru: string;
    payment_status: string;
    order_type: string;
    pickup_time: string;
    order_status: string;
    customer: CustomerModel;
    merchant: Merchants
}