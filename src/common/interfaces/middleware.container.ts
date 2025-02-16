import { Router } from "express";

export interface MiddlewareContainerInterface {
    getMiddleware<T>() : T
}