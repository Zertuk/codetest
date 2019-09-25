class ColorService {
    static getColors = () => {
        return fetch('http://localhost:3001/colors').then((res => res.json()));
    }
}

export default ColorService;