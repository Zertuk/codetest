import * as React from 'react';
import ListItem from '../list-item/list-item';
import trashIcon from '../../assets/trashicongrey.svg';
import './palette.css';

interface PaletteProps {
    colors: string[];
    id?: number;
    removePalette?: Function;
    updatable?: boolean;
    updateCart?: Function;
    title?: string;
} 

interface PaletteState {
    selected: boolean;
}

class Palette extends React.Component<PaletteProps, PaletteState> {
    removePalette = () => {
        if (!this.props.removePalette) {
            return;
        }

        this.props.removePalette(this.props.id);
    }

    getTitleAndLength = (): string => {
        let title = '';
        if (this.props.title) {
            title = this.props.title  + ' - ' + this.props.colors.length;
            if (this.props.colors.length === 1) {
                title = title + ' color';
            } else {
                title = title + ' colors';
            }
        }

        return title;
    }

    updateCart = (color: string) => {
        if (this.props.updateCart) {
            this.props.updateCart(color);
        }
    }

    render() {
        let removeDiv;

        if (!this.props.updatable) {
            removeDiv = <div className="palette-remove" onClick={this.removePalette}><img src={trashIcon} alt="trash-can" className="palette-remove-trash-icon"/></div>
        }

        return (
            <div className="palette">
                <p className="palette-title">{this.getTitleAndLength()}</p>

                <div className="palette-container">
                    {this.props.colors.map((value, i) => {
                        return <ListItem key={i} color={value} updateCart={this.updateCart} removable={this.props.updatable ? true : false}/>
                    })}

                    {removeDiv}
                </div>
            </div>
        );
    }


}

export default Palette;
