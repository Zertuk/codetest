import React from 'react';
import Palette from '../palette/palette';
import SavePalette from '../save-palette/save-palette';
import './cart.css';
import { IPalette } from '../cart-container/cart-container';

interface CartProps {
    updateCart: Function;
    addPalette: Function;
    updatePalettes: Function;
    cart: string[];
    palettes: IPalette[];
}

interface CartState {
    cart: string[];
    palettes: IPalette[];
    paletteIndex: number;
}

interface Color {
    color: string;
    selected: boolean;
}

class Cart extends React.Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);

        let paletteIndex = 0;
        for (let palette of this.props.palettes) {
            if (paletteIndex < palette.id) {
                paletteIndex = palette.id;
            }
        }

        this.state = {
            cart: this.props.cart,
            palettes: this.props.palettes,
            paletteIndex: paletteIndex
        }
    }

    removePalette = (id: number) => {
        let palettes = this.state.palettes;
        let index = 0;
        for (let palette of palettes) {
            if (id === palette.id) {
                palettes.splice(index, 1);
                break;
            }
            index = index + 1;
        }

        this.props.updatePalettes(palettes);
        this.setState({
            cart: this.state.cart,
            palettes: this.state.palettes
        });
    }

    addPalette = (title: string) => {
        if (this.state.cart.length === 0) {
            return;
        }
        let newPalette = {title: title, colors: this.state.cart, id: this.state.paletteIndex + 1};
        this.setState({
            cart: [],
            palettes: this.state.palettes.concat(newPalette),
            paletteIndex: this.state.paletteIndex + 1
        });
        this.props.addPalette(newPalette);
        this.props.updateCart([]);
    }

    updateCart = (value: string) => {
        this.removeFromCart(value);
    }

    removeFromCart = (value: string) => {
        let index = this.state.cart.indexOf(value);
        if (index === -1) {
            return;
        }

        let updatedCart = this.state.cart;
        updatedCart.splice(index, 1);

        this.setState({cart: updatedCart});
        this.props.updateCart(this.state.cart);
    }

    render() {
        return (
            <div className="cart">
                <div className="cart-current">
                    <h2 className="cart-heading">
                        Your current color cart palette
                    </h2>
                    <Palette colors={this.state.cart} updatable={true} updateCart={this.updateCart}/>
                    <SavePalette addPalette={this.addPalette}/>
                </div>

                <div className="cart-divider">
                </div>

                <div className="cart-previous">
                    <h2 className="cart-heading">
                        Previously saved color palettes
                    </h2>

                    {this.state.palettes.map((palette, i) => {
                        return <Palette key={i} id={palette.id} colors={palette.colors} title={palette.title} removePalette={this.removePalette}/>
                    })}
                </div>
            </div>
        );
    }
}

export default Cart;
