import express from "express";
import { renderToString } from "react-dom/server";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { StaticRouter } from "react-router-dom/server.js";
import App from "./src/App.jsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, 'dist/client')));

app.get('*', (req, res) => {
    const appHTML = renderToString(
        <StaticRouter location={req.url}>
            <App Router={StaticRouter} routerProps={{ location: req.url }} />
        </StaticRouter>
    );

    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FlixHub MOVIE APP</title>
            <link rel="stylesheet" href="/main.css">
        </head>
        <body>
            <div id="root">${appHTML}</div>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `;

    res.send(template);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
