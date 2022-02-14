import React, {useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View, ImageBackground } from 'react-native'
import { ApplicationState, FoodModel, onUpdateCart, UserState } from '../../redux'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import FoodCards from '../../components/atom/FoodCard'
import { connect } from 'react-redux'
import { checkExistance } from '../../util'
import {colors as constantColors} from '../../constant'
import { useTheme } from '@react-navigation/native'


interface FoodDetailProps{
    UserReducer: UserState,
    onUpdateCart: Function,
    route: RouteProp<{ params: {food: FoodModel} }, 'params'>
}

const _FoodDetails: React.FC<FoodDetailProps> = (props) => {
    const { food } = props.route.params;

    console.log(food)

    const { colors } = useTheme();

    const navigation = useNavigation();

    const { Cart } = props.UserReducer

    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <ImageBackground 
                    source={{ uri : `data:image/jpeg;base64,${food.image}`}}
                    style={styles.background}
                >
                    <View style={styles.textBackground}>
                        <Text style={{ 
                            color: 'white', 
                            fontSize: 35,
                            fontWeight: '700',
                            textAlign: 'center'
                        }}> {food.name}</Text>
                        <Text style={{ 
                            color: 'white', 
                            fontSize: 25,
                            fontWeight: '500',
                            textAlign: 'center'
                        }}> {food.category}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.description}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: constantColors.default}}>{food.description}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text}}>Food will be ready within {food.ready_time} minute(s)</Text>
                </View>
            </View>
            <View style={{height:123}}>
                <FoodCards 
                    item={checkExistance(food, Cart)} 
                    onTap={() =>{}}
                    onUpdateCart={props.onUpdateCart}
                />
            </View>
        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    ShoppingReducer: state.ShoppingReducer,
    UserReducer: state.UserReducer
})

const FoodDetails = connect(mapToStateProps, { onUpdateCart })(_FoodDetails)


export default FoodDetails

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    body:{
        flex: 11,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    background:{
        width: Dimensions.get('screen').width,
        height: 250,
        justifyContent: 'flex-end',
    },
    textBackground:{
        height: 110,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
    },
    description:{
        display: 'flex',
        height: 300,
        padding: 15,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    readyTime:{
        display: 'flex',
        height: 300,
        padding: 15,
        alignItems: 'center',
        //justifyContent: 'center'
    }

})
