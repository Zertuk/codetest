import * as React from 'react';
import './save-palette.css';

interface SavePaletteProps {
    addPalette: Function
} 

interface SavePaletteState {
    title: string
} 

class SavePalette extends React.Component<SavePaletteProps, SavePaletteState> {
    constructor(props: SavePaletteProps) {
        super(props);
        this.state = {
            title: ''
        }
    }

    addPalette = () => {
        this.props.addPalette(this.state.title);
        this.setState({
            title: ''
        });
    }

    updateTitle = (event: any) => {
        this.setState({title: event.target.value});
    }

    render() {
        return (
            <div className="save-palette">
                <p className="text-save-palette">Name and save your color palette</p>
                <input className="input-save-palette" value={this.state.title} onChange={this.updateTitle} placeholder="Color palette name"/>
                <button className="button-save-palette" onClick={this.addPalette}>Save Palette</button>
            </div>
        );
    }


}

export default SavePalette;
