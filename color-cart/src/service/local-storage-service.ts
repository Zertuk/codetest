import { IPalette } from "../components/cart-container/cart-container";

class LocalStorageService {
    static setItemFromArray = (key: string, value: string[]) => {
        let arrayAsString = value.join(',');

        localStorage.setItem(key, arrayAsString);
    }

    static getItemAsArray = (key: string): string[] => {
        let storedStringAsArray: any[] = [];
        let storedString = localStorage.getItem(key);
        
        if (storedString) {
            storedStringAsArray = storedString.split(',');
        }


        return storedStringAsArray;
    }

    static setItemAsJSON = (key: string, value: IPalette[]) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItemFromJSON = (key: string): IPalette[] => {
        return JSON.parse(localStorage.getItem(key) || "[]");
    }
}

export default LocalStorageService;
