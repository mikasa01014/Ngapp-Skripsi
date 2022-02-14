import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Category } from '../../../redux'
import { useTheme } from '@react-navigation/native'

interface CategoryProps{
    item: Category;
    onTap: Function
}

const CategoryCards: React.FC<CategoryProps> = ({ item, onTap }) => {
    const { colors } = useTheme();
    
    return (
       <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
           <Image source={{uri: `${item.icon}`}} style={{
               width: 110,
               height: 110,
               borderRadius: 20,
               backgroundColor: colors.background
           }}/>
           <Text style={{
               fontSize: 14,
               marginTop: 8,
               color: colors.text,
           }}> {item.title} </Text>
       </TouchableOpacity>
    )
}

export default CategoryCards

const styles = StyleSheet.create({
    container:{
        width: 110,
        height:130,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 5
    }
})
