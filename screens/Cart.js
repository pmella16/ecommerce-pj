import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, FlatList, Image, View} from 'react-native';
import { connect } from 'react-redux';
import { Title, Portal, Card, Colors, Button, Paragraph } from 'react-native-paper';

import {deleteProduct, plusQuantity, minusQuantity } from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { numberWithThousands } from '../Utils';

const Cart = ({cart, total, navigation}) => {


        const dispatch = useDispatch();

        const handleRemoveProduct = (item) => {

            dispatch( deleteProduct(item) );
          }
        const plusButton = (item) => {
            dispatch( plusQuantity(item) );
          }
        const minusButton = (item) => {

          if (item.quantity > 1){
            dispatch( minusQuantity(item) );
          } else {  
            dispatch( deleteProduct(item) );
          }
          }
    return (
        <View style={{marginBottom: 80}}>
<Title style={{ color: Colors.deepPurple500}}> Total: $ {numberWithThousands(total)}</Title>

            
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id}
                    renderItem={({item, index}) => {
                    return (
               <View style={{marginBottom: 50}}>

   
                            <View style={{flexDirection: 'row'}}>
                      
                            <Image 
                            style={{ width: 100, height: 150, margin: 10}}
                            source={{ uri: item.image }}></Image>
                        
                        <View  style={{ margin: 10}}>
                            <Paragraph>Nombre: {item.name}</Paragraph>
                            <Paragraph>ID: {item.tail}</Paragraph>
                            <Paragraph>gameSeries: {item.gameSeries}</Paragraph>
                            <Paragraph>Precio: ${numberWithThousands(item.price)}</Paragraph>
                            <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                            style={{
                              width: 20,
                              heigth:20,
                              borderWidth: 0.5,
                              borderColor: Colors.deepPurple500, 
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}
                          onPress={() => minusButton(item)}>
                            <Text> - </Text>
                            </TouchableOpacity>
                            <Text style={{marginHorizontal: 20}}> {item.quantity} </Text>
                            <TouchableOpacity 
                            style={{
                              width: 20,
                              heigth:20,
                              borderWidth: 0.5,
                              borderColor: Colors.deepPurple500, 
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}
                          onPress={() => plusButton(item)}>
                            <Text> + </Text>
                            </TouchableOpacity>
                            </View>
                            <Button
                            style={{ backgroundColor: 'white', width: 100, marginTop: 10 }}
                            onPress={() => handleRemoveProduct(item)}>
                                    Borrar
                          </Button>
                        </View>
                            
                        </View>

                                </View>
                    );
                    }}
                />
       
{cart.length > 0 ?
       <Button
       style={{backgroundColor: 'white'}}
       onPress={() => navigation.navigate('CheckOut')}>
                                    Checkout
      </Button>
      :
      <>
      <Title style={{alignSelf: 'center', marginVertical: 30, color: Colors.deepPurple500}}>No tienes productos en el carrito</Title>
      <Button
      style={{backgroundColor: 'white', width: 200, alignSelf: 'center'}}
      onPress={() => navigation.navigate('Home')}>
                                   Ver catálogo
     </Button>
     </>
}
</View>
)};

const mapStateToProps = (state, ownProps) => {
    return {
      cart: state.cartReducer.cart,
      total: state.cartReducer.total,
    }
  }
  
  
  export default connect(
    mapStateToProps
  )(Cart)