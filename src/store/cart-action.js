import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


//"Action creator" para traer la data
export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-redux-http-39400-default-rtdb.firebaseio.com/cart.json'
      );
      
      if(!response.ok) {
        throw new Error('Could not fetch Cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      //dispatch(cartActions.replaceCart(cartData)); //Error al intentar volver a agregar item despues de elimitar todos los items del cart
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }));
    } catch(error) {
      dispatch(
        uiActions.showNotification({
          status:'error',
          title: 'Error!',
          message: 'Fetching cart data failed!'
        })
      );
    };

  };
};


//"Action creator personalizado" antes no hicimos esto porque Redux toolkit realiza esto automaticamente
export const sendCartData = (cart) => {
  //En este caso no necesitamos escribir "action creator" tan simple (return action object) pero encambio necesitamos uno que retorne otra funcion
  //return {type: '', payload: } //Action object
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
      status:'pending',
      title: 'Sending ...',
      message: 'Sending cart data!'
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-redux-http-39400-default-rtdb.firebaseio.com/cart.json', 
        { 
          method: 'PUT', 
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          }),
        }
      );
  
      if(!response.ok) {
        throw new Error('Sending cart data failed')
      };
    };
    
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
        status:'success',
        title: 'Success!',
        message: 'Sending cart data successfully!'
        })
      );
    } catch (error) {
      dispatch(uiActions.showNotification({
        status:'error',
        title: 'Error!',
        message: 'Sent cart data failed!'
      }));
    }
  }
};