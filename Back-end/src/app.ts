// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './database/AppDataSource';


dotenv.config();

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.database();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private async database(): Promise<void> {
        try {
            await AppDataSource.initialize();
            console.log('Database connected');
        } catch (error) {
            console.error('Database connection error:', error);
        }
    }


}

export default new App().app;