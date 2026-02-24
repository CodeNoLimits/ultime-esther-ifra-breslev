#!/usr/bin/env bash
cd /Users/codenolimits-dreamai-nanach/Desktop/_PROJETS/ULTIME-PROJECTS/ultime-esther-ifra-breslev
mkdir -p client/public/images/livres/covers

echo "Generating covers from PDFs..."
for f in client/public/pdfs/*.pdf; do
  if [ -f "$f" ]; then
    filename=$(basename "$f" .pdf)
    # pdftoppm appends '-1.jpg' to the output file prefix automatically when processing page 1
    # We strip spaces and quotes from the filename for safer URL paths
    safe_name=$(echo "$filename" | sed -e 's/[^A-Za-z0-9._-]/_/g')
    
    echo "Processing $filename -> $safe_name"
    pdftoppm -jpeg -f 1 -l 1 -scale-to 800 "$f" "client/public/images/livres/covers/$safe_name"
  fi
done

echo "Done generating covers."
