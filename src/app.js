import express from "express";
import { main } from "./main/main.js";
import { allowCors } from "./middleware/cors-middleware.js";

const app = express();
app.use(allowCors);

app.get('/sort/:sourcePath/:destinationPath', async (request, response) => {
    let result;
    try {
        result = main(request.params.sourcePath, request.params.destinationPath);
        if (!result.error)
            return response.status(200).send(result);
        response.status(400).send(result);
    } catch (error) {
        response.status(500).send({ error });
    }
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});