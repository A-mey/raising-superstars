import express from "express";
import { Catch } from "../../common/helper/catch.helper"

export class TaskController {
    constructor () {
        
    }

    getTasks = (req: express.Request, res: express.Response) => {
        try {
            
        } catch (error) {
            throw new Error(Catch(error));
        }
    }
}