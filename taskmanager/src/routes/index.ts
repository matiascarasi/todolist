import { Express } from "express"
import tasks from "./tasks"

const mountRoutes = (app: Express) => {
    app.use("/tasks", tasks);
}

export default mountRoutes;