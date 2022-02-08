import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';


// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Button, Portal, Card, Provider, Modal, Paragraph, ActivityIndicator, Colors } from 'react-native-paper';


// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { startAddToCart, addToCart, finishAddToCart, getProducts, getDetail } from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { numberWithThousands } from '../Utils';

const EcommerceApp = ({ products, cart, productDetail, navigation }) => {


  const loadingAll = useSelector( state => state.productsReducer.loadingAll );
  const loadingDetail = useSelector( state => state.productsReducer.loadingDetail );
  const showModal = useSelector( state => state.cartReducer.showModal );
  const [cantidad, setCantidad] =  React.useState(1);
  
  const dispatch = useDispatch();

  const showDetail = (id) => {
    setCantidad(1);
    dispatch( startAddToCart() );
    dispatch( getDetail(id) );

  }
  const hideModal = () => {

    dispatch( finishAddToCart() );
  } 
  const containerStyle = {backgroundColor: 'white', padding: 20};


  React.useEffect(() => {
    __DEV__ && console.log('hook');
        const getAmiibo = () => dispatch( getProducts() );
        getAmiibo();
  }, []);

  const handleAddToCart = (item) => {

    dispatch( addToCart(item, cantidad));
  }

  const modifyQuantity = (quantity) => {
    if (cantidad + quantity > 0) setCantidad(cantidad + quantity);
  }

  return (
    <React.Fragment>



    <View style={styles.container}>


      <View title="Card Title">

      <Button
      style={{backgroundColor: 'white'}}
      onPress={() => navigation.navigate('Cart')}>
      Mi Carrito ({cart.length})
      </Button>

      </View>
      <Spacer />

      {loadingAll ? 
        <ActivityIndicator style={{alignSelf: 'center', marginVertical: 30}} animating={true} color={Colors.deepPurple500} />

      :
      <FlatList
        data={products}
        keyExtractor={(item, index) => {
          return index;
        }}
        renderItem={({item, index}) => {
          return (
            <>
            <Card>
              <Card.Title
                title={`${item.name}`}
              />
              <Card.Content>
              <Image 
              style={{ width: 100, height: 150, alignSelf: 'center', justifyContent: 'center'}}
              source={{ uri: item.image }}></Image>
              <Paragraph>ID: {item.tail}</Paragraph>
              <Paragraph>gameSeries: {item.gameSeries}</Paragraph>
              <Paragraph>Precio: ${numberWithThousands(item.price)}</Paragraph>

              </Card.Content>


            <Button style={{marginTop: 30}} onPress={() => showDetail(item)}>
                Ver Detalles
              </Button>
            </Card>
            <Spacer />
            </>
          );
        }}
      />
}




<Provider>
<Portal>
  <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
    {loadingDetail ? 
    <Text>Loading...</Text>
    :
    <FlatList
    data={productDetail}
    keyExtractor={(item, index) => {
      return index;
    }}
    renderItem={({item, index}) => {
      return (
        <>
        <Card>
          <Card.Title
            title={`${item.name}`}
          />
          <Card.Content>
          <Image 
          style={{ width: 100, height: 150, alignSelf: 'center', justifyContent: 'center'}}
          source={{ uri: item.image }}></Image>
          <Paragraph>ID: {item.tail}</Paragraph>
          <Paragraph>gameSeries: {item.gameSeries}</Paragraph>
          <Paragraph>amiiboSeries: {item.amiiboSeries}</Paragraph>
          <Paragraph>tail: {item.tail}</Paragraph>
          <Paragraph>type: {item.type}</Paragraph>
          <Paragraph>Precio: ${numberWithThousands(item.price)}</Paragraph>
          <View style={{flexDirection: 'row'}}>
          <Paragraph>Cantidad </Paragraph>
                            <TouchableOpacity 
                            style={{
                              width: 20,
                              heigth:20,
                              borderWidth: 0.5,
                              borderColor: Colors.deepPurple500, 
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}
                          onPress={() => modifyQuantity(-1)}>
                            <Text> - </Text>
                            </TouchableOpacity>
                            <Text style={{marginHorizontal: 20, marginVertical: 5}}>{cantidad} </Text>
                            <TouchableOpacity 
                            style={{
                              width: 20,
                              heigth:20,
                              borderWidth: 0.5,
                              borderColor: Colors.deepPurple500, 
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}
                          onPress={() => modifyQuantity(+1)}>
                            <Text> + </Text>
                            </TouchableOpacity>
                            </View>



          </Card.Content>


        <Button style={{marginTop: 30}} onPress={() => handleAddToCart(item)}>
            Agregar al carrito
          </Button>
        </Card>
        <Spacer />
        </>
      );
    }}
  />
    }
  </Modal>
</Portal>

</Provider>
    </View>

</React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.productsReducer.products,
    productDetail: state.productsReducer.productDetail,
    cart: state.cartReducer.cart,
  }
}



export default connect(
  mapStateToProps
)(EcommerceApp)
