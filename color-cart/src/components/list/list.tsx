import React from 'react';
import ListItem from '../list-item/list-item';
import './list.css';

interface ListProps {
    updateCart: Function;
    getColors: Function;
    cart: string[];
    colors: string[];
}

interface ListState {
    cart: string[];
    colors: Color[];
}

interface Color {
    color: string;
    selected: boolean;
}

class List extends React.Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);
        this.state = {
            cart: this.props.cart,
            colors: this.setupSelectedColors(this.props.colors)
        }
    }

    componentDidUpdate = (oldProps: ListProps) => {
        const newProps = this.props;
        if(oldProps.colors !== newProps.colors) {
          this.setState({
              cart: this.props.cart,
              colors: this.setupSelectedColors(this.props.colors)
          })
        }
    }
    
    setupSelectedColors = (colorsToSetup: string[]) => {
        let colors: Color[] = [];
        for (let color of colorsToSetup) {
            if (this.props.cart.includes(color)) {
                colors.push({color: color, selected: true});
            } else {
                colors.push({color: color, selected: false});
            }
        }

        return colors;
    }

    updateCart = (value: string, adding: boolean) => {
        if (adding) {
            this.addToCart(value);
        } else {
            this.removeFromCart(value);
        }
    }

    addToCart = (value: string) => {
        if (this.state.cart.includes(value)) {
            return;
        }   
        
        let updatedCart = this.state.cart;
        updatedCart.push(value);

        this.setState({ cart: updatedCart });
        this.props.updateCart(this.state.cart);
    }

    removeFromCart = (value: string) => {
        let index = this.state.cart.indexOf(value);
        if (index === -1) {
            return;
        }

        let updatedCart = this.state.cart;
        updatedCart.splice(index, 1);

        this.setState({ cart: updatedCart });
        this.props.updateCart(this.state.cart);
    }

    getColors = () => {
        this.props.getColors();
    }

    render() {
        return (
            <div className="list">
                <div className="list-items">
                    {this.state.colors.map((item, i) => {
                        return <ListItem key={i} color={item.color} selectable={true} selected={item.selected} updateCart={this.updateCart}/>
                    })}
                </div>

                <button className="button-load" onClick={this.getColors}>Load More</button>
            </div>
          );
    }
}

export default List;
