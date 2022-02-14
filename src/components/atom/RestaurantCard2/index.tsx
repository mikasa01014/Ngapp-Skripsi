import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { Merchants } from '../../../redux'
import { useTheme } from '@react-navigation/native'
import ButtonAddRemove from '../ButtonAddRemove';
import { colors as constantColors } from '../../../constant'


interface RestaurantCardProps{
    item: Merchants;
    onTap: Function
}

const RestaurantCards2: React.FC<RestaurantCardProps> = ({ item, onTap }) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, {backgroundColor:colors.background}]}>
          <Image source={{ uri: `data:image/jpeg;base64,${item.image}`}} style={styles.foodImg}/>
          <TouchableOpacity onPress={() => onTap(item)} style={styles.button}>
              <View style={styles.foodTextContainer}>
                  <Text style={{color: constantColors.default, fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                  <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>{item.address} {item.phone_number}</Text>
              </View>
          </TouchableOpacity>
        </View>
    )
}

export default RestaurantCards2

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get('screen').width-20,
        margin: 10,
        borderRadius: 20,
        height: 113,
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderColor: constantColors.default,
        flexDirection: 'row'
    },
    foodImg:{
        width: 110,
        height: 110,
        borderRadius: 20,
    },
    button:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    foodTextContainer:{
        display: 'flex',
        flex: 7,
        paddingLeft:10,
        paddingBottom: 10,
        justifyContent: 'center'
    },
})
