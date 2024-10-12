import pg from "pg";

export const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  password: "42323986t",
  database: "nodepg",
  port: "5432",
});
