import app from './app';
import {connectToDatabase} from "./src/db/connection";

const PORT = process.env.PORT || 3001;

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
