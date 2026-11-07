import { useEffect, useState } from 'react';
import { CatalogSection } from './components/CatalogSection';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { ComparisonLedger } from './components/ComparisonLedger';
import { EditorialCraftSection } from './components/EditorialCraftSection';
import { FooterSection } from './components/FooterSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PRODUCTS } from './data/products';
import { CartItem, CheckoutStep, ColorwayOption, Product } from './types';

const CART_STORAGE_KEY = 'bauhaus_footwear_bag_v1';

export default function App() {
  const [bagItems, setBagItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage parse issues in restricted environments
    }
    return [];
  });

  const [inspectedState, setInspectedState] = useState<{
    product: Product;
    size?: number;
    colorwayId?: string;
  } | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerInitialStep, setDrawerInitialStep] = useState<CheckoutStep>(
    CheckoutStep.BAG
  );

  const [recentBanner, setRecentBanner] = useState<{
    name: string;
    sizeEu: number;
    colorwayLabel: string;
  } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(bagItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [bagItems]);

  const totalBagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);
  const flagshipProduct = PRODUCTS[0];

  const handleAddToBag = (
    product: Product,
    sizeEu: number,
    colorway: ColorwayOption,
    quantity = 1,
    openCheckoutImmediately = false
  ) => {
    const itemKey = `${product.id}__${colorway.id}__${sizeEu}`;

    setBagItems((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          productId: product.id,
          name: product.name,
          index: product.index,
          price: product.price,
          image: product.image,
          imageAlt: product.imageAlt,
          sizeEu,
          colorwayId: colorway.id,
          colorwayLabel: colorway.label,
          quantity,
        },
      ];
    });

    if (openCheckoutImmediately) {
      setInspectedState(null);
      setDrawerInitialStep(CheckoutStep.SHIPPING);
      setDrawerOpen(true);
    } else {
      setRecentBanner({
        name: product.name,
        sizeEu,
        colorwayLabel: colorway.label,
      });
    }
  };

  useEffect(() => {
    if (!recentBanner) return;
    const timer = window.setTimeout(() => {
      setRecentBanner(null);
    }, 3800);
    return () => window.clearTimeout(timer);
  }, [recentBanner]);

  const handleUpdateQuantity = (key: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setBagItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const handleOpenBag = (step: CheckoutStep = CheckoutStep.BAG) => {
    setRecentBanner(null);
    setDrawerInitialStep(step);
    setDrawerOpen(true);
  };

  const handleFooterCircleAction = () => {
    if (totalBagCount > 0) {
      handleOpenBag(CheckoutStep.BAG);
    } else {
      document.getElementById('catalog')?.scrollIntoView();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4ee] text-black flex flex-col">
      <Header
        bagCount={totalBagCount}
        onOpenBag={() => handleOpenBag(CheckoutStep.BAG)}
      />

      {/* Instant Rectangular Confirmation Bar on Quick-Add */}
      {recentBanner && !drawerOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 max-[720px]:left-4 max-[720px]:right-4 z-30 border-4 border-black bg-[#ffff00] p-4 flex items-center justify-between gap-4 max-w-md"
        >
          <div className="text-xs">
            <div className="font-extrabold text-black">
              ■ Added to Atelier Bag
            </div>
            <div className="font-bold text-black/85 mt-0.5">
              {recentBanner.name} · {recentBanner.colorwayLabel} · EU{' '}
              {recentBanner.sizeEu}
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleOpenBag(CheckoutStep.BAG)}
            className="h-9 px-3.5 border-2 border-black bg-black text-white text-xs font-extrabold whitespace-nowrap shrink-0 hover:bg-[#0000ff] cursor-pointer focus-on-dark"
          >
            Open Bag ({totalBagCount}) →
          </button>
        </div>
      )}

      <main className="flex-1">
        <HeroSection
          flagshipProduct={flagshipProduct}
          onInspectProduct={(product) => setInspectedState({ product })}
          onQuickConfigureFlagship={() =>
            setInspectedState({ product: flagshipProduct })
          }
        />

        <CatalogSection
          products={PRODUCTS}
          onInspectProduct={(product, size, colorwayId) =>
            setInspectedState({ product, size, colorwayId })
          }
          onAddToBag={(product, sizeEu, colorway) =>
            handleAddToBag(product, sizeEu, colorway, 1, false)
          }
        />

        <EditorialCraftSection />

        <ComparisonLedger
          products={PRODUCTS}
          onInspectProduct={(product) => setInspectedState({ product })}
        />
      </main>

      <FooterSection
        bagCount={totalBagCount}
        onPrimaryCircleAction={handleFooterCircleAction}
      />

      <ProductDetailModal
        product={inspectedState?.product ?? null}
        initialSize={inspectedState?.size}
        initialColorwayId={inspectedState?.colorwayId}
        onClose={() => setInspectedState(null)}
        onAddToBag={handleAddToBag}
      />

      <CheckoutDrawer
        isOpen={drawerOpen}
        initialStep={drawerInitialStep}
        items={bagItems}
        onClose={() => setDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />
    </div>
  );
}
