class ColorService {
    static getColors = () => {
        return fetch('http://157.245.210.243:3001/colors').then((res => res.json()));
    }
}

export default ColorService;