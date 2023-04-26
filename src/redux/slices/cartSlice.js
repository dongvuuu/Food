import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);

            state.totalQuantity++

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }

            else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0
            );

        },
        minusItem: (state, action) => {
            // const id = action.payload
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            // const oldItem = state.cartItems.find((i) => i.id == newItem.id)


            if (existingItem.quantity == 1) {

                const existingItem = state.cartItems.find(item => item.id === newItem.id)

                if (existingItem) {
                    state.cartItems = state.cartItems.filter(item => item.id !== newItem.id)
                    state.totalQuantity = state.totalQuantity - existingItem.quantity
                }

                state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0
                );
            }
            else {
                state.totalQuantity--

                if (!existingItem) {
                    // state.totalQuantity--

                    state.cartItems.push({
                        id: newItem.id,
                        productName: newItem.productName,
                        imgUrl: newItem.imgUrl,
                        price: newItem.price,
                        quantity: existingItem.quantity--,
                        totalPrice: newItem.price
                    })
                    // state.totalQuantity--
                } else {
                    existingItem.quantity--
                    existingItem.totalPrice = Number(existingItem.totalPrice) - Number(newItem.price)
                }

            }
            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0
            );
        },
        deleteItem: (state, action) => {
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)

            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity

            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0
            );
        },
    },



});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;