import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { FoodModel } from '../../../redux'
import { useTheme } from '@react-navigation/native'
import ButtonAddRemove from '../ButtonAddRemove';
import { colors as constantColors } from '../../../constant'


interface FoodCardProps{
    item: FoodModel;
    onTap: Function;
    onUpdateCart: Function;
    unit?: number | undefined;
}

const FoodCards: React.FC<FoodCardProps> = ({ item, onTap, onUpdateCart, unit }) => {
    const { colors } = useTheme();

    const didUpdateCart = (unit: number) => {
        item.unit = unit;
        onUpdateCart(item)
        // call some action to updateCart

    }

    return (
        <View style={[styles.container, {backgroundColor:colors.background}]}>
          <Image source={{ uri: `data:image/jpeg;base64,${item.image}`}} style={styles.foodImg}/>
          <TouchableOpacity onPress={() => onTap(item)} style={styles.button}>
              <View style={styles.foodTextContainer}>
                  <Text style={{color: constantColors.default, fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                  <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>{item.category}</Text>
                  
              </View>
              <View style= {styles.foodPriceContainer}>
                  <Text style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: constantColors.default
                  }}>Rp. {item.price}
                  </Text>
                  {unit !== undefined ?
                    <Text style={{ fontSize:20, fontWeight:'bold', color: constantColors.default }}> Qty: {unit}</Text> 
                    :
                    <ButtonAddRemove onAdd={() => {
                        let unit = isNaN(item.unit) ? 0 : item.unit;
                        didUpdateCart(unit + 1);
                    }} 
                    onRemove={() => {
                      let unit = isNaN(item.unit) ? 0 : item.unit;
                      didUpdateCart(unit > 0 ? unit - 1 : unit);
                    }} unit={item.unit} />
                  }
              </View>
          </TouchableOpacity>
        </View>
    )
}

export default FoodCards

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get('screen').width-20,
        margin: 10,
        borderRadius: 20,
        height: 104,
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderColor: constantColors.default,
        flexDirection: 'row'
    },
    foodImg:{
        width: 100,
        height: 100,
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
        padding:10,
        paddingTop: 15
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
