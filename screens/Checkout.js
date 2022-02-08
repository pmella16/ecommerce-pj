import React from 'react';
import {SafeAreaView, Text, TouchableHighlight, FlatList, Image, View} from 'react-native';
import { connect } from 'react-redux';
import { Title, Portal, Card, Provider, Button, Paragraph } from 'react-native-paper';

import {deleteProduct, plusQuantity, minusQuantity } from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { numberWithThousands } from '../Utils';

const CheckOut = ({cart, total, navigation}) => {

        console.log(cart);

    return (
        <View style={{marginBottom: 50}}>

                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id}
                    renderItem={({item, index}) => {
                    return (
               <View style={{marginBottom: 50}}>

   
                            <View style={{flexDirection: 'row'}}>
                      
                            <Image 
                            style={{ width: 40, height: 65, margin: 10}}
                            source={{ uri: item.image }}></Image>
                        
                        <View  style={{ margin: 10}}>
                            <Paragraph>Nombre: {item.name}</Paragraph>
                            <Paragraph>Precio: ${numberWithThousands(item.price)}</Paragraph>
                            <Paragraph>Cantidad: {item.quantity}</Paragraph>
                            <Paragraph>Total: ${numberWithThousands(item.quantity * item.price)}</Paragraph>


                        </View>
                            
                        </View>

                                </View>
                    );
                    }}
                />
       

       <Button
       style={{backgroundColor: 'white'}}
       onPress={() => alert('pagar')}>
                                    Pagar total (${numberWithThousands(total)})
                                </Button>

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
  )(CheckOut)