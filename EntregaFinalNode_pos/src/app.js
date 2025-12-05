import express from "express";
import routerBook from "./routers/book/book.js";
import routerPublisher from "./routers/publisher/publisher.js";
import routerUser from "./routers/user/user.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routerBook);
app.use(routerPublisher);
app.use(routerUser);

export default app;