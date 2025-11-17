#!/usr/bin/env python3
"""
Script pour analyser tous les PDFs et extraire les métadonnées des livres
"""
import os
import json
from pathlib import Path
import PyPDF2

def analyze_pdf(pdf_path):
    """Analyse un PDF et extrait les métadonnées"""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            
            # Métadonnées de base
            metadata = {
                'filename': os.path.basename(pdf_path),
                'pages': len(reader.pages),
                'title': None,
                'author': None,
                'first_page_text': None
            }
            
            # Essayer d'extraire les métadonnées du PDF
            if reader.metadata:
                metadata['title'] = reader.metadata.get('/Title', None)
                metadata['author'] = reader.metadata.get('/Author', None)
            
            # Extraire le texte de la première page
            if len(reader.pages) > 0:
                first_page = reader.pages[0]
                text = first_page.extract_text()
                # Prendre les 500 premiers caractères
                metadata['first_page_text'] = text[:500] if text else None
            
            return metadata
    except Exception as e:
        print(f"Erreur lors de l'analyse de {pdf_path}: {e}")
        return None

def main():
    pdfs_dir = Path('/home/ubuntu/breslev/client/public/pdfs')
    results = []
    
    print("Analyse des PDFs...")
    print("=" * 60)
    
    for pdf_file in sorted(pdfs_dir.glob('*.pdf')):
        print(f"\nAnalyse de: {pdf_file.name}")
        metadata = analyze_pdf(pdf_file)
        
        if metadata:
            results.append(metadata)
            print(f"  Pages: {metadata['pages']}")
            print(f"  Titre (metadata): {metadata['title']}")
            print(f"  Auteur (metadata): {metadata['author']}")
            if metadata['first_page_text']:
                # Afficher les 200 premiers caractères
                preview = metadata['first_page_text'][:200].replace('\n', ' ')
                print(f"  Aperçu: {preview}...")
    
    # Sauvegarder les résultats
    output_file = Path('/home/ubuntu/breslev/scripts/books_analysis.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 60)
    print(f"Analyse terminée! {len(results)} PDFs analysés")
    print(f"Résultats sauvegardés dans: {output_file}")

if __name__ == '__main__':
    main()
