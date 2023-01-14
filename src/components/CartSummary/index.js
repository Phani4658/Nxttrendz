import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalPrice = 0
      cartList.forEach(item => {
        totalPrice += item.price
      })

      return (
        <div className="cart-summary">
          <h1 className="cart-summary-heading">
            Order Total: <span className="price">{totalPrice}</span>
          </h1>
          <p>{cartList.length} items in cart</p>
          <button type="button" className="shop-now-btn checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
