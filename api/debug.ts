import type { VercelRequest, VercelResponse } from "@vercel/node";
import { existsSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Debug info
  const info = {
    cwd: process.cwd(),
    __dirname,
    cwdFiles: readdirSync(process.cwd()).filter(
      f => f.endsWith(".db") || f === "sqlite.db"
    ),
    dirFiles: readdirSync(__dirname).filter(
      f => f.endsWith(".db") || f === "sqlite.db"
    ),
    parentFiles: readdirSync(join(__dirname, "..")),
    rootFiles: readdirSync(join(__dirname, "..", "..")),
    sqliteExists: {
      cwd: existsSync(join(process.cwd(), "sqlite.db")),
      dir: existsSync(join(__dirname, "sqlite.db")),
      parent: existsSync(join(__dirname, "..", "sqlite.db")),
      root: existsSync(join(__dirname, "..", "..", "sqlite.db")),
    },
  };

  return res.status(200).json(info);
}
