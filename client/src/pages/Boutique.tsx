import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";

export default function Boutique() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: [] as string[],
    language: [] as string[],
    theme: [] as string[],
    priceRange: [0, 200] as [number, number],
    author: [] as string[],
  });
  const [sortBy, setSortBy] = useState("newest");

  // Get books from database
  const { data: allBooks, isLoading } = trpc.books.getAll.useQuery();
  const books = allBooks || [];

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    const currentFilters = filters[category] as string[];
    if (currentFilters.includes(value)) {
      setFilters({
        ...filters,
        [category]: currentFilters.filter((v) => v !== value),
      });
    } else {
      setFilters({
        ...filters,
        [category]: [...currentFilters, value],
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      type: [],
      language: [],
      theme: [],
      priceRange: [0, 200],
      author: [],
    });
  };

  const hasActiveFilters =
    filters.type.length > 0 ||
    filters.language.length > 0 ||
    filters.theme.length > 0 ||
    filters.author.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 200;

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Type */}
      <div>
        <Label className="text-base font-bold mb-3 block text-breslev-blue">
          Type
        </Label>
        <div className="space-y-2">
          {["Livre", "Brochure"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.type.includes(type.toLowerCase())}
                onCheckedChange={() =>
                  toggleFilter("type", type.toLowerCase())
                }
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Langue */}
      <div>
        <Label className="text-base font-bold mb-3 block text-breslev-blue">
          Langue
        </Label>
        <div className="space-y-2">
          {[
            { label: "Français", value: "fr" },
            { label: "Hébreu", value: "he" },
            { label: "Anglais", value: "en" },
          ].map((lang) => (
            <div key={lang.value} className="flex items-center space-x-2">
              <Checkbox
                id={`lang-${lang.value}`}
                checked={filters.language.includes(lang.value)}
                onCheckedChange={() => toggleFilter("language", lang.value)}
              />
              <label
                htmlFor={`lang-${lang.value}`}
                className="text-sm cursor-pointer"
              >
                {lang.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Thème */}
      <div>
        <Label className="text-base font-bold mb-3 block text-breslev-blue">
          Thème
        </Label>
        <div className="space-y-2">
          {[
            "Prière",
            "Joie",
            "Tsaddikim",
            "Hitbodedout",
            "Tikoun HaKlali",
            "Enseignements",
          ].map((theme) => (
            <div key={theme} className="flex items-center space-x-2">
              <Checkbox
                id={`theme-${theme}`}
                checked={filters.theme.includes(theme)}
                onCheckedChange={() => toggleFilter("theme", theme)}
              />
              <label
                htmlFor={`theme-${theme}`}
                className="text-sm cursor-pointer"
              >
                {theme}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <Label className="text-base font-bold mb-3 block text-breslev-blue">
          Prix (₪)
        </Label>
        <div className="space-y-4">
          <Slider
            min={0}
            max={200}
            step={10}
            value={filters.priceRange}
            onValueChange={(value) =>
              setFilters({ ...filters, priceRange: value as [number, number] })
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0]}₪</span>
            <span>{filters.priceRange[1]}₪</span>
          </div>
        </div>
      </div>

      {/* Auteur */}
      <div>
        <Label className="text-base font-bold mb-3 block text-breslev-blue">
          Auteur
        </Label>
        <div className="space-y-2">
          {["Esther Ifrah", "Autres"].map((author) => (
            <div key={author} className="flex items-center space-x-2">
              <Checkbox
                id={`author-${author}`}
                checked={filters.author.includes(author)}
                onCheckedChange={() => toggleFilter("author", author)}
              />
              <label
                htmlFor={`author-${author}`}
                className="text-sm cursor-pointer"
              >
                {author}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={resetFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-breslev-blue">
              Boutique
            </h1>
            <p className="text-muted-foreground text-lg">
              Découvrez notre collection complète de livres et brochures sur les
              enseignements de Rabbi Nachman
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-lg p-6 shadow-breslev border border-border">
                <h2 className="text-xl font-bold mb-6 text-breslev-blue">
                  Filtres
                </h2>
                <FilterSection />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button & Sort */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-breslev-gold text-breslev-blue">
                      {filters.type.length +
                        filters.language.length +
                        filters.theme.length +
                        filters.author.length}
                    </Badge>
                  )}
                </Button>

                {/* Sort */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    Trier par:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Nouveautés</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">
                        Prix décroissant
                      </SelectItem>
                      <SelectItem value="popular">Popularité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile Filters Modal */}
              {mobileFiltersOpen && (
                <div className="lg:hidden mb-6 bg-card rounded-lg p-6 shadow-breslev border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-breslev-blue">
                      Filtres
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <FilterSection />
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {books.length}
                  </span>{" "}
                  livre(s) trouvé(s)
                </p>
              </div>

              {/* Books Grid */}
              {books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book: any) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
                    <Filter className="h-8 w-8 text-breslev-blue/30" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-breslev-blue">
                    Aucun livre trouvé
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Aucun livre ne correspond à vos critères de recherche
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={resetFilters}>
                      Réinitialiser les filtres
                    </Button>
                  )}
                </div>
              )}

              {/* Pagination - Placeholder */}
              {books.length > 0 && (
                <div className="mt-12 flex justify-center gap-2">
                  <Button variant="outline" disabled>
                    Précédent
                  </Button>
                  <Button variant="default">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Suivant</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
