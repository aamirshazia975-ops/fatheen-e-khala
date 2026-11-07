import { useMemo, useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import { ALL_EU_SIZES } from '../data/products';
import {
  ColorwayOption,
  Product,
  ProductCategory,
  SortOption,
} from '../types';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  products: Product[];
  onInspectProduct: (product: Product, preselectedSize?: number, preselectedColorwayId?: string) => void;
  onAddToBag: (product: Product, sizeEu: number, colorway: ColorwayOption) => void;
}

const SWATCH_BG: Record<ColorwayOption['swatchPrimary'], string> = {
  red: 'bg-[#ff0000]',
  blue: 'bg-[#0000ff]',
  yellow: 'bg-[#ffff00]',
  black: 'bg-black',
  chalk: 'bg-[#f5f4ee]',
};

export function CatalogSection({
  products,
  onInspectProduct,
  onAddToBag,
}: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    ProductCategory.ALL
  );
  const [activeSizeFilter, setActiveSizeFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.FEATURED);
  const [searchQuery, setSearchQuery] = useState('');

  // Per-card selected size and colorway state
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const p of products) {
      initial[p.id] = p.availableSizes.includes(42)
        ? 42
        : p.availableSizes[0];
    }
    return initial;
  });

  const [selectedColorways, setSelectedColorways] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    for (const p of products) {
      initial[p.id] = p.colorways[0].id;
    }
    return initial;
  });

  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = Object.values(ProductCategory);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((product) => {
      if (
        activeCategory !== ProductCategory.ALL &&
        product.category !== activeCategory
      ) {
        return false;
      }
      if (
        activeSizeFilter !== null &&
        !product.availableSizes.includes(activeSizeFilter)
      ) {
        return false;
      }
      if (q.length > 0) {
        const haystack = `${product.name} ${product.category} ${product.upperMaterial} ${product.soleCompound} ${product.shortSummary}`.toLowerCase();
        if (!haystack.includes(q)) {
          return false;
        }
      }
      return true;
    });

    if (sortBy === SortOption.PRICE_ASC) {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === SortOption.PRICE_DESC) {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === SortOption.LIGHTEST) {
      return [...list].sort((a, b) => a.weightGrams - b.weightGrams);
    }
    return list;
  }, [products, activeCategory, activeSizeFilter, sortBy, searchQuery]);

  const hasActiveFilters =
    activeCategory !== ProductCategory.ALL ||
    activeSizeFilter !== null ||
    searchQuery.trim() !== '' ||
    sortBy !== SortOption.FEATURED;

  const handleResetFilters = () => {
    setActiveCategory(ProductCategory.ALL);
    setActiveSizeFilter(null);
    setSortBy(SortOption.FEATURED);
    setSearchQuery('');
  };

  const handleSizeFilterClick = (size: number) => {
    if (activeSizeFilter === size) {
      setActiveSizeFilter(null);
      return;
    }
    setActiveSizeFilter(size);
    // Sync card size selections to the chosen EU size filter where stocked
    setSelectedSizes((prev) => {
      const updated = { ...prev };
      for (const p of products) {
        if (p.availableSizes.includes(size)) {
          updated[p.id] = size;
        }
      }
      return updated;
    });
  };

  const handleCardQuickAdd = (product: Product) => {
    const chosenSize =
      selectedSizes[product.id] ?? product.availableSizes[0];
    const chosenColorway =
      product.colorways.find((c) => c.id === selectedColorways[product.id]) ??
      product.colorways[0];

    onAddToBag(product, chosenSize, chosenColorway);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((current) => (current === product.id ? null : current));
    }, 1400);
  };

  return (
    <section
      id="catalog"
      aria-labelledby="catalog-heading"
      className="border-b-4 border-black bg-[#f5f4ee]"
    >
      <div className="max-w-[1440px] mx-auto min-[1441px]:border-x-4 border-black">
        {/* Top Split: Yellow Heading Block with Balancing Blue Triangle + Ruled Filter Matrix */}
        <div className="grid grid-cols-1 min-[1051px]:grid-cols-[380px_1fr] border-b-4 border-black">
          {/* Yellow Heading Block + Deliberate Blue Triangle */}
          <div className="bg-[#ffff00] p-8 max-[1050px]:p-6 max-[720px]:p-5 min-[1051px]:border-r-4 max-[1050px]:border-b-4 border-black flex flex-col justify-between gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold text-black">
                  01 · Architectural Footwear
                </div>
                <h2
                  id="catalog-heading"
                  className="mt-1.5 text-3xl max-[720px]:text-2xl font-extrabold leading-[1.02] tracking-[-0.04em] text-black"
                >
                  Silhouette
                  <br />
                  Catalog
                </h2>
              </div>

              {/* Deliberate Geometric Blue Triangle Balancing the Yellow Block */}
              <svg
                viewBox="0 0 72 72"
                className="w-16 h-16 shrink-0"
                aria-hidden="true"
              >
                <polygon
                  points="68,4 68,68 4,68"
                  fill="#0000ff"
                  stroke="#000000"
                  strokeWidth="4"
                />
              </svg>
            </div>

            <div className="pt-4 border-t-2 border-black flex items-baseline justify-between gap-3">
              <span className="text-sm font-extrabold tabular-nums text-black">
                Showing {filteredProducts.length} of {products.length} Models
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1 border-2 border-black bg-white text-xs font-extrabold text-black hover:bg-black hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Reset Filters ×
                </button>
              )}
            </div>
          </div>

          {/* Ruled Filter & Category Matrix */}
          <div className="bg-[#f5f4ee] divide-y-2 divide-black flex flex-col justify-between">
            {/* Row 1: Category Filter Buttons */}
            <div className="p-5 max-[720px]:p-4">
              <div className="text-xs font-extrabold text-black mb-2.5">
                Filter by Category (Active state marked with ■)
              </div>
              <div
                role="group"
                aria-label="Product categories"
                className="flex flex-wrap gap-2"
              >
                {categories.map((category) => {
                  const isSelected = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isSelected}
                      className={`h-10 px-3.5 border-2 border-black text-xs font-extrabold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-black text-white'
                          : 'bg-white text-black hover:bg-[#ffff00]'
                      }`}
                    >
                      <span aria-hidden="true" className="text-[10px]">
                        {isSelected ? '■' : '□'}
                      </span>
                      <span>{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 2: EU Size Availability Filter */}
            <div className="p-5 max-[720px]:p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-black mr-1 whitespace-nowrap">
                  Stocked EU Size:
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSizeFilter(null)}
                  aria-pressed={activeSizeFilter === null}
                  className={`h-9 px-3 border-2 border-black text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSizeFilter === null
                      ? 'bg-[#0000ff] text-white focus-on-dark'
                      : 'bg-white text-black hover:bg-[#ffff00]'
                  }`}
                >
                  {activeSizeFilter === null ? '■ All' : 'All'}
                </button>
                {ALL_EU_SIZES.map((size) => {
                  const active = activeSizeFilter === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeFilterClick(size)}
                      aria-pressed={active}
                      aria-label={`Filter by EU size ${size}`}
                      className={`w-9 h-9 border-2 border-black text-xs font-extrabold tabular-nums flex items-center justify-center shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#0000ff] text-white underline decoration-2 underline-offset-2 focus-on-dark'
                          : 'bg-white text-black hover:bg-[#ffff00]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Search & Sort Ledger Controls */}
            <div className="p-5 max-[720px]:p-4 bg-[#e8e8e8] grid grid-cols-1 min-[721px]:grid-cols-[1fr_auto] gap-3 items-center">
              <div className="relative flex items-center">
                <Search
                  className="w-4 h-4 text-black absolute left-3 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search model, leather, or sole construction..."
                  aria-label="Search footwear catalog"
                  className="w-full h-10 pl-9 pr-9 border-2 border-black bg-white text-sm font-medium text-black placeholder:text-black/50"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="w-7 h-7 absolute right-1.5 flex items-center justify-center text-black hover:bg-[#ffff00] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="catalog-sort"
                  className="text-xs font-extrabold text-black whitespace-nowrap shrink-0"
                >
                  Order:
                </label>
                <select
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-10 px-3 border-2 border-black bg-white text-xs font-extrabold text-black cursor-pointer"
                >
                  <option value={SortOption.FEATURED}>Atelier Sequence (01–06)</option>
                  <option value={SortOption.PRICE_ASC}>Price: Low to High</option>
                  <option value={SortOption.PRICE_DESC}>Price: High to Low</option>
                  <option value={SortOption.LIGHTEST}>Mass: Lightest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Ruled Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 max-[720px]:p-6 bg-[#f5f4ee] flex flex-col items-start gap-4">
            <div className="text-xs font-extrabold text-black">
              0 Models Match Current Selection
            </div>
            <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-black">
              No footwear silhouettes match your active filter combination.
            </h3>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-3 border-4 border-black bg-[#ffff00] text-sm font-extrabold text-black hover:bg-black hover:text-white cursor-pointer"
            >
              Restore All 6 Models
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[721px]:grid-cols-2 min-[1051px]:grid-cols-3 bg-black gap-[4px]">
            {filteredProducts.map((product) => {
              const activeSize =
                selectedSizes[product.id] ?? product.availableSizes[0];
              const activeColorwayId =
                selectedColorways[product.id] ?? product.colorways[0].id;
              const activeColorway =
                product.colorways.find((c) => c.id === activeColorwayId) ??
                product.colorways[0];
              const isJustAdded = justAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="bg-[#f5f4ee] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Metadata Strip (Unboxed text with · separator) */}
                    <div className="px-4 py-2.5 border-b-2 border-black bg-[#f5f4ee] flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-black/80">
                        <span className="font-extrabold text-black tabular-nums">
                          {product.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{product.category}</span>
                      </div>
                      <span className="font-extrabold text-black">
                        {product.statusNote}
                      </span>
                    </div>

                    {/* Plainly Bounded Rectangular Footwear Image */}
                    <button
                      type="button"
                      onClick={() =>
                        onInspectProduct(product, activeSize, activeColorway.id)
                      }
                      aria-label={`Inspect ${product.name} details`}
                      className="block w-full aspect-[4/3] border-b-4 border-black bg-[#e8e8e8] overflow-hidden cursor-pointer relative group"
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackIndex={product.index}
                        fallbackLabel={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 border-2 border-black bg-white text-xs font-extrabold text-black opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                        Open Blueprint →
                      </span>
                    </button>

                    {/* Divided Title & Price Cells */}
                    <div className="grid grid-cols-[1fr_auto] border-b-2 border-black bg-white">
                      <div className="p-4 border-r-2 border-black">
                        <h3 className="text-xl font-extrabold tracking-[-0.03em] text-black leading-tight">
                          <button
                            type="button"
                            onClick={() =>
                              onInspectProduct(
                                product,
                                activeSize,
                                activeColorway.id
                              )
                            }
                            className="text-left hover:underline decoration-2 underline-offset-4 cursor-pointer"
                          >
                            {product.name}
                          </button>
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-black/75 line-clamp-2">
                          {product.shortSummary}
                        </p>
                      </div>

                      <div className="px-4 py-4 bg-[#f5f4ee] flex flex-col justify-center items-end shrink-0">
                        <span className="text-xl font-extrabold tabular-nums text-black">
                          ${product.price}
                        </span>
                        <span className="mt-0.5 text-[11px] font-bold tabular-nums text-black/70">
                          {product.weightGrams}g · {product.dropMm}mm
                        </span>
                      </div>
                    </div>

                    {/* Colorway Selector Cell (Explicit labels + dual plane swatch, never color alone) */}
                    <div className="px-4 py-3 border-b-2 border-black bg-[#f5f4ee]">
                      <div className="flex items-center justify-between gap-2 text-xs mb-2">
                        <span className="font-bold text-black/75">Colorway</span>
                        <span className="font-extrabold text-black tabular-nums">
                          {activeColorway.label} ({activeColorway.code})
                        </span>
                      </div>
                      <div
                        role="group"
                        aria-label={`${product.name} colorways`}
                        className="flex flex-wrap gap-1.5"
                      >
                        {product.colorways.map((cw) => {
                          const selected = cw.id === activeColorway.id;
                          return (
                            <button
                              key={cw.id}
                              type="button"
                              onClick={() =>
                                setSelectedColorways((prev) => ({
                                  ...prev,
                                  [product.id]: cw.id,
                                }))
                              }
                              aria-pressed={selected}
                              className={`h-8 px-2.5 border-2 border-black text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                                selected
                                  ? 'bg-black text-white font-extrabold'
                                  : 'bg-white text-black hover:bg-[#ffff00]'
                              }`}
                            >
                              <span
                                aria-hidden="true"
                                className="inline-flex w-4 h-4 border border-black shrink-0 overflow-hidden"
                              >
                                <span
                                  className={`w-1/2 h-full ${SWATCH_BG[cw.swatchPrimary]}`}
                                />
                                <span
                                  className={`w-1/2 h-full ${SWATCH_BG[cw.swatchSecondary]}`}
                                />
                              </span>
                              <span>
                                {selected ? '■ ' : ''}
                                {cw.code}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* EU Size Selector Ruled Matrix */}
                    <div className="px-4 py-3 border-b-2 border-black bg-[#f5f4ee]">
                      <div className="flex items-center justify-between gap-2 text-xs mb-2">
                        <span className="font-bold text-black/75">
                          EU Size{' '}
                          <strong className="font-extrabold text-black tabular-nums">
                            ({activeSize})
                          </strong>
                        </span>
                        <a
                          href="#fit-guide"
                          className="font-extrabold text-black underline decoration-2 underline-offset-2 hover:bg-[#ffff00] px-1"
                        >
                          Size Chart
                        </a>
                      </div>

                      <div
                        role="group"
                        aria-label={`${product.name} EU sizes`}
                        className="grid grid-cols-9 border-2 border-black divide-x-2 divide-black bg-white"
                      >
                        {ALL_EU_SIZES.map((size) => {
                          const stocked = product.availableSizes.includes(size);
                          const selected = stocked && activeSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              disabled={!stocked}
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [product.id]: size,
                                }))
                              }
                              aria-pressed={selected}
                              aria-label={
                                stocked
                                  ? `Select EU size ${size}`
                                  : `EU size ${size} unavailable`
                              }
                              className={`h-9 text-xs tabular-nums flex flex-col items-center justify-center relative ${
                                !stocked
                                  ? 'bg-[#e8e8e8] text-black/40 bauhaus-diagonal-strike cursor-not-allowed font-medium'
                                  : selected
                                  ? 'bg-black text-white font-extrabold cursor-pointer'
                                  : 'bg-white text-black font-bold hover:bg-[#ffff00] cursor-pointer'
                              }`}
                            >
                              {selected && (
                                <span
                                  aria-hidden="true"
                                  className="w-1.5 h-1.5 bg-[#ffff00] mb-0.5"
                                />
                              )}
                              <span>{size}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Bar: Rectangular Inspect Control + Circular Add Action */}
                  <div className="p-4 bg-[#f5f4ee] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onInspectProduct(product, activeSize, activeColorway.id)
                      }
                      className="flex-1 h-12 px-4 border-2 border-black bg-white text-black text-sm font-extrabold whitespace-nowrap shrink-0 cursor-pointer hover:bg-black hover:text-white active:bg-[#0000ff] active:text-white"
                    >
                      Inspect Spec
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCardQuickAdd(product)}
                      aria-label={`Add ${product.name} EU ${activeSize} to bag`}
                      className={`w-14 h-14 rounded-full border-3 border-black shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] flex flex-col items-center justify-center shrink-0 cursor-pointer ${
                        isJustAdded
                          ? 'bg-[#0000ff] text-white focus-on-dark'
                          : 'bg-[#ffff00] text-black hover:bg-[#ff0000] hover:text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                          <span className="text-[10px] font-extrabold leading-none mt-0.5">
                            Added
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-extrabold leading-none">
                            + Bag
                          </span>
                          <span className="text-[10px] font-bold tabular-nums leading-none mt-0.5">
                            EU {activeSize}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}

            {/* Architectural Remainder Planes so Black Grid Seams Stay Continuous on Partial Filters */}
            {filteredProducts.length % 3 !== 0 && (
              <div
                aria-hidden="true"
                className={`hidden min-[1051px]:flex bg-[#e8e8e8] p-8 flex-col justify-between ${
                  filteredProducts.length % 3 === 1 ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-black/70">
                    Dessau Modular Archive
                  </span>
                  <span className="w-5 h-5 border-2 border-black bg-[#0000ff]" />
                </div>
                <p className="text-lg font-extrabold tracking-[-0.03em] text-black">
                  Filtered view active ({filteredProducts.length} of{' '}
                  {products.length} silhouettes shown).
                </p>
              </div>
            )}

            {filteredProducts.length % 2 !== 0 && (
              <div
                aria-hidden="true"
                className="hidden min-[721px]:max-[1050px]:flex bg-[#e8e8e8] p-6 flex-col justify-between col-span-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-black/70">
                    Dessau Modular Archive
                  </span>
                  <span className="w-5 h-5 border-2 border-black bg-[#0000ff]" />
                </div>
                <p className="text-base font-extrabold tracking-[-0.03em] text-black">
                  Filtered view active ({filteredProducts.length} of{' '}
                  {products.length} silhouettes shown).
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
