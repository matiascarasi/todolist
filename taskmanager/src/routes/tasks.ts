import { Router, Request } from "express";
import { TaskCompleteSchema, TaskCreateSchema } from "../schemas/Task";
import pool from "../db/index"
import { NoIDError } from "./HTTPErrors";

const router = Router();

export default router;

router.get('', async (req: Request<{}, {}, {}, { order?: "asc" | "desc" }>, res) => {
    try {
        const { order = "desc" } = req.query;
        const { rows } = await pool.query(`SELECT * FROM tasks ORDER BY isdone ASC, duedate ${order.toUpperCase()}`);
        res.send(rows);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if(!rows.length) throw NoIDError;
        res.send(rows[0]);
    } catch(e) {
        res.status(e.status || 500).send(e);
    }
});

router.post('/create', async (req: Request<{}, {}, TaskCreateSchema>, res) => {
    const { title, content, dueDate } = req.body;
    try {
        await pool.query(
            'INSERT INTO tasks(title, content, duedate, startdate, isdone) VALUES($1, $2, $3, $4, $5)',
            [title, content, dueDate, new Date(), false]
        );
        res.send("Success");
    } catch(e) {
        res.status(500).send(e);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (!rows.length) throw NoIDError;
        res.send("Success");
    } catch(e) {
        res.status(e.status || 500).send(e);
    }
})

router.put("/:id", async (req: Request<{ id: string }, {}, TaskCreateSchema>, res) => {
    try {
        const { id } = req.params;
        const { title, content, dueDate } = req.body;
        const { rows } = await pool.query(
            'UPDATE tasks SET title = $1, content = $2, duedate = $3 WHERE id = $4 RETURNING *',
            [title, content, dueDate, id]
        );
        if (!rows.length) throw NoIDError;
        res.send("Success");
    } catch(e) {
        res.status(e.status || 500).send(e);
    }
})

router.put("/ack/:id", async (req: Request<{ id: string }, {}, TaskCompleteSchema>, res) => {
    try {
        const { id } = req.params;
        const { isDone } = req.body;
        const { rows } = await pool.query(
            'UPDATE tasks SET isdone = $1, enddate = $2 WHERE id = $3 RETURNING *',
            [isDone, isDone ? new Date() : null, id]
        );
        if (!rows.length) throw NoIDError;
        res.send("Success");
    } catch(e) {
        res.status(e.status || 500).send(e);
    }
})