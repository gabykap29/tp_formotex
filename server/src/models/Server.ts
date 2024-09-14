import express, { Application } from "express";
import { PORT } from "../config/config";
import { port } from "../types/types";
import { connectDB } from "../database/db";
import morgan from "morgan";
import cors from "cors";
import routerTest from "../routes/routes";
import routerAuth from "../routes/auth.routes";
class Server {
  private app: Application;
  private port: port;

  constructor() {
    this.app = express();
    this.port = PORT;

    this.dbConnect();
    this.middlewares();
    this.routes();
  }


  private async dbConnect(): Promise<void> {
    await connectDB();
  }


  private middlewares(): void {

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }


  private routes(): void {
    this.app.use(routerTest);
    this.app.use('/api/',routerAuth);
  }


  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor funcionando en el puerto: ${this.port}`);
    });
  }
}

export default Server;
