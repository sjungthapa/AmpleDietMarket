import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';

const Cart = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory(); // Use useHistory instead of useNavigate

    const { cartItems } = useSelector(state => state.cart);
    const idAuthenticated = useSelector((state) => state.auth.idAuthenticated); 

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) {
            alert.error('Maximum quantity reached');
            return;
        }

        dispatch(addItemToCart(id, newQty));
    };

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;

        if (newQty <= 0) {
            alert.error('Minimum quantity reached');
            return;
        }

        dispatch(addItemToCart(id, newQty));
    };

    const checkoutHandler = () => {
        if (idAuthenticated) {
            history.push("/shipping"); // Redirect to shipping page if user is authenticated
          } else {
            history.push("/login?redirect=shipping"); // Redirect to login page if user is not authenticated
          }
        };

    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ? (
                <h2 className='mt-5'> Your Cart is Empty </h2>
            ) : (
                <div>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map(item => (
                                <div className="cart-item" key={item.product}>
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.image} alt="Product" height="90" width="115" />
                                        </div>
                                        <div className="col-5 col-lg-3">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">Rs. {item.price}</p>
                                        </div>
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                                <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                            </div>
                                        </div>
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">Rs. {cartItems.reduce((acc, item) => acc + item.quantity * item.price , 0)}</span></p>
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Cart;
