import { Pool } from 'pg'
 
const pool = new Pool({
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PSWD,
    user: process.env.POSTGRES_USER
})
 
export default pool