import { createClient } from "@libsql/client";
import { readFileSync } from "fs";

const client = createClient({ url: "file:sqlite.db" });

try {
  const sql = readFileSync("./drizzle/0000_silky_jackpot.sql", "utf8");
  console.log("Applying migration...");
  await client.executeMultiple(sql);
  console.log("Migration applied successfully!");
} catch (e) {
  console.error("Migration failed:", e);
} finally {
  client.close();
}
