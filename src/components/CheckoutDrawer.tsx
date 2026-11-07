import { FormEvent, useEffect, useState } from 'react';
import { AlertTriangle, Check, Copy, Minus, Plus, Trash2, X } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';
import {
  CartItem,
  CheckoutStep,
  ConfirmedOrder,
  PaymentMethod,
  ShippingDetails,
  ShippingMethod,
} from '../types';
import { ResilientImage } from './ResilientImage';

interface CheckoutDrawerProps {
  isOpen: boolean;
  initialStep: CheckoutStep;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearBag: () => void;
}

export function CheckoutDrawer({
  isOpen,
  initialStep,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}: CheckoutDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>(initialStep);

  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'Germany',
    shippingMethod: ShippingMethod.STANDARD,
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CARD
  );
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (confirmedOrder && step === CheckoutStep.CONFIRMED) {
        return;
      }
      setStep(items.length === 0 ? CheckoutStep.BAG : initialStep);
      setErrors([]);
    }
  }, [isOpen, initialStep, items.length, confirmedOrder, step]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const qualifiesFreeStandard = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost =
    items.length === 0
      ? 0
      : shipping.shippingMethod === ShippingMethod.PRIORITY
      ? 28
      : qualifiesFreeStandard
      ? 0
      : 18;
  const total = subtotal + shippingCost;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleShippingSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: string[] = [];
    if (shipping.fullName.trim().length < 2) {
      nextErrors.push('Enter recipient full name.');
    }
    if (!shipping.email.includes('@') || !shipping.email.includes('.')) {
      nextErrors.push('Enter a valid dispatch email address.');
    }
    if (shipping.phone.trim().length < 6) {
      nextErrors.push('Enter a contact telephone number for courier handoff.');
    }
    if (shipping.streetAddress.trim().length < 4) {
      nextErrors.push('Enter street address and building number.');
    }
    if (shipping.city.trim().length < 2) {
      nextErrors.push('Enter destination city.');
    }
    if (shipping.postalCode.trim().length < 3) {
      nextErrors.push('Enter postal or ZIP code.');
    }

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors([]);
    setStep(CheckoutStep.PAYMENT);
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: string[] = [];

    if (paymentMethod === PaymentMethod.CARD) {
      const digitsOnly = cardNumber.replace(/\s+/g, '');
      if (cardName.trim().length < 2) {
        nextErrors.push('Enter cardholder full name.');
      }
      if (!/^\d{13,19}$/.test(digitsOnly)) {
        nextErrors.push('Enter a valid 16-digit card number.');
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry.trim())) {
        nextErrors.push('Enter expiry date in MM/YY format.');
      }
      if (!/^\d{3,4}$/.test(cardCvc.trim())) {
        nextErrors.push('Enter 3 or 4 digit security code.');
      }
    }

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }

    const randomCode = Math.floor(1040 + Math.random() * 8900);
    const order: ConfirmedOrder = {
      orderNumber: `BF-${randomCode}`,
      placedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items: [...items],
      shipping: { ...shipping },
      paymentMethod,
      subtotal,
      shippingCost,
      total,
    };

    setConfirmedOrder(order);
    setErrors([]);
    onClearBag();
    setStep(CheckoutStep.CONFIRMED);
  };

  const handleCopyReceipt = () => {
    if (!confirmedOrder) return;
    const lines = [
      `BAUHAUS FOOTWEAR — ORDER ${confirmedOrder.orderNumber}`,
      `Date: ${confirmedOrder.placedAt}`,
      `Recipient: ${confirmedOrder.shipping.fullName}, ${confirmedOrder.shipping.streetAddress}, ${confirmedOrder.shipping.postalCode} ${confirmedOrder.shipping.city}, ${confirmedOrder.shipping.country}`,
      '---',
      ...confirmedOrder.items.map(
        (i) =>
          `${i.quantity}x ${i.name} (${i.colorwayLabel}, EU ${i.sizeEu}) — $${
            i.price * i.quantity
          }`
      ),
      '---',
      `Total Paid: $${confirmedOrder.total} USD`,
    ];
    navigator.clipboard?.writeText(lines.join('\n'));
    setCopiedReceipt(true);
    window.setTimeout(() => setCopiedReceipt(false), 1800);
  };

  const handleFinishReceipt = () => {
    setConfirmedOrder(null);
    setStep(CheckoutStep.BAG);
    onClose();
  };

  const formatCardNumberInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ') : digits;
  };

  const formatExpiryInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const stepsMeta: { id: CheckoutStep; label: string; index: string }[] = [
    { id: CheckoutStep.BAG, label: 'Bag', index: '01' },
    { id: CheckoutStep.SHIPPING, label: 'Dispatch', index: '02' },
    { id: CheckoutStep.PAYMENT, label: 'Payment', index: '03' },
    { id: CheckoutStep.CONFIRMED, label: 'Receipt', index: '04' },
  ];

  const currentStepIdx = stepsMeta.findIndex((s) => s.id === step);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-drawer-title"
      className="fixed inset-0 z-50 bg-black/75 flex justify-end"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[540px] h-full bg-[#f5f4ee] border-l-4 max-[540px]:border-l-0 border-black flex flex-col justify-between overflow-hidden">
        {/* Drawer Header + Step Ledger */}
        <div className="border-b-4 border-black bg-[#f5f4ee] shrink-0">
          <div className="px-6 max-[720px]:px-4 py-4 bg-black text-white flex items-center justify-between gap-4">
            <h2
              id="checkout-drawer-title"
              className="text-lg font-extrabold tracking-[-0.03em]"
            >
              Atelier Bag &amp; Dispatch
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bag and checkout drawer"
              className="h-9 px-3 border-2 border-white bg-black text-white text-xs font-extrabold flex items-center gap-1.5 hover:bg-[#ff0000] cursor-pointer focus-on-dark"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4-Zone Ruled Step Bar */}
          <div className="grid grid-cols-4 divide-x-2 divide-black border-t-2 border-black bg-white text-xs">
            {stepsMeta.map((s, idx) => {
              const isCurrent = s.id === step;
              const isCompleted = idx < currentStepIdx;
              const canJumpBack =
                isCompleted && step !== CheckoutStep.CONFIRMED;

              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={!canJumpBack}
                  onClick={() => {
                    if (canJumpBack) {
                      setErrors([]);
                      setStep(s.id);
                    }
                  }}
                  className={`py-2.5 px-2 text-center font-extrabold tabular-nums ${
                    isCurrent
                      ? 'bg-[#ffff00] text-black'
                      : isCompleted
                      ? 'bg-[#e8e8e8] text-black hover:bg-[#ffff00] cursor-pointer'
                      : 'bg-white text-black/45 cursor-default'
                  }`}
                >
                  <span>
                    {isCurrent ? '■ ' : isCompleted ? '✓ ' : ''}
                    {s.index}. {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Step Body */}
        <div className="flex-1 overflow-y-auto p-6 max-[720px]:p-4 space-y-5">
          {/* Validation Errors Block (Explicit Icon + Prose, Never Color Alone) */}
          {errors.length > 0 && (
            <div
              role="alert"
              className="border-4 border-black bg-white p-4 space-y-2"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#ff0000]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Please resolve the following fields before continuing:</span>
              </div>
              <ul className="text-xs font-bold text-black space-y-1 pl-6 list-disc">
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* STEP 1: BAG REVIEW */}
          {step === CheckoutStep.BAG && (
            <>
              {/* Free Courier Threshold Bar */}
              <div className="border-2 border-black bg-white p-3.5">
                <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-black">
                  {qualifiesFreeStandard && items.length > 0 ? (
                    <span>■ Complimentary Studio Courier Unlocked ($350+)</span>
                  ) : (
                    <span>
                      Add ${amountToFreeShipping} more for Free Studio Courier
                    </span>
                  )}
                  <span className="tabular-nums">
                    ${Math.min(subtotal, FREE_SHIPPING_THRESHOLD)} / $
                    {FREE_SHIPPING_THRESHOLD}
                  </span>
                </div>
                <div className="mt-2 h-3 border-2 border-black bg-[#e8e8e8] flex">
                  <div
                    className={`h-full bg-[#0000ff] ${
                      subtotal === 0
                        ? 'w-0'
                        : subtotal >= FREE_SHIPPING_THRESHOLD
                        ? 'w-full'
                        : subtotal >= FREE_SHIPPING_THRESHOLD * 0.75
                        ? 'w-3/4'
                        : subtotal >= FREE_SHIPPING_THRESHOLD * 0.5
                        ? 'w-1/2'
                        : 'w-1/4'
                    }`}
                  />
                </div>
              </div>

              {items.length === 0 ? (
                <div className="border-4 border-black bg-white p-8 text-left space-y-4">
                  <div className="text-xs font-extrabold text-black/70">
                    Bag Empty · 0 Pairs Selected
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-black">
                    Select a silhouette and EU size to begin dispatch.
                  </h3>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 border-4 border-black bg-[#ffff00] text-xs font-extrabold text-black hover:bg-black hover:text-white cursor-pointer"
                  >
                    Return to Footwear Catalog →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.key}
                      className="border-4 border-black bg-white grid grid-cols-[104px_1fr]"
                    >
                      <div className="border-r-2 border-black bg-[#e8e8e8] aspect-square overflow-hidden">
                        <ResilientImage
                          src={item.image}
                          alt={item.imageAlt}
                          fallbackIndex={item.index}
                          fallbackLabel={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-3.5 flex flex-col justify-between gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-extrabold tracking-[-0.02em] text-black">
                              {item.name}
                            </div>
                            <div className="mt-0.5 text-xs font-bold text-black/75">
                              {item.colorwayLabel} · EU {item.sizeEu}
                            </div>
                          </div>
                          <span className="text-sm font-extrabold tabular-nums text-black">
                            ${item.price * item.quantity}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-black">
                          <div className="inline-flex items-center border-2 border-black bg-[#f5f4ee]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, -1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="w-7 h-7 flex items-center justify-center border-r-2 border-black hover:bg-[#ffff00] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <span className="w-8 text-center text-xs font-extrabold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="w-7 h-7 flex items-center justify-center border-l-2 border-black hover:bg-[#ffff00] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.key)}
                            aria-label={`Remove ${item.name} from bag`}
                            className="h-7 px-2 border-2 border-black bg-white text-xs font-extrabold text-black flex items-center gap-1 hover:bg-[#ff0000] hover:text-white cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING & DISPATCH FORM */}
          {step === CheckoutStep.SHIPPING && (
            <form
              id="checkout-shipping-form"
              onSubmit={handleShippingSubmit}
              className="space-y-4"
              noValidate
            >
              <div className="border-4 border-black bg-white p-4 space-y-3.5">
                <div className="text-xs font-extrabold text-black border-b-2 border-black pb-2">
                  Recipient &amp; Destination Coordinates
                </div>

                <div>
                  <label
                    htmlFor="ship-name"
                    className="block text-xs font-extrabold text-black mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="ship-name"
                    type="text"
                    required
                    value={shipping.fullName}
                    onChange={(e) =>
                      setShipping({ ...shipping, fullName: e.target.value })
                    }
                    placeholder="Walter Gropius"
                    className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium text-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="ship-email"
                      className="block text-xs font-extrabold text-black mb-1"
                    >
                      Email for Tracking *
                    </label>
                    <input
                      id="ship-email"
                      type="email"
                      required
                      value={shipping.email}
                      onChange={(e) =>
                        setShipping({ ...shipping, email: e.target.value })
                      }
                      placeholder="atelier@dessau.de"
                      className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium text-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ship-phone"
                      className="block text-xs font-extrabold text-black mb-1"
                    >
                      Telephone *
                    </label>
                    <input
                      id="ship-phone"
                      type="tel"
                      required
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping({ ...shipping, phone: e.target.value })
                      }
                      placeholder="+49 340 65080"
                      className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium text-black"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ship-street"
                    className="block text-xs font-extrabold text-black mb-1"
                  >
                    Street Address &amp; Unit *
                  </label>
                  <input
                    id="ship-street"
                    type="text"
                    required
                    value={shipping.streetAddress}
                    onChange={(e) =>
                      setShipping({ ...shipping, streetAddress: e.target.value })
                    }
                    placeholder="Gropiusallee 38"
                    className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium text-black"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="ship-city"
                      className="block text-xs font-extrabold text-black mb-1"
                    >
                      City *
                    </label>
                    <input
                      id="ship-city"
                      type="text"
                      required
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                      placeholder="Dessau"
                      className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium text-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ship-zip"
                      className="block text-xs font-extrabold text-black mb-1"
                    >
                      Postal Code *
                    </label>
                    <input
                      id="ship-zip"
                      type="text"
                      required
                      value={shipping.postalCode}
                      onChange={(e) =>
                        setShipping({ ...shipping, postalCode: e.target.value })
                      }
                      placeholder="06846"
                      className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium text-black tabular-nums"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="ship-country"
                      className="block text-xs font-extrabold text-black mb-1"
                    >
                      Country *
                    </label>
                    <select
                      id="ship-country"
                      value={shipping.country}
                      onChange={(e) =>
                        setShipping({ ...shipping, country: e.target.value })
                      }
                      className="w-full h-10 px-2.5 border-2 border-black bg-[#f5f4ee] text-sm font-bold text-black"
                    >
                      <option value="Germany">Germany</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Courier Speed Selection */}
              <div className="border-4 border-black bg-white p-4 space-y-2.5">
                <div className="text-xs font-extrabold text-black">
                  Select Studio Courier Service
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setShipping({
                      ...shipping,
                      shippingMethod: ShippingMethod.STANDARD,
                    })
                  }
                  aria-pressed={
                    shipping.shippingMethod === ShippingMethod.STANDARD
                  }
                  className={`w-full p-3 border-2 border-black text-left flex items-center justify-between gap-3 cursor-pointer ${
                    shipping.shippingMethod === ShippingMethod.STANDARD
                      ? 'bg-black text-white'
                      : 'bg-[#f5f4ee] text-black hover:bg-[#ffff00]'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-extrabold">
                      {shipping.shippingMethod === ShippingMethod.STANDARD
                        ? '■ '
                        : '□ '}
                      Standard Studio Courier (3–5 Business Days)
                    </div>
                    <div className="opacity-80 mt-0.5">
                      Duties included · Direct from Dessau
                    </div>
                  </div>
                  <span className="text-xs font-extrabold tabular-nums shrink-0">
                    {qualifiesFreeStandard ? 'FREE' : '$18'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShipping({
                      ...shipping,
                      shippingMethod: ShippingMethod.PRIORITY,
                    })
                  }
                  aria-pressed={
                    shipping.shippingMethod === ShippingMethod.PRIORITY
                  }
                  className={`w-full p-3 border-2 border-black text-left flex items-center justify-between gap-3 cursor-pointer ${
                    shipping.shippingMethod === ShippingMethod.PRIORITY
                      ? 'bg-black text-white'
                      : 'bg-[#f5f4ee] text-black hover:bg-[#ffff00]'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-extrabold">
                      {shipping.shippingMethod === ShippingMethod.PRIORITY
                        ? '■ '
                        : '□ '}
                      Priority Air Express (1–2 Business Days)
                    </div>
                    <div className="opacity-80 mt-0.5">
                      Insured air dispatch with signature
                    </div>
                  </div>
                  <span className="text-xs font-extrabold tabular-nums shrink-0">
                    $28
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT & VERIFICATION */}
          {step === CheckoutStep.PAYMENT && (
            <form
              id="checkout-payment-form"
              onSubmit={handlePlaceOrder}
              className="space-y-4"
              noValidate
            >
              {/* Payment Method Selector */}
              <div className="border-4 border-black bg-white p-4 space-y-3">
                <div className="text-xs font-extrabold text-black border-b-2 border-black pb-2">
                  Payment Settlement Method
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: PaymentMethod.CARD, label: 'Card' },
                      { id: PaymentMethod.WIRE, label: 'SEPA / Wire' },
                      { id: PaymentMethod.COD, label: 'Cash (COD)' },
                    ] as const
                  ).map((pm) => {
                    const active = paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => {
                          setErrors([]);
                          setPaymentMethod(pm.id);
                        }}
                        aria-pressed={active}
                        className={`h-10 px-2 border-2 border-black text-xs font-extrabold whitespace-nowrap cursor-pointer ${
                          active
                            ? 'bg-[#0000ff] text-white focus-on-dark'
                            : 'bg-[#f5f4ee] text-black hover:bg-[#ffff00]'
                        }`}
                      >
                        {active ? `■ ${pm.label}` : pm.label}
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === PaymentMethod.CARD && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label
                        htmlFor="pay-card-name"
                        className="block text-xs font-extrabold text-black mb-1"
                      >
                        Name on Card *
                      </label>
                      <input
                        id="pay-card-name"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder={shipping.fullName || 'Lyonel Feininger'}
                        className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium text-black"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pay-card-number"
                        className="block text-xs font-extrabold text-black mb-1"
                      >
                        Card Number *
                      </label>
                      <input
                        id="pay-card-number"
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumberInput(e.target.value))
                        }
                        placeholder="4532 0192 8834 0019"
                        className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium tabular-nums text-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="pay-card-exp"
                          className="block text-xs font-extrabold text-black mb-1"
                        >
                          Expiry (MM/YY) *
                        </label>
                        <input
                          id="pay-card-exp"
                          type="text"
                          inputMode="numeric"
                          value={cardExpiry}
                          onChange={(e) =>
                            setCardExpiry(formatExpiryInput(e.target.value))
                          }
                          placeholder="09/29"
                          className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium tabular-nums text-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pay-card-cvc"
                          className="block text-xs font-extrabold text-black mb-1"
                        >
                          Security Code *
                        </label>
                        <input
                          id="pay-card-cvc"
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) =>
                            setCardCvc(e.target.value.replace(/\D/g, ''))
                          }
                          placeholder="404"
                          className="w-full h-10 px-3 border-2 border-black bg-[#f5f4ee] text-sm font-medium tabular-nums text-black"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === PaymentMethod.WIRE && (
                  <div className="p-3.5 border-2 border-black bg-[#f5f4ee] text-xs space-y-1.5">
                    <div className="font-extrabold text-black">
                      Studio Pro-Forma SEPA / Wire Reservation
                    </div>
                    <p className="text-black/80 leading-relaxed">
                      Your serialized pair(s) are reserved for 48 hours upon
                      confirming below. Wire coordinates for Bauhaus Footwear
                      Dessau GmbH appear on your receipt.
                    </p>
                  </div>
                )}

                {paymentMethod === PaymentMethod.COD && (
                  <div className="p-3.5 border-2 border-black bg-[#ffff00] text-xs space-y-1.5">
                    <div className="font-extrabold text-black">
                      Cash on Delivery (COD) — Exact Amount Due: ${total} USD
                    </div>
                    <p className="text-black/85 leading-relaxed">
                      Pay courier directly upon parcel inspection at{' '}
                      <strong>{shipping.streetAddress}</strong>. Courier will
                      verify recipient phone ({shipping.phone}) prior to arrival.
                    </p>
                  </div>
                )}
              </div>

              {/* Dispatch Summary Verification */}
              <div className="border-2 border-black bg-white p-4 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-black">
                    Dispatching To
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(CheckoutStep.SHIPPING)}
                    className="font-extrabold underline cursor-pointer"
                  >
                    Edit Address
                  </button>
                </div>
                <div className="text-black/85">
                  {shipping.fullName} · {shipping.streetAddress},{' '}
                  {shipping.postalCode} {shipping.city}, {shipping.country}
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: ORDER CONFIRMED RECEIPT */}
          {step === CheckoutStep.CONFIRMED && confirmedOrder && (
            <div className="space-y-5">
              <div className="border-4 border-black bg-[#ffff00] p-5 space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-black">
                  <span>■ Studio Dispatch Confirmed</span>
                  <span className="tabular-nums">{confirmedOrder.placedAt}</span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-black tabular-nums">
                  Order #{confirmedOrder.orderNumber} Confirmed — Preparing
                  Shipment
                </h3>
                <p className="text-xs font-bold text-black/85">
                  Confirmation and brass serial allocation sent to{' '}
                  {confirmedOrder.shipping.email}.
                </p>
              </div>

              <div className="border-4 border-black bg-white divide-y-2 divide-black text-xs">
                <div className="p-3.5 bg-[#e8e8e8] font-extrabold text-black flex items-center justify-between">
                  <span>Serialized Manifest</span>
                  <span className="tabular-nums">
                    {confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)}{' '}
                    Pair(s)
                  </span>
                </div>
                {confirmedOrder.items.map((item) => (
                  <div
                    key={item.key}
                    className="p-3.5 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-extrabold text-black">
                        {item.quantity}× {item.name}
                      </div>
                      <div className="text-black/75">
                        {item.colorwayLabel} · EU {item.sizeEu}
                      </div>
                    </div>
                    <span className="font-extrabold tabular-nums text-black">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="p-3.5 bg-[#f5f4ee] space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-black/75">Subtotal</span>
                    <span className="font-extrabold tabular-nums">
                      ${confirmedOrder.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-black/75">Courier</span>
                    <span className="font-extrabold tabular-nums">
                      {confirmedOrder.shippingCost === 0
                        ? 'FREE'
                        : `$${confirmedOrder.shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-black text-sm">
                    <span className="font-extrabold text-black">Total USD</span>
                    <span className="font-extrabold tabular-nums text-black">
                      ${confirmedOrder.total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="flex-1 h-11 px-4 border-2 border-black bg-white text-xs font-extrabold text-black flex items-center justify-center gap-2 hover:bg-[#ffff00] cursor-pointer"
                >
                  {copiedReceipt ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Receipt Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Receipt Manifest</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleFinishReceipt}
                  className="flex-1 h-11 px-4 border-2 border-black bg-black text-xs font-extrabold text-white hover:bg-[#0000ff] cursor-pointer focus-on-dark"
                >
                  Continue Browsing →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Totals & Action Footer */}
        {step !== CheckoutStep.CONFIRMED && items.length > 0 && (
          <div className="border-t-4 border-black bg-white p-5 max-[720px]:p-4 space-y-4 shrink-0">
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-black/75 font-bold">
                <span>Subtotal (Duties Included)</span>
                <span className="tabular-nums font-extrabold text-black">
                  ${subtotal}
                </span>
              </div>
              <div className="flex items-center justify-between text-black/75 font-bold">
                <span>
                  {shipping.shippingMethod === ShippingMethod.PRIORITY
                    ? 'Priority Air Express'
                    : 'Standard Studio Courier'}
                </span>
                <span className="tabular-nums font-extrabold text-black">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                </span>
              </div>
              <div className="pt-2 border-t-2 border-black flex items-baseline justify-between text-base font-extrabold text-black">
                <span>Total</span>
                <span className="tabular-nums text-xl">${total} USD</span>
              </div>
            </div>

            {step === CheckoutStep.BAG && (
              <button
                type="button"
                onClick={() => setStep(CheckoutStep.SHIPPING)}
                className="w-full h-13 px-6 border-4 border-black bg-[#ff0000] text-white text-sm font-extrabold tracking-[-0.01em] hover:bg-black active:bg-[#ffff00] active:text-black cursor-pointer focus-on-dark"
              >
                Proceed to Dispatch Coordinates →
              </button>
            )}

            {step === CheckoutStep.SHIPPING && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setErrors([]);
                    setStep(CheckoutStep.BAG);
                  }}
                  className="h-12 px-4 border-2 border-black bg-[#f5f4ee] text-xs font-extrabold text-black hover:bg-[#ffff00] cursor-pointer"
                >
                  ← Bag
                </button>
                <button
                  type="submit"
                  form="checkout-shipping-form"
                  className="flex-1 h-12 px-6 border-4 border-black bg-[#0000ff] text-white text-sm font-extrabold hover:bg-black cursor-pointer focus-on-dark"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === CheckoutStep.PAYMENT && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setErrors([]);
                    setStep(CheckoutStep.SHIPPING);
                  }}
                  className="h-12 px-4 border-2 border-black bg-[#f5f4ee] text-xs font-extrabold text-black hover:bg-[#ffff00] cursor-pointer"
                >
                  ← Dispatch
                </button>
                <button
                  type="submit"
                  form="checkout-payment-form"
                  className="flex-1 h-12 px-6 border-4 border-black bg-[#ff0000] text-white text-sm font-extrabold tabular-nums hover:bg-black cursor-pointer focus-on-dark"
                >
                  Place Studio Order · ${total}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
