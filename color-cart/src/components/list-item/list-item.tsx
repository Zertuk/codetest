import * as React from 'react';
import './list-item.css';
import trashIcon from '../../assets/TrashIcon.svg';

interface ListItemProps {
    color: string;
    updateCart: Function;
    selected?: boolean;
    selectable?: boolean;
    removable?: boolean;
} 

interface ListItemState {
    selected: boolean;
}

class ListItem extends React.Component<ListItemProps, ListItemState> {
    constructor(props: ListItemProps) {
        super(props);
        
        this.state = {
            selected: this.props.selected ? true : false
        }
    }

    removeOrAddToCart = () => {
        if (!this.props.selectable || !this.props.updateCart) {
            return;
        }

        this.props.updateCart(this.props.color, !this.state.selected);
        this.setState({ selected: !this.state.selected });
    }

    removeFromCart = () => {
        if (!this.props.updateCart) {
            return;
        }

        this.props.updateCart(this.props.color);
        this.setState({ selected: false });
    }

    render() {
        let className = 'list-item';
        if (this.props.selectable) {
            className = className + ' list-item-selectable';
        }
        if (this.state.selected) {
            className = className + ' list-item-selected';
        }
        if (this.props.removable) {
            className = className + ' list-item-removable';
        }
        
        return (
            <div className={className} 
                style={{backgroundColor: this.props.color}}
                onClick={this.removeOrAddToCart}>
                <span className="list-item-name">
                    {this.props.color}
                </span>
                <img src={trashIcon} className="list-item-trash-icon" alt="trash-can" onClick={this.removeFromCart}/>
            </div>
        )
    }
}

export default ListItem;
