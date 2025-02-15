import express from "express";

export class HealthController {

    checkHealth = (_req: express.Request, res: express.Response) => {
        console.log("healthcheck");
        res.status(200).json({message: "service is up"});
    }
}