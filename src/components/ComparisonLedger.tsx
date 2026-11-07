import { useState } from 'react';
import { LedgerFilter, Product } from '../types';

interface ComparisonLedgerProps {
  products: Product[];
  onInspectProduct: (product: Product) => void;
}

export function ComparisonLedger({
  products,
  onInspectProduct,
}: ComparisonLedgerProps) {
  const [filter, setFilter] = useState<LedgerFilter>(LedgerFilter.ALL);

  const visibleRows = products.filter((p) => {
    if (filter === LedgerFilter.LOW_DROP) {
      return p.dropMm <= 4;
    }
    if (filter === LedgerFilter.RESOLEABLE) {
      return p.resoleable;
    }
    return true;
  });

  const filterButtons: { id: LedgerFilter; label: string }[] = [
    { id: LedgerFilter.ALL, label: 'All 6 Silhouettes' },
    { id: LedgerFilter.LOW_DROP, label: 'Zero / Low Drop (≤ 4mm)' },
    { id: LedgerFilter.RESOLEABLE, label: 'Workshop Resoleable' },
  ];

  return (
    <section
      id="ledger"
      aria-labelledby="ledger-heading"
      className="border-b-4 border-black bg-[#f5f4ee]"
    >
      <div className="max-w-[1440px] mx-auto min-[1441px]:border-x-4 border-black">
        {/* Ledger Header Strip */}
        <div className="p-8 max-[1050px]:p-6 max-[720px]:p-5 border-b-4 border-black bg-[#f5f4ee] flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-extrabold text-black/75">
              04 · Horizontal Capability Matrix
            </div>
            <h2
              id="ledger-heading"
              className="mt-1.5 text-3xl max-[720px]:text-2xl font-extrabold tracking-[-0.04em] text-black"
            >
              Silhouette Specification Ledger
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter specification ledger"
            className="flex flex-wrap gap-2"
          >
            {filterButtons.map((btn) => {
              const active = filter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setFilter(btn.id)}
                  aria-pressed={active}
                  className={`h-10 px-4 border-2 border-black text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-[#ffff00]'
                  }`}
                >
                  {active ? `■ ${btn.label}` : `□ ${btn.label}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Broad Horizontal Comparison Table */}
        <div className="overflow-x-auto bg-white">
          <table className="w-full min-w-[920px] border-collapse text-left">
            <thead>
              <tr className="border-b-4 border-black bg-[#e8e8e8] text-xs font-extrabold text-black">
                <th scope="col" className="p-4 border-r-2 border-black">
                  Silhouette
                </th>
                <th scope="col" className="p-4 border-r-2 border-black">
                  Upper Hide / Textile
                </th>
                <th scope="col" className="p-4 border-r-2 border-black">
                  Sole &amp; Cushioning
                </th>
                <th scope="col" className="p-4 border-r-2 border-black">
                  Stack / Drop
                </th>
                <th scope="col" className="p-4 border-r-2 border-black">
                  Mass (EU 42)
                </th>
                <th scope="col" className="p-4 border-r-2 border-black">
                  Recraft / Sustainability
                </th>
                <th scope="col" className="p-4 border-r-2 border-black">
                  Price
                </th>
                <th scope="col" className="p-4">
                  Configure
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black text-sm">
              {visibleRows.map((product) => (
                <tr
                  key={product.id}
                  className="bg-[#f5f4ee] hover:bg-white"
                >
                  <td className="p-4 border-r-2 border-black">
                    <div className="font-extrabold tracking-[-0.02em] text-black">
                      <span className="tabular-nums mr-1.5">{product.index}.</span>
                      {product.name}
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-black/70">
                      {product.category} · {product.lastCode}
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs font-medium text-black/90">
                    {product.upperMaterial}
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs font-medium text-black/90">
                    {product.soleCompound}
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs font-extrabold tabular-nums text-black whitespace-nowrap">
                    {product.stackMm} mm / {product.dropMm} mm
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs font-extrabold tabular-nums text-black whitespace-nowrap">
                    {product.weightGrams} g
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs">
                    <div className="font-extrabold text-black">
                      {product.resoleable ? '■ Full Resole' : '□ Tread Cap'}
                    </div>
                    <div className="text-black/75 mt-0.5">
                      {product.resoleMethod}
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black text-base font-extrabold tabular-nums text-black whitespace-nowrap">
                    ${product.price}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onInspectProduct(product)}
                      className="h-9 px-3.5 border-2 border-black bg-[#ffff00] text-xs font-extrabold text-black hover:bg-[#0000ff] hover:text-white cursor-pointer whitespace-nowrap"
                    >
                      Select Pair →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
