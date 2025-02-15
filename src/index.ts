import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import Dependency from "./common/dependency/dependency";

const dotenvResult = dotenv.config({ path: `.env.${process.env.DEPLOY_STAGE}` })
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
        console.log(`app is running on port ${port}`);
    } catch (error) {
        process.exit(1);
    }
});

export default app;
