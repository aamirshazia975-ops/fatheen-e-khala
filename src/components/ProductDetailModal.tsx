import { useEffect, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { ALL_EU_SIZES, SIZE_CHART } from '../data/products';
import { ColorwayOption, Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  initialSize?: number;
  initialColorwayId?: string;
  onClose: () => void;
  onAddToBag: (
    product: Product,
    sizeEu: number,
    colorway: ColorwayOption,
    quantity: number,
    openCheckoutImmediately: boolean
  ) => void;
}

const SWATCH_BG: Record<ColorwayOption['swatchPrimary'], string> = {
  red: 'bg-[#ff0000]',
  blue: 'bg-[#0000ff]',
  yellow: 'bg-[#ffff00]',
  black: 'bg-black',
  chalk: 'bg-[#f5f4ee]',
};

export function ProductDetailModal({
  product,
  initialSize,
  initialColorwayId,
  onClose,
  onAddToBag,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(42);
  const [selectedColorwayId, setSelectedColorwayId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (!product) return;
    const defaultSize =
      initialSize && product.availableSizes.includes(initialSize)
        ? initialSize
        : product.availableSizes.includes(42)
        ? 42
        : product.availableSizes[0];
    setSelectedSize(defaultSize);
    setSelectedColorwayId(initialColorwayId ?? product.colorways[0].id);
    setQuantity(1);
    setAddedFeedback(false);
  }, [product, initialSize, initialColorwayId]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeColorway =
    product.colorways.find((c) => c.id === selectedColorwayId) ??
    product.colorways[0];

  const sizeInfo = SIZE_CHART.find((s) => s.eu === selectedSize);

  const handleAdd = (openCheckout: boolean) => {
    onAddToBag(product, selectedSize, activeColorway, quantity, openCheckout);
    if (!openCheckout) {
      setAddedFeedback(true);
      window.setTimeout(() => setAddedFeedback(false), 1500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 max-[720px]:p-0 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[1120px] max-h-[92vh] max-[720px]:max-h-screen max-[720px]:min-h-screen overflow-y-auto border-4 border-black bg-[#f5f4ee] flex flex-col">
        {/* Top Modal Header Bar */}
        <div className="sticky top-0 z-10 px-6 max-[720px]:px-4 py-3.5 bg-[#ffff00] border-b-4 border-black flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-black">
            <span className="tabular-nums">Model {product.index}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.lastCode}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product specification dialog"
            className="h-9 px-3 border-2 border-black bg-white text-xs font-extrabold text-black flex items-center gap-1.5 hover:bg-black hover:text-white cursor-pointer shrink-0"
          >
            <span>Close</span>
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Two-Column Contiguous Purchase Layout */}
        <div className="grid grid-cols-1 min-[860px]:grid-cols-[1.05fr_0.95fr] items-stretch">
          {/* Left Column: Gallery + Ruled Technical Spec Sheet */}
          <div className="min-[860px]:border-r-4 max-[859px]:border-b-4 border-black bg-[#f5f4ee] flex flex-col justify-between">
            <div className="aspect-[4/3] w-full bg-[#e8e8e8] border-b-4 border-black overflow-hidden">
              <ResilientImage
                src={product.image}
                alt={product.imageAlt}
                fallbackIndex={product.index}
                fallbackLabel={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Technical Blueprint Specification Matrix */}
            <div className="divide-y-2 divide-black text-xs bg-white">
              <div className="px-5 py-3 bg-[#e8e8e8] font-extrabold text-black">
                Workshop Blueprint Specifications
              </div>
              <div className="grid grid-cols-[140px_1fr] divide-x-2 divide-black">
                <div className="p-3 font-bold text-black/75 bg-[#f5f4ee]">
                  Upper Material
                </div>
                <div className="p-3 font-extrabold text-black">
                  {product.upperMaterial}
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] divide-x-2 divide-black">
                <div className="p-3 font-bold text-black/75 bg-[#f5f4ee]">
                  Lining
                </div>
                <div className="p-3 font-extrabold text-black">
                  {product.liningMaterial}
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] divide-x-2 divide-black">
                <div className="p-3 font-bold text-black/75 bg-[#f5f4ee]">
                  Outsole Compound
                </div>
                <div className="p-3 font-extrabold text-black">
                  {product.soleCompound}
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] divide-x-2 divide-black">
                <div className="p-3 font-bold text-black/75 bg-[#f5f4ee]">
                  Stack / Drop
                </div>
                <div className="p-3 font-extrabold tabular-nums text-black">
                  {product.stackMm} mm Heel · {product.dropMm} mm Drop ·{' '}
                  {product.weightGrams} g (EU 42)
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] divide-x-2 divide-black">
                <div className="p-3 font-bold text-black/75 bg-[#f5f4ee]">
                  Recraft Method
                </div>
                <div className="p-3 font-extrabold text-black">
                  {product.resoleMethod} ({product.origin})
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-7 max-[720px]:p-5 bg-[#f5f4ee] flex flex-col justify-between gap-6">
            <div className="space-y-5">
              {/* Title, Status & Price */}
              <div className="border-b-2 border-black pb-4">
                <div className="flex items-center justify-between gap-2 text-xs font-bold text-black/75">
                  <span>{product.origin}</span>
                  <span className="font-extrabold text-black">
                    {product.statusNote}
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between gap-4">
                  <h2
                    id="pdp-modal-title"
                    className="text-3xl max-[720px]:text-2xl font-extrabold tracking-[-0.04em] text-black"
                  >
                    {product.name}
                  </h2>
                  <span className="text-2xl font-extrabold tabular-nums text-black shrink-0">
                    ${product.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/85">
                  {product.description}
                </p>
              </div>

              {/* Colorway Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-black">
                    01. Select Colorway
                  </span>
                  <span className="font-bold text-black/80">
                    {activeColorway.label} ({activeColorway.code})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.colorways.map((cw) => {
                    const active = cw.id === activeColorway.id;
                    return (
                      <button
                        key={cw.id}
                        type="button"
                        onClick={() => setSelectedColorwayId(cw.id)}
                        aria-pressed={active}
                        className={`p-3 border-2 border-black text-left text-xs flex items-center justify-between gap-2 cursor-pointer ${
                          active
                            ? 'bg-black text-white font-extrabold'
                            : 'bg-white text-black font-bold hover:bg-[#ffff00]'
                        }`}
                      >
                        <span className="truncate">
                          {active ? '■ ' : '□ '}
                          {cw.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="inline-flex w-5 h-5 border border-black shrink-0"
                        >
                          <span
                            className={`w-1/2 h-full ${SWATCH_BG[cw.swatchPrimary]}`}
                          />
                          <span
                            className={`w-1/2 h-full ${SWATCH_BG[cw.swatchSecondary]}`}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* EU Size Selector + Live Equivalent Readout */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-black">
                    02. Select EU Size
                  </span>
                  {sizeInfo && (
                    <span className="font-bold tabular-nums text-black/80">
                      EU {sizeInfo.eu} = {sizeInfo.mondoCm} cm · US M{' '}
                      {sizeInfo.usMen} / W {sizeInfo.usWomen}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-9 border-2 border-black divide-x-2 divide-black bg-white">
                  {ALL_EU_SIZES.map((size) => {
                    const stocked = product.availableSizes.includes(size);
                    const selected = stocked && selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!stocked}
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={selected}
                        aria-label={
                          stocked
                            ? `EU size ${size}`
                            : `EU size ${size} out of stock`
                        }
                        className={`h-11 text-xs tabular-nums flex flex-col items-center justify-center ${
                          !stocked
                            ? 'bg-[#e8e8e8] text-black/40 bauhaus-diagonal-strike cursor-not-allowed'
                            : selected
                            ? 'bg-[#0000ff] text-white font-extrabold focus-on-dark cursor-pointer'
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

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <span className="text-xs font-extrabold text-black">
                  03. Pair Quantity
                </span>
                <div className="inline-flex items-center border-2 border-black bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 flex items-center justify-center border-r-2 border-black hover:bg-[#ffff00] cursor-pointer"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="w-12 text-center text-sm font-extrabold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(6, q + 1))}
                    aria-label="Increase quantity"
                    className="w-10 h-10 flex items-center justify-center border-l-2 border-black hover:bg-[#ffff00] cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Purchase Actions: Circular Add + Rectangular Direct Checkout */}
            <div className="pt-5 border-t-4 border-black flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleAdd(true)}
                className="flex-1 min-w-[180px] h-14 px-6 border-4 border-black bg-[#0000ff] text-white text-sm font-extrabold tracking-[-0.01em] whitespace-nowrap cursor-pointer hover:bg-black active:bg-[#ffff00] active:text-black focus-on-dark"
              >
                Buy Now · ${product.price * quantity} →
              </button>

              <button
                type="button"
                onClick={() => handleAdd(false)}
                className={`w-24 h-24 rounded-full border-4 border-black shadow-[6px_6px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_#000000] flex flex-col items-center justify-center text-center p-2 shrink-0 cursor-pointer ${
                  addedFeedback
                    ? 'bg-black text-white focus-on-dark'
                    : 'bg-[#ffff00] text-black hover:bg-[#ff0000] hover:text-white'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span className="text-[11px] font-extrabold mt-0.5">
                      In Bag
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-extrabold leading-tight">
                      Add to
                      <br />
                      Bag
                    </span>
                    <span className="text-[10px] font-bold tabular-nums mt-0.5">
                      EU {selectedSize}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
