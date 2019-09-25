import * as React from 'react';
import List from '../list/list';
import LocalStorageService from '../../service/local-storage-service';
import ColorService from '../../service/color-service';

interface ListContainerProps {
    updateCartCount: Function;
}

interface ListContainerState {
    colors: string[];
}

class ListContainer extends React.Component<ListContainerProps, ListContainerState> {
    constructor(props: ListContainerProps) {
        super(props);
        this.state = {
            colors: []
        };
        this.getColors();
    }

    getColors = () => {
        ColorService.getColors().then((result) => {
            let colors: string[] = this.state.colors || [];

            // find and remove duplicates if they exist
            for (let i = 0; i < result.length; i++) {
                if (colors.includes(result[i])) {
                    result.splice(i, 1);
                }
            }

            this.setState({colors: colors.concat(result)});
        });
    }

    updateCart = (cart: string[]) => {
        LocalStorageService.setItemFromArray('cart', cart);
        this.props.updateCartCount(cart.length);
    }

    getCart = (): string[] => {
        return LocalStorageService.getItemAsArray('cart');
    }

    render = () => {
        if (!this.state.colors || this.state.colors.length === 0) {
            return null;
        }

        return (
            <List updateCart={this.updateCart} cart={this.getCart()} colors={this.state.colors} getColors={this.getColors}/>
        )
    }
}

export default ListContainer;
