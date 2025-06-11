import dotenv from 'dotenv';
import {connectDatabase} from "./databse/db";
import {createApp} from "./config/app";

dotenv.config();
const port = process.env.PORT || 3000;

connectDatabase().then(() => {
    const app = createApp();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })
});