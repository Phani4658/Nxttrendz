import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productDetails = cartList.find(item => item.id === id)
    const index = cartList.indexOf(productDetails)
    cartList.splice(index, 1)
    const newProductDetails = {
      ...productDetails,
      quantity: productDetails.quantity + 1,
    }
    const newCartList = [...cartList, newProductDetails]
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productDetails = cartList.find(item => item.id === id)
    const index = cartList.indexOf(productDetails)
    cartList.splice(index, 1)
    let newProductDetails = productDetails
    if (productDetails.quantity > 1) {
      newProductDetails = {
        ...productDetails,
        quantity: productDetails.quantity - 1,
      }
    } else {
      this.removeCartItem(newProductDetails.id)
    }
    const newCartList = [...cartList, newProductDetails]
    this.setState({cartList: newCartList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const productDetails = cartList.find(item => item.id === id)
    const index = cartList.indexOf(productDetails)
    cartList.splice(index, 1)
    this.setState({cartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const availableProduct = cartList.find(item => item.id === product.id)
    if (availableProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedProduct = {
        ...availableProduct,
        quantity: availableProduct.quantity + product.quantity,
      }
      const index = cartList.indexOf(availableProduct)
      if (index > -1) {
        cartList.splice(index, 1)
      }
      const newCartList = [...cartList, updatedProduct]
      this.setState({cartList: newCartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
