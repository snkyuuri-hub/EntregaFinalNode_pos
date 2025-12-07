import express, { Express } from "express";
import routerBook from "./routers/book/book"; 
import routerPublisher from "./routers/publisher";
import routerUser from "./routers/user";

const app: Express = express();

app.use(express.json());

// registra os routers
app.use(routerBook);
app.use(routerPublisher);
app.use(routerUser);

export default app;