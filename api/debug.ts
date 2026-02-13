import type { VercelRequest, VercelResponse } from "@vercel/node";
import { existsSync, readdirSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const cwdDbPath = join(process.cwd(), "sqlite.db");

  const info = {
    cwd: process.cwd(),
    __dirname,
    cwdDbPath,
    sqliteExists: existsSync(cwdDbPath),
    sqliteSize: existsSync(cwdDbPath) ? statSync(cwdDbPath).size : 0,
    cwdFiles: readdirSync(process.cwd()),
    envTurso: !!process.env.TURSO_DATABASE_URL,
  };

  return res.status(200).json(info);
}
