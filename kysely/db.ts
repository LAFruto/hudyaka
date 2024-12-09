import { Kysely, PostgresDialect } from "kysely";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { DB } from "./db-schema";
import pg from "pg";
import ws from "ws";
neonConfig.webSocketConstructor = ws;

export const pool = new pg.Pool({
  connectionString: process.env.KYSELY_URL,
});

export const neonPool = new Pool({
  connectionString: process.env.KYSELY_URL,
});

export const dbk =
  process.env.NODE_ENV == "production"
    ? new Kysely<DB>({
        dialect: new PostgresDialect({
          pool: neonPool,
        }),
      })
    : new Kysely<DB>({
        dialect: new PostgresDialect({
          pool: pool,
        }),
      });
