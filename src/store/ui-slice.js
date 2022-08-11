import { createSlice } from "@reduxjs/toolkit";

//Configuracion como object para dar un nombre unico al segmento y configurar el estado inicial.
const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartIsVisible: false, notification: null },
  //Diferentes acciones que queremos manejar con ese reductor
  reducers: { 
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible
    },
    showNotification(state, action) {
      state.notification = { 
        status: action.payload.status, 
        title: action.payload.title,
        message: action.payload.message
      };
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;