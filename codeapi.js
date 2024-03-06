const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const codeHistory = [];
let currentTheme = '';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send('File uploaded successfully.');
});

app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});

app.post('/save-theme', (req, res) => {
    currentTheme = req.body.theme;
    res.status(200).send('Theme saved successfully.');
});

app.get('/get-theme', (req, res) => {
    res.status(200).json({ theme: currentTheme });
});

app.post('/save-code', (req, res) => {
    const code = req.body.code;
    codeHistory.push(code);
    res.status(200).send('Code saved successfully.');
});

app.get('/get-code-history', (req, res) => {
    res.status(200).json({ codeHistory });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
