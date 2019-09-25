import * as React from 'react';
import Cart from '../cart/cart';
import LocalStorageService from '../../service/local-storage-service';

export interface IPalette {
    title: string;
    colors: string[];
    id: number;
}

interface CartContainerProps {
    updateCartCount: Function;
}

class CartContainer extends React.Component<CartContainerProps> {
    updateCart = (cart: string[]) => {
        LocalStorageService.setItemFromArray('cart', cart);
        this.props.updateCartCount(cart.length);
    }

    getCart = (): string[] => {
        return LocalStorageService.getItemAsArray('cart');
    }

    getPalettes = (): IPalette[] => {
        return LocalStorageService.getItemFromJSON('palettes');
    }

    addPalette = (palette: IPalette) => {
        let palettes = this.getPalettes();
        palettes.push(palette);
        LocalStorageService.setItemAsJSON('palettes', palettes);
    }

    updatePalettes = (palettes: IPalette[]) => {
        LocalStorageService.setItemAsJSON('palettes', palettes);
    }

    render() {
        return (
            <Cart updateCart={this.updateCart} cart={this.getCart()} palettes={this.getPalettes()} addPalette={this.addPalette} updatePalettes={this.updatePalettes}/>
        )
    }
}

export default CartContainer;


