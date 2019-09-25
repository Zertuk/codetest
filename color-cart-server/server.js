let express = require('express');
let app = express();
let port = process.env.PORT || 3001;

app.listen(port);

console.log('server started on: ' + port);

app.get('/colors', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let colors = [];

    for (let i = 0; i < 21; i++) {
        let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        
        if (!/^#[0-9A-F]{6}$/i.test(color)) {
            i = i - 1;
        } else {
            colors.push(color.toUpperCase());
        }
    }

    res.json(colors);
});
