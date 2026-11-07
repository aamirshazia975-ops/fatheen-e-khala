import { FormEvent, useState } from 'react';

interface FooterSectionProps {
  bagCount: number;
  onPrimaryCircleAction: () => void;
}

export function FooterSection({
  bagCount,
  onPrimaryCircleAction,
}: FooterSectionProps) {
  const [dispatchEmail, setDispatchEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (dispatchEmail.includes('@') && dispatchEmail.includes('.')) {
      setSubscribed(true);
      setDispatchEmail('');
    }
  };

  return (
    <footer className="bg-[#f5f4ee]">
      {/* Red Footer Close: White Display Text + Pale Action Note + Circular Control */}
      <div className="border-b-4 border-black bg-[#ff0000]">
        <div className="max-w-[1440px] mx-auto min-[1441px]:border-x-4 border-black grid grid-cols-1 min-[721px]:grid-cols-[1.5fr_1fr] items-stretch">
          <div className="p-12 max-[1050px]:p-8 max-[720px]:p-5 min-[721px]:border-r-4 max-[720px]:border-b-4 border-black flex flex-col justify-between gap-8">
            <div>
              <div className="text-xs font-extrabold text-white">
                05 · Dessau Direct Dispatch
              </div>
              <h2 className="mt-2 text-[clamp(2.1rem,4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white text-balance">
                Step Into Pure Architectural Geometry.
              </h2>
            </div>

            {/* Pale Action Note Block */}
            <div className="border-4 border-black bg-[#f5f4ee] p-5 max-w-xl">
              <div className="text-xs font-extrabold text-black">
                Atelier Guarantee &amp; Workshop Recrafting
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-black/85">
                Orders placed before 15:00 CET leave our Dessau-Roßlau facility
                the same afternoon. Every resoleable pair includes lifetime
                access to our mechanical sole rebuild program.
              </p>
            </div>
          </div>

          {/* Right Red Field with Circular Primary Control */}
          <div className="p-10 max-[1050px]:p-7 max-[720px]:p-8 flex flex-col items-center justify-center gap-5 bg-[#ff0000]">
            <button
              type="button"
              onClick={onPrimaryCircleAction}
              className="w-44 h-44 max-[720px]:w-36 max-[720px]:h-36 rounded-full border-4 border-black bg-white text-black shadow-[8px_8px_0px_#000000] hover:bg-[#ffff00] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0px_#000000] flex flex-col items-center justify-center p-4 text-center cursor-pointer focus-on-dark"
            >
              <span className="text-base max-[720px]:text-sm font-extrabold leading-tight tracking-[-0.03em]">
                {bagCount > 0 ? (
                  <>
                    Review Bag
                    <br />({bagCount} {bagCount === 1 ? 'Pair' : 'Pairs'})
                  </>
                ) : (
                  <>
                    Configure
                    <br />
                    Your Pair ↑
                  </>
                )}
              </span>
              <span className="mt-1.5 text-xs font-bold text-black/80">
                {bagCount > 0 ? 'Instant Checkout' : 'Jump to Catalog'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Ruled Footer Link Groups (2 Columns at <= 720px, 4 Columns on Desktop) */}
      <div className="border-b-4 border-black bg-[#f5f4ee]">
        <div className="max-w-[1440px] mx-auto min-[1441px]:border-x-4 border-black grid grid-cols-2 min-[1051px]:grid-cols-4 bg-black gap-[2px]">
          <div className="bg-[#f5f4ee] p-7 max-[720px]:p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-black">
              01. Silhouettes
            </h3>
            <ul className="space-y-2 text-sm font-bold text-black/80">
              <li>
                <a href="#catalog" className="hover:underline">
                  Dessau Monolith Low
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:underline">
                  Weimar Atelier Boot
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:underline">
                  Kandinsky Studio Mule
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:underline">
                  Moholy Track Runner
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:underline">
                  Gropius Square Derby
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-[#f5f4ee] p-7 max-[720px]:p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-black">
              02. Engineering
            </h3>
            <ul className="space-y-2 text-sm font-bold text-black/80">
              <li>
                <a href="#craft" className="hover:underline">
                  360° Channel Stitch
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:underline">
                  LWG Vegetable Hides
                </a>
              </li>
              <li>
                <a href="#ledger" className="hover:underline">
                  Specification Ledger
                </a>
              </li>
              <li>
                <a href="#fit-guide" className="hover:underline">
                  Mondopoint Size Matrix
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-[#f5f4ee] p-7 max-[720px]:p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-black">
              03. Workshop Coordinates
            </h3>
            <p className="text-sm font-medium leading-relaxed text-black/80">
              Bauhaus Footwear Werkstätte
              <br />
              Gropiusallee 38
              <br />
              06846 Dessau-Roßlau, Germany
            </p>
            <p className="text-xs font-bold tabular-nums text-black/75">
              Mon–Fri · 09:00–18:00 CET
            </p>
          </div>

          <div className="bg-[#f5f4ee] p-7 max-[720px]:p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-black">
              04. Archive Editions Notice
            </h3>
            {subscribed ? (
              <div className="p-3 border-2 border-black bg-[#ffff00] text-xs font-extrabold text-black">
                ■ Registered for Dessau Edition Dispatches.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label
                  htmlFor="footer-dispatch-email"
                  className="block text-xs font-medium text-black/80"
                >
                  Receive biannual release ledgers (no promotional spam).
                </label>
                <div className="flex">
                  <input
                    id="footer-dispatch-email"
                    type="email"
                    required
                    value={dispatchEmail}
                    onChange={(e) => setDispatchEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="min-w-0 flex-1 h-10 px-3 border-2 border-black bg-white text-xs font-medium text-black"
                  />
                  <button
                    type="submit"
                    className="h-10 px-3.5 border-y-2 border-r-2 border-black bg-black text-white text-xs font-extrabold hover:bg-[#0000ff] shrink-0 cursor-pointer focus-on-dark"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Quiet Copyright Bottom Strip */}
      <div className="max-w-[1440px] mx-auto px-6 max-[720px]:px-4 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-black/75">
        <span>© 2026 Bauhaus Footwear Werkstätte GmbH. All rights reserved.</span>
        <span>Dessau · Porto · Marche</span>
      </div>
    </footer>
  );
}
