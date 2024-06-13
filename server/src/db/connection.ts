import { Pool } from 'pg';

const pool = new Pool({
  host:       process.env.DB_HOST || "localhost",       // Postgres ip address[s] or domain name[s]
  port:       parseInt(process.env.DB_PORT || "5432"),  // Postgres server port[s]
  database:   process.env.DB_SERVER || "server",        // Name of database to connect to
  user:       process.env.DB_USER || "postgres",        // Username of database user
  password:   process.env.DB_PASSWORD,                  // Password of database user
});

export const dbConnection = {
  query: (sql: string, params: any[] = []) => pool.query(sql, params),
  realQuery: (sql: string, params: any[]) => {
    // TODO
  }
}