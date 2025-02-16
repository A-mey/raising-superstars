import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import Dependency from "./common/dependency/dependency";

const environment = process.env.DEPLOY_STAGE;

const dotenvResult = environment ? dotenv.config({ path: `.env.${environment} ` }) : dotenv.config({ path: `.env` })
if (dotenvResult.error) {
    throw dotenvResult.error;
}

dotenv.config();
const port = process.env.PORT || 9000;

const app: express.Application = express();
app.use(express.json());

app.use(helmet());

app.listen(port, async () => {
    try {
        new Dependency(app).getRoutes();
        console.log(`app is running on port ${port} on environment ${environment || "none"}`);
    } catch (error) {
        process.exit(1);
    }
});

export default app;
