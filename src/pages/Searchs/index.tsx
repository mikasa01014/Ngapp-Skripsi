import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, 
    ShoppingState, 
    UserState, 
    Merchants 
} from '../../redux'
import { useNavigation } from '@react-navigation/native';


import SearchBars from '../../components/atom/SearchBars'
import { FlatList } from 'react-native-gesture-handler';
import RestaurantCards2 from '../../components/atom/RestaurantCard2';

interface SearchPageProps{
    UserReducer: UserState,
    ShoppingReducer: ShoppingState,
    onUpdateCart: Function
}

const _Searchs: React.FC<SearchPageProps> = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const navigation = useNavigation();

    const { availableRestaurants, mainmenu } = props.ShoppingReducer
    const { merchants } = mainmenu

    const onTapRestaurant = ( item: Merchants ) =>{
        navigation.navigate('Restaurants', {
            screen: 'Restaurants',
            params: {merchants: item}
        })
    }

    const { Cart } = props.UserReducer;

    return (
        <View style={styles.container}>
            <View style={styles.navigations} >
                <View style={styles.searchBar}>
                    <SearchBars 
                        onTextChange={setKeyword}
                        onEndEditing={() => setIsEditing(false)}
                        didTouch={() => setIsEditing(true)}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={
                        isEditing 
                        ?
                        merchants.filter((item) => {
                            //return item.name.includes(keyword)
                            return item.name.toLowerCase().includes(keyword)
                        })
                        : merchants
                        
                    }
                    renderItem={({ item }) => 
                    <RestaurantCards2 
                        item={item} onTap={onTapRestaurant}/>
                }
                    keyExtractor={(item) => `${item.id}`}
                />
            </View>
        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    ShoppingReducer: state.ShoppingReducer,
    UserReducer: state.UserReducer
})

const Searchs = connect(mapToStateProps, {  })(_Searchs)

export default Searchs

const styles = StyleSheet.create({
    container:{
        flex: 3,
    },
    navigations:{
        flex: 1,
        paddingTop:10,
    },
    searchBar:{
        flex:9,
        display: 'flex',
        height: 60,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4
    },
    body:{
        flex:10,
    }
})
