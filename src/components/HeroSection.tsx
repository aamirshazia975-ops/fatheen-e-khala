import { Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  flagshipProduct: Product;
  onInspectProduct: (product: Product) => void;
  onQuickConfigureFlagship: () => void;
}

export function HeroSection({
  flagshipProduct,
  onInspectProduct,
  onQuickConfigureFlagship,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="border-b-4 border-black bg-[#f5f4ee]"
    >
      <div className="max-w-[1440px] mx-auto min-[1441px]:border-x-4 border-black grid grid-cols-1 min-[721px]:grid-cols-[1.35fr_1fr] min-[1051px]:grid-cols-[1.68fr_1fr] items-stretch">
        {/* Broad Off-White Text Plane */}
        <div className="bg-[#f5f4ee] p-12 max-[1050px]:p-7 max-[720px]:p-5 min-[721px]:border-r-4 max-[720px]:border-b-4 border-black flex flex-col justify-between gap-10 max-[1050px]:gap-7">
          <div className="space-y-6 max-[1050px]:space-y-5">
            {/* Unboxed Metadata Kicker */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-bold text-black/80">
              <span>Dessau Footwear Workshop</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter Issue</span>
              <span aria-hidden="true">·</span>
              <span>6 Modular Silhouettes</span>
            </div>

            {/* Heavy Tightly-Tracked Display Headline */}
            <h1
              id="hero-heading"
              className="text-[clamp(2.4rem,4.6vw,4.35rem)] font-extrabold leading-[0.97] tracking-[-0.04em] text-black text-balance max-w-2xl"
            >
              Constructivist Form Built for Human Stride.
            </h1>

            {/* Calm Reading Copy */}
            <p className="text-base max-[720px]:text-[15px] leading-[1.6] text-black/85 max-w-[62ch]">
              Flat architectural leather planes, drum-dyed European calfskin, and
              mechanically stitched natural rubber soles. Engineered on anatomical
              Dessau lasts with zero decorative molding and full workshop
              recraftability.
            </p>

            {/* Blue Rectangular Secondary Shop Trigger + Spec Ledger Link */}
            <div className="flex flex-wrap items-center gap-5 max-[1050px]:gap-3.5 pt-1">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-6 py-3.5 border-4 border-black bg-[#0000ff] text-white text-sm font-extrabold tracking-[-0.01em] whitespace-nowrap shrink-0 hover:bg-black active:bg-[#ffff00] active:text-black focus-on-dark"
              >
                Explore All 6 Models ↓
              </a>

              <a
                href="#ledger"
                className="inline-flex items-center px-4 py-3.5 border-2 border-black bg-white text-black text-sm font-bold whitespace-nowrap shrink-0 hover:bg-[#ffff00] active:bg-black active:text-white"
              >
                Compare Spec Ledger
              </a>
            </div>
          </div>

          {/* Plainly Bounded Flagship Preview Card */}
          <div className="border-4 border-black bg-white grid grid-cols-1 min-[560px]:grid-cols-[220px_1fr] items-stretch">
            <button
              type="button"
              onClick={() => onInspectProduct(flagshipProduct)}
              aria-label={`Inspect ${flagshipProduct.name}`}
              className="block aspect-[4/3] min-[560px]:aspect-auto border-b-4 min-[560px]:border-b-0 min-[560px]:border-r-4 border-black bg-[#e8e8e8] overflow-hidden cursor-pointer group"
            >
              <ResilientImage
                src={flagshipProduct.image}
                alt={flagshipProduct.imageAlt}
                fallbackIndex={flagshipProduct.index}
                fallbackLabel={flagshipProduct.name}
                className="w-full h-full object-cover"
              />
            </button>

            <div className="p-5 max-[1050px]:p-4 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-bold text-black/75">
                  <span>
                    Model {flagshipProduct.index} · {flagshipProduct.category}
                  </span>
                  <span className="font-extrabold text-black">
                    {flagshipProduct.statusNote}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-extrabold tracking-[-0.03em] text-black">
                    {flagshipProduct.name}
                  </h2>
                  <span className="text-lg font-extrabold tabular-nums text-black shrink-0">
                    ${flagshipProduct.price}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-black/80">
                  {flagshipProduct.shortSummary}
                </p>
              </div>

              <div className="pt-2 border-t-2 border-black flex items-center justify-between gap-3">
                <span className="text-xs font-bold tabular-nums text-black/80">
                  {flagshipProduct.stackMm}mm Stack · {flagshipProduct.dropMm}mm Drop
                </span>
                <button
                  type="button"
                  onClick={() => onInspectProduct(flagshipProduct)}
                  className="text-xs font-extrabold text-black underline decoration-2 underline-offset-4 hover:bg-[#ffff00] px-1.5 py-0.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Inspect Spec →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Narrower Primary Red Action Plane */}
        <div className="bg-[#ff0000] flex flex-col justify-between">
          {/* Top Ruled Bar inside Red Plane */}
          <div className="border-b-4 border-black px-7 max-[1050px]:px-5 py-4 flex items-center justify-between gap-4 text-white">
            <span className="text-sm font-extrabold tracking-[-0.02em] whitespace-nowrap">
              01 / Direct Atelier Issue
            </span>
            <span className="text-sm font-extrabold tabular-nums whitespace-nowrap">
              EU 37 — 45
            </span>
          </div>

          {/* Center White Circular Primary Action with Hard Black Offset Shadow */}
          <div className="flex-1 px-8 py-12 max-[1050px]:px-6 max-[1050px]:py-9 max-[720px]:py-10 flex flex-col items-center justify-center gap-6">
            <button
              type="button"
              onClick={onQuickConfigureFlagship}
              className="w-52 h-52 max-[1050px]:w-44 max-[1050px]:h-44 max-[720px]:w-40 max-[720px]:h-40 rounded-full border-4 border-black bg-white text-black shadow-[8px_8px_0px_#000000] hover:bg-[#ffff00] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0px_#000000] flex flex-col items-center justify-center p-5 text-center cursor-pointer focus-on-dark"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 mb-1.5 shrink-0"
                aria-hidden="true"
              >
                <polygon points="12,3 22,20 2,20" fill="#0000ff" stroke="#000000" strokeWidth="2.5" />
              </svg>
              <span className="text-base max-[720px]:text-sm font-extrabold leading-tight tracking-[-0.03em]">
                Quick Buy
                <br />
                Monolith 01
              </span>
              <span className="mt-1.5 text-xs font-extrabold tabular-nums text-black/80">
                ${flagshipProduct.price} · Select Size
              </span>
            </button>

            <p className="text-xs font-bold text-white text-center max-w-[26ch]">
              Instant size selection &amp; studio courier dispatch from Dessau.
            </p>
          </div>

          {/* Bottom Ruled Architectural Datum Strip */}
          <div className="border-t-4 border-black bg-[#f5f4ee] grid grid-cols-3 divide-x-2 divide-black">
            <div className="p-4 max-[1050px]:p-3">
              <div className="text-xs font-bold text-black/70">Sole Joinery</div>
              <div className="mt-0.5 text-sm font-extrabold tracking-[-0.02em] text-black">
                360° Stitch
              </div>
            </div>
            <div className="p-4 max-[1050px]:p-3">
              <div className="text-xs font-bold text-black/70">Free Courier</div>
              <div className="mt-0.5 text-sm font-extrabold tabular-nums tracking-[-0.02em] text-black">
                From $350
              </div>
            </div>
            <div className="p-4 max-[1050px]:p-3">
              <div className="text-xs font-bold text-black/70">Studio Trial</div>
              <div className="mt-0.5 text-sm font-extrabold tabular-nums tracking-[-0.02em] text-black">
                30 Days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
