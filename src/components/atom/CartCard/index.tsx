import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { FoodModel } from '../../../redux'
import { useTheme } from '@react-navigation/native'
import ButtonAddRemove from '../ButtonAddRemove';
import { colors as constantColors } from '../../../constant'


interface CartCardProps{
    item: FoodModel;
    onTap: Function;
    onUpdateCart: Function;
}

const CartCards: React.FC<CartCardProps> = ({ item, onTap, onUpdateCart }) => {
    const { colors } = useTheme();

    const didUpdateCart = (unit: number) => {
        item.unit = unit;
        onUpdateCart(item)
        // call some action to updateCart

    }

    return (
        <View style={[styles.container, {backgroundColor:colors.background}]}>
          <View style={styles.button}>
              <View style={styles.foodTextContainer}>
                  <Text style={[styles.itemName, {color: colors.text}]}>{item.name}</Text>
                  <Text style={{color: colors.text, fontWeight: '400'}}>{item.category}</Text>
              </View>
              <View style= {styles.foodPriceContainer}>
                  <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: constantColors.default,
                      marginBottom: 12
                  }}>Rp. {item.price}
                  </Text>
                  <ButtonAddRemove onAdd={() => {
                      let unit = isNaN(item.unit) ? 0 : item.unit;
                      didUpdateCart(unit + 1);
                  }} 
                  onRemove={() => {
                    let unit = isNaN(item.unit) ? 0 : item.unit;
                    didUpdateCart(unit > 0 ? unit - 1 : unit);
                  }} unit={item.unit} />
              </View>
          </View>
        </View>
    )
}

export default CartCards

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get('screen').width-20,
        margin: 10,
        borderRadius: 20,
        height: 100,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: constantColors.default,
        flexDirection: 'row'
    },
    itemName: {
        fontSize: 21,
        fontWeight: '700'
    },
    button:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    foodTextContainer:{
        display: 'flex',
        flex: 7,
        padding:10,
        paddingLeft: 15,
    },
    foodPriceContainer:{
        display: 'flex',
        flex: 4,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center' ,
        marginRight: 5, 
    }
})
