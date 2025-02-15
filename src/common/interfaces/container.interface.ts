import { Router } from "express";

export interface ContainerInterface {
    getRoute (): Router
}