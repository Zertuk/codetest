import React from 'react';
import './App.css';
import ListContainer from '../list-container/list-container';
import CartContainer from '../cart-container/cart-container';
import Header from '../header/header';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LocalStorageService from '../../service/local-storage-service';

interface AppProps {
}

interface AppState {
  cartCount: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      cartCount: this.getCartCount()
    }
  }

  updateCartCount = (count: number) => {
    this.setState({cartCount: count});
  }

  getCartCount = (): number => {
    return LocalStorageService.getItemAsArray('cart').length;
  }

  render() {
      return (
        <Router>
            <div className="app">
                <Header cartCount={this.state.cartCount}/>
            </div>

            <div className="app-container">
                <Route exact path="/" render={(props) => <ListContainer {...props} updateCartCount={this.updateCartCount} />} />
                <Route path="/cart" render={(props) => <CartContainer {...props} updateCartCount={this.updateCartCount} />}  />
            </div>
        </Router>
      );
  }
}

export default App;
