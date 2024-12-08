import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
import {Product} from "@/models/Product";
import {isEqual} from "lodash";

export interface CartState {
    cartArr: Product[],
    cartTotalQuantity: number,
    cartTotalAmount: number
}

interface ChangeQuantityPayload {
    product: Product;
    quantity: number;
}

const calculateCartSummary = (cartArr: Product[]) => {
    const totalQuantity = cartArr.reduce((total, product) => total + product.quantity, 0);
    const totalAmount = cartArr.reduce((total, product) => total + product.price * product.quantity, 0);
    return { totalQuantity, totalAmount };
};

const initialState: CartState = {
    cartArr:
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("cartProduct") as string) || []
            : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const productIndex = state.cartArr.findIndex((products) =>
                products._id === action.payload._id && isEqual(products.option, action.payload.option)
            )
            if (productIndex >= 0) {
                state.cartArr[productIndex].quantity += action.payload.quantity;
                toast.success(`Increased product quantity`, {
                    position: "bottom-left"
                })
            } else {
                state.cartArr.push(action.payload)
                toast.success(`Add product to cart`, {
                    position: "bottom-left"
                })
            }

            const { totalQuantity, totalAmount } = calculateCartSummary(state.cartArr);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem("cartProduct", JSON.stringify(state.cartArr));
        },
        decrementQuantity: (state, action: PayloadAction<Product>) => {
            const productIndex = state.cartArr.findIndex(
                (product) => product.id === action.payload._id && isEqual(product.option, action.payload.option)
            );

            if (productIndex >= 0) {
                const product = state.cartArr[productIndex];
                if (product.quantity === 1) {
                    state.cartArr.splice(productIndex, 1);
                    toast.error(`Removed product from cart`, {
                        position: "bottom-left"
                    });
                } else {
                    product.quantity -= 1;
                }
            }

            const { totalQuantity, totalAmount } = calculateCartSummary(state.cartArr);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem("cartProduct", JSON.stringify(state.cartArr));
        },
        incrementQuantity: (state, action: PayloadAction<Product>) => {
            const productIndex = state.cartArr.findIndex(
                (product) => product.id === action.payload._id && isEqual(product.option, action.payload.option)
            );

            if (productIndex >= 0) {
                const product = state.cartArr[productIndex];
                product.quantity += 1;
            }

            const { totalQuantity, totalAmount } = calculateCartSummary(state.cartArr);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem('cartProduct', JSON.stringify(state.cartArr));
        },
        changeQuantity: (state, action: PayloadAction<ChangeQuantityPayload>) => {
            const {product, quantity} = action.payload;

            const productIndex = state.cartArr.findIndex(
                (cartProduct) =>
                    cartProduct._id === product._id && isEqual(cartProduct.option, product.option)
            );

            if (productIndex >= 0) {
                const cartProduct = state.cartArr[productIndex];

                if (quantity === 0) {
                    state.cartArr.splice(productIndex, 1); // Xóa sản phẩm nếu số lượng bằng 0
                    toast.error("Removed product from cart", {position: "bottom-left"});
                } else {
                    cartProduct.quantity = quantity; // Cập nhật số lượng sản phẩm
                }
            }

            const { totalQuantity, totalAmount } = calculateCartSummary(state.cartArr);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem("cartProduct", JSON.stringify(state.cartArr));
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            const updatedCartArr = state.cartArr.filter(
                (product) => product._id !== action.payload._id && isEqual(product.option, action.payload.option)
            );
            state.cartArr = updatedCartArr;

            toast.error(`Remove product to cart`, {
                position: "bottom-left"
            });

            const { totalQuantity, totalAmount } = calculateCartSummary(state.cartArr);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem("cartProduct", JSON.stringify(state.cartArr));
        },
    }
});

const cartReducer = cartSlice.reducer;
export const {
    addProduct,
    decrementQuantity,
    incrementQuantity,
    changeQuantity,
    removeProduct
} = cartSlice.actions;
export default cartReducer;