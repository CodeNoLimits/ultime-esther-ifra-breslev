import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// The exact reading from the Visual AI Agent
const trueImageMappings: { file: string; text: string }[] = [
  { file: "IMG-20251027-WA0190.jpg", text: "Les Cahiers du Coeur" },
  { file: "IMG-20251030-WA0164.jpg", text: "Shemot HaTsadikim" },
  { file: "IMG-20251030-WA0165.jpg", text: "Likoutey Moharane Tome 5" },
  { file: "IMG-20251030-WA0166.jpg", text: "Likoutey Moharane Tome 7" },
  { file: "IMG-20251030-WA0167.jpg", text: "Likoutey Moharane Tome 8" },
  { file: "IMG-20251031-WA0002.jpg", text: "Likoutey Moharane" }, // generic
  { file: "IMG-20251031-WA0003.jpg", text: "Tikoun Haklali" },
  { file: "IMG-20251031-WA0004.jpg", text: "Likoutey Tefilot" },
  { file: "IMG-20251103-WA0119.jpg", text: "La Vie d'un Breslever" },
  { file: "IMG-20251103-WA0120.jpg", text: "L'âge d'Or de Breslev" },
  { file: "IMG-20251103-WA0121.jpg", text: "Rabbi Nahman" },
  { file: "IMG-20251110-WA0181.jpg", text: "Shemot Atsadikim" },
  { file: "IMG-20251110-WA0182.jpg", text: "Conversations des Anges Tome 2" },
  { file: "IMG-20251110-WA0183.jpg", text: "Likoutey Moharane Tome 3" },
  { file: "IMG-20251110-WA0184.jpg", text: "Le Voyage de Rabbi Nachman" }, // the reading says Voyage
  { file: "IMG-20251110-WA0187.jpg", text: "Likoutey Moharane Tome 2" },
  { file: "IMG-20251110-WA0188.jpg", text: "Likoutey Moharane Tome 4" },
  { file: "IMG-20251110-WA0189.jpg", text: "Conversations des Anges Tome 2" },
  { file: "IMG-20251110-WA0192.jpg", text: "Likoutey Moharane Tome 4" },
  { file: "IMG-20251110-WA0194.jpg", text: "Likoutey Moharane Tome 2" },
  { file: "IMG-20251110-WA0195.jpg", text: "Likoutey Moharane Tome 8" },
  {
    file: "WhatsAppImage2025-10-31at01.25.29.jpeg",
    text: "Likoutey Moharane Tome 1",
  },
  { file: "WhatsAppImage2025-11-10at21.45.14.jpeg", text: "Shemot Atsadikim" },
  {
    file: "WhatsAppImage2025-11-10at21.47.57.jpeg",
    text: "Conversations des Anges Tome 2",
  },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

async function run() {
  const result = await client.execute(
    "SELECT id, titleFr, pdfUrl FROM books ORDER BY id DESC"
  );

  for (const row of result.rows) {
    const id = row.id as number;
    const title = row.titleFr as string;
    const normTitle = normalize(title);

    let matchedFile = "";

    // Specific hardcoded matches for edge cases
    if (normTitle.includes("laviedunbreslever"))
      matchedFile = "IMG-20251103-WA0119.jpg";
    else if (normTitle.includes("tome1") && normTitle.includes("moharane"))
      matchedFile = "WhatsAppImage2025-10-31at01.25.29.jpeg";
    else if (normTitle.includes("tome2") && normTitle.includes("moharane"))
      matchedFile = "IMG-20251110-WA0187.jpg";
    else if (normTitle.includes("tome3") && normTitle.includes("moharane"))
      matchedFile = "IMG-20251110-WA0183.jpg";
    else if (normTitle.includes("tome4") && normTitle.includes("moharane"))
      matchedFile = "IMG-20251110-WA0188.jpg";
    else if (normTitle.includes("tome5") && normTitle.includes("moharane"))
      matchedFile = "IMG-20251030-WA0165.jpg";
    else if (normTitle.includes("tome6") && normTitle.includes("moharane"))
      matchedFile = "IMG-20251031-WA0002.jpg"; // fallback generic LM
    else if (normTitle.includes("tome7") && normTitle.includes("moharane"))
      matchedFile = "IMG-20251030-WA0166.jpg";
    else if (normTitle.includes("tome8") && normTitle.includes("moharane"))
      matchedFile = "IMG-20251030-WA0167.jpg";
    else if (normTitle.includes("voyage"))
      matchedFile = "IMG-20251110-WA0184.jpg";
    else if (normTitle.includes("conversations") && normTitle.includes("2"))
      matchedFile = "IMG-20251110-WA0182.jpg";
    else if (normTitle.includes("conversations"))
      matchedFile = "IMG-20251110-WA0182.jpg";
    else if (normTitle.includes("chemot"))
      matchedFile = "IMG-20251030-WA0164.jpg";
    else if (normTitle.includes("agedor"))
      matchedFile = "IMG-20251103-WA0120.jpg";
    else if (normTitle.includes("rabbinahman2014"))
      matchedFile = "IMG-20251103-WA0121.jpg";
    else if (normTitle.includes("tikounhaklali"))
      matchedFile = "IMG-20251031-WA0003.jpg";
    else if (normTitle.includes("tefilot"))
      matchedFile = "IMG-20251031-WA0004.jpg";
    else if (normTitle.includes("cahiers"))
      matchedFile = "IMG-20251027-WA0190.jpg";
    else {
      // No match, so we use the UI's built-in dynamic text fallback
      matchedFile = "";
    }

    console.log(`[Semantically Mapped] ${title} -> ${matchedFile || "NULL"}`);

    let finalUrl = matchedFile ? `/images/livres/${matchedFile}` : null;

    await client.execute({
      sql: "UPDATE books SET coverImageUrl = ? WHERE id = ?",
      args: [finalUrl, id],
    });
  }

  console.log("All malicious filenames stripped. True covers restored!");
  process.exit(0);
}

run().catch(console.error);
