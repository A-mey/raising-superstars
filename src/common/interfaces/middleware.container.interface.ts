import { Router } from "express";

export interface MiddlewareContainerInterface<T> {
    getMiddleware() : T
}