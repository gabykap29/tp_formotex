import { connect } from "mongoose";
import { MONGO_URI } from "../config/config";

const urlDb = MONGO_URI as string;

export const connectDB = async (): Promise<void> => {
    try {
        const connection = await connect(urlDb);
        console.log(`Conectado a la base de datos: ${connection.connection.name}`);
    } catch (error) {
        console.log(`Error al conectar a la base de datos: ${error}`);
        
    }
}