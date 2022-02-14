import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { SearchLogo } from '../../../assets'
import { colors as constantColors } from '../../../constant'

interface SearchBarProps{
    onEndEditing?: any | undefined;
    didTouch?: any | undefined;
    autoFocus?: boolean | undefined;
    onTextChange: Function;
}

const SearchBars: React.FC<SearchBarProps> = 
    ({ onEndEditing, didTouch, autoFocus=false, onTextChange}) => 
        {
            var searchIcon = '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'
            return (
                <View style={styles.container}>
                   <View style={styles.searchBar}>
                        <Image style={{width: 25, height: 25}} source={{uri: `data:image/png;base64,${searchIcon}`}}/>
                        <TextInput 
                            style={{
                                marginLeft: 5, flex: 8, display: 'flex', fontSize: 20, height: 45
                            }}
                            placeholder='Search Restaurants'
                            autoFocus={autoFocus}
                            onTouchStart={didTouch}
                            onChangeText={(text) => onTextChange(text)}
                            onEndEditing= {onEndEditing}
                        />
                   </View>
                </View>
            )
        }

export default SearchBars

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    searchBar:{
        display:'flex',
        height: 30,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: constantColors.light,
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: constantColors.dark,
        borderWidth: 2
    }
})
