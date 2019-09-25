import React from 'react';
import logo from '../../assets/NewEngen-Logo.svg';
import cartIcon from '../../assets/CartIcon.svg';
import './header.css';
import { BrowserRouter as Route, Link } from "react-router-dom";

interface HeaderProps {
    cartCount: number;
}

class Header extends React.Component<HeaderProps> {
    render() {
        return (
            <header className="header">
                <div className="header-icons">
                    <Link to="/" className="anchor">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Link to="/cart" className="anchor anchor-cart-icon">
                        <span className="cart-count">{this.props.cartCount} </span>               
                        <img src={cartIcon} alt="cart icon" />
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;
