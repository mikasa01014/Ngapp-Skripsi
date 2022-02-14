import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { FoodModel, Restaurant } from '../../../redux'
import { useTheme } from '@react-navigation/native'
import { colors as constantColors } from '../../../constant'

const screenWidth = Dimensions.get('screen').width

interface RestaurantProps{
    item: FoodModel;
    onTap: Function
}

const RestaurantCards: React.FC<RestaurantProps> = ({ item, onTap }) => {
    const { colors } = useTheme();
    const theme = useTheme();
    
    return (
       <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
           <Image source={{uri: `${item.images[0]}`}} style={{
               width: screenWidth - 25,
               height: 160,
               borderRadius: 20,
               backgroundColor: colors.background,
               marginTop: 5
           }}/>
           <Text style={{ fontSize: 18, fontWeight: 'bold', color: constantColors.default}}>{item.name}</Text>
           <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text}}>{item.category}</Text>
           <Text style={{ fontSize: 16, fontWeight: '700', color: constantColors.default}}>${item.price}</Text>       
       </TouchableOpacity>
    )
}

export default RestaurantCards

const styles = StyleSheet.create({
    container:{
        width: screenWidth-20,
        height:235,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: constantColors.default
    },
})
