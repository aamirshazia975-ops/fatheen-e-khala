import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  DISCLOSURE_ENTRIES,
  EDITORIAL_LOOKBOOK_IMAGE,
  SIZE_CHART,
} from '../data/products';
import { ResilientImage } from './ResilientImage';

export function EditorialCraftSection() {
  const [openDisclosureId, setOpenDisclosureId] = useState<string>(
    DISCLOSURE_ENTRIES[0].id
  );
  const [selectedEu, setSelectedEu] = useState<number>(42);

  const activeSizeRow =
    SIZE_CHART.find((row) => row.eu === selectedEu) ?? SIZE_CHART[5];

  const toggleDisclosure = (id: string) => {
    setOpenDisclosureId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="border-b-4 border-black bg-[#f5f4ee]"
    >
      <div className="max-w-[1440px] mx-auto min-[1441px]:border-x-4 border-black grid grid-cols-1 min-[1051px]:grid-cols-[0.92fr_1.08fr] items-stretch">
        {/* Left Plane: Editorial Footwear Imagery in Plainly Bounded Rectangle + Sole Anatomy */}
        <div className="p-10 max-[1050px]:p-7 max-[720px]:p-5 min-[1051px]:border-r-4 max-[1050px]:border-b-4 border-black bg-[#f5f4ee] flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-black/75">
              <span>02 · Structural Discipline</span>
              <span aria-hidden="true">·</span>
              <span>Dessau Concrete Study</span>
            </div>
            <h2
              id="craft-heading"
              className="mt-2 text-3xl max-[720px]:text-2xl font-extrabold leading-[1.03] tracking-[-0.04em] text-black text-balance"
            >
              Every Seam Carries Load. Zero Ornamental Molding.
            </h2>
          </div>

          {/* Varied Proportion Bounded Editorial Frame (3:4 Portrait) */}
          <figure className="border-4 border-black bg-[#e8e8e8]">
            <div className="aspect-[3/4] max-h-[520px] w-full overflow-hidden border-b-4 border-black">
              <ResilientImage
                src={EDITORIAL_LOOKBOOK_IMAGE}
                alt="Architectural lookbook photograph of Bauhaus color-blocked leather sneakers ascending brutalist concrete stairs."
                fallbackIndex="02"
                fallbackLabel="Dessau Concrete Stride"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="p-4 bg-white flex items-center justify-between gap-4 text-xs">
              <span className="font-bold text-black/80">
                Study IV — Raw Concrete Stairwell, Dessau-Roßlau
              </span>
              <span className="font-extrabold tabular-nums text-black shrink-0">
                Last 04 / 360° Stitch
              </span>
            </figcaption>
          </figure>

          {/* 3-Layer Modular Anatomy Strip */}
          <div className="border-4 border-black bg-white divide-y-2 divide-black">
            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-xs font-extrabold text-black">
                Layer A · Full-Thickness Drum-Dyed Hide
              </span>
              <span className="w-4 h-4 bg-[#ff0000] border-2 border-black shrink-0" aria-hidden="true" />
            </div>
            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-xs font-extrabold text-black">
                Layer B · Removable 3mm Portuguese Cork-Latex Shim
              </span>
              <span className="w-4 h-4 bg-[#ffff00] border-2 border-black shrink-0" aria-hidden="true" />
            </div>
            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-xs font-extrabold text-black">
                Layer C · Mechanically Stitched Natural Rubber Outsole
              </span>
              <span className="w-4 h-4 bg-[#0000ff] border-2 border-black shrink-0" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Right Plane: Ruled Craft Disclosures + Interactive Mondopoint Fit Guide */}
        <div className="flex flex-col justify-between bg-[#f5f4ee]">
          {/* Top Sub-Plane: Ruled Disclosure Rows with Plus / Minus */}
          <div className="border-b-4 border-black">
            <div className="px-8 max-[1050px]:px-6 max-[720px]:px-5 py-5 bg-[#0000ff] text-white border-b-4 border-black flex items-center justify-between gap-4">
              <h3 className="text-lg font-extrabold tracking-[-0.02em]">
                Engineering &amp; Workshop Specifications
              </h3>
              <span className="text-xs font-extrabold tabular-nums whitespace-nowrap">
                01 — 04
              </span>
            </div>

            <div className="divide-y-2 divide-black">
              {DISCLOSURE_ENTRIES.map((entry) => {
                const expanded = openDisclosureId === entry.id;
                return (
                  <div key={entry.id} className="bg-[#f5f4ee]">
                    <button
                      type="button"
                      onClick={() => toggleDisclosure(entry.id)}
                      aria-expanded={expanded}
                      aria-controls={`disclosure-panel-${entry.id}`}
                      className={`w-full px-8 max-[1050px]:px-6 max-[720px]:px-5 py-5 flex items-center justify-between gap-4 text-left cursor-pointer ${
                        expanded ? 'bg-white' : 'hover:bg-[#e8e8e8]'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm font-extrabold tabular-nums text-black">
                          {entry.index}.
                        </span>
                        <span className="text-base font-extrabold tracking-[-0.02em] text-black">
                          {entry.title}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`w-9 h-9 border-2 border-black flex items-center justify-center shrink-0 ${
                          expanded
                            ? 'bg-[#ffff00] text-black'
                            : 'bg-white text-black'
                        }`}
                      >
                        {expanded ? (
                          <Minus className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[3]" />
                        )}
                      </span>
                    </button>

                    {expanded && (
                      <div
                        id={`disclosure-panel-${entry.id}`}
                        className="px-8 max-[1050px]:px-6 max-[720px]:px-5 pb-6 pt-2 bg-white border-t-2 border-black space-y-3"
                      >
                        <p className="text-sm font-bold text-black">
                          {entry.summary}
                        </p>
                        <ul className="space-y-2 text-sm text-black/85">
                          {entry.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2.5">
                              <span
                                aria-hidden="true"
                                className="font-extrabold text-black mt-0.5"
                              >
                                ▪
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Sub-Plane: Interactive Fit & Mondopoint Size Matrix */}
          <div
            id="fit-guide"
            className="p-8 max-[1050px]:p-6 max-[720px]:p-5 bg-[#f5f4ee] space-y-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-xs font-extrabold text-black/75">
                  03 · Interactive Fit Calibrator
                </div>
                <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.03em] text-black">
                  Dessau Last &amp; Mondopoint Conversion
                </h3>
              </div>
              <span className="text-xs font-bold text-black/80">
                Select EU size below to inspect exact foot length
              </span>
            </div>

            {/* Interactive EU Selector Row */}
            <div
              role="group"
              aria-label="Inspect size equivalents by EU size"
              className="grid grid-cols-9 border-2 border-black divide-x-2 divide-black bg-white"
            >
              {SIZE_CHART.map((row) => {
                const active = row.eu === selectedEu;
                return (
                  <button
                    key={row.eu}
                    type="button"
                    onClick={() => setSelectedEu(row.eu)}
                    aria-pressed={active}
                    className={`h-11 text-xs font-extrabold tabular-nums flex flex-col items-center justify-center cursor-pointer ${
                      active
                        ? 'bg-[#ff0000] text-white focus-on-dark'
                        : 'bg-white text-black hover:bg-[#ffff00]'
                    }`}
                  >
                    <span>{active ? `▪ ${row.eu}` : row.eu}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Size Readout Card */}
            <div className="border-4 border-black bg-white grid grid-cols-2 min-[560px]:grid-cols-5 divide-y-2 min-[560px]:divide-y-0 min-[560px]:divide-x-2 divide-black">
              <div className="p-3.5 bg-[#ffff00]">
                <div className="text-[11px] font-bold text-black/80">EU Standard</div>
                <div className="mt-0.5 text-xl font-extrabold tabular-nums text-black">
                  EU {activeSizeRow.eu}
                </div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] font-bold text-black/70">Foot Length</div>
                <div className="mt-0.5 text-xl font-extrabold tabular-nums text-black">
                  {activeSizeRow.mondoCm} cm
                </div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] font-bold text-black/70">US Men</div>
                <div className="mt-0.5 text-xl font-extrabold tabular-nums text-black">
                  {activeSizeRow.usMen}
                </div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] font-bold text-black/70">US Women</div>
                <div className="mt-0.5 text-xl font-extrabold tabular-nums text-black">
                  {activeSizeRow.usWomen}
                </div>
              </div>
              <div className="p-3.5 col-span-2 min-[560px]:col-span-1">
                <div className="text-[11px] font-bold text-black/70">UK</div>
                <div className="mt-0.5 text-xl font-extrabold tabular-nums text-black">
                  {activeSizeRow.uk}
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-black/80">
              <strong className="font-extrabold text-black">Studio Fit Note:</strong>{' '}
              Measure heel-to-longest-toe standing against a wall. Add 0.8 cm
              internal allowance; if between two integers, choose the larger EU size.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
