import dessauMonolithImg from '../assets/images/dessau_monolith_low_1793265191834.jpg';
import weimarBootImg from '../assets/images/weimar_atelier_boot_1793265195024.jpg';
import kandinskyMuleImg from '../assets/images/kandinsky_studio_mule_1793265196741.jpg';
import moholyRunnerImg from '../assets/images/moholy_track_runner_1793265197641.jpg';
import gropiusDerbyImg from '../assets/images/gropius_square_derby_1793265199889.jpg';
import breuerHighImg from '../assets/images/breuer_high_sneaker_1793265202052.jpg';
import editorialStrideImg from '../assets/images/bauhaus_editorial_stride_1793265202018.jpg';

import {
  DisclosureEntry,
  Product,
  ProductCategory,
  SizeChartRow,
} from '../types';

export const EDITORIAL_LOOKBOOK_IMAGE = editorialStrideImg;

export const ALL_EU_SIZES: number[] = [37, 38, 39, 40, 41, 42, 43, 44, 45];

export const FREE_SHIPPING_THRESHOLD = 350;

export const PRODUCTS: Product[] = [
  {
    id: 'dessau-monolith-low',
    index: '01',
    name: 'Dessau Monolith Low',
    category: ProductCategory.LOW_TOP,
    price: 290,
    statusNote: 'Flagship Issue',
    image: dessauMonolithImg,
    imageAlt:
      'Dessau Monolith Low sneaker in chalk off-white leather with black piping, primary red heel block, cobalt blue eyestay, and yellow outsole wedge.',
    shortSummary:
      'Zero-drop vulcanized court architecture divided by 4mm black leather piping.',
    description:
      'Built on Last 04 with flat-felled vegetable-tanned calfskin panels. A dense vulcanized natural rubber cupsole houses a primary yellow geometric torsion wedge for neutral ground feedback.',
    upperMaterial: '1.8mm Vegetable-Tanned Chalk Calfskin',
    soleCompound: '70-Shore Natural Vulcanized Rubber',
    liningMaterial: 'Unbleached Chrome-Free Goat Lining',
    lastCode: 'Dessau Last 04 (Wide Anatomical)',
    stackMm: 26,
    dropMm: 0,
    weightGrams: 385,
    resoleable: true,
    resoleMethod: '360° Sidewall Channel Stitch',
    origin: 'Dessau / Marche Workshop',
    colorways: [
      {
        id: 'tri-block',
        label: 'Primary Tri-Block',
        swatchPrimary: 'red',
        swatchSecondary: 'blue',
        code: 'C-01',
      },
      {
        id: 'chalk-cobalt',
        label: 'Chalk / Cobalt Plane',
        swatchPrimary: 'chalk',
        swatchSecondary: 'blue',
        code: 'C-02',
      },
      {
        id: 'obsidian-yellow',
        label: 'Obsidian / Signal Yellow',
        swatchPrimary: 'black',
        swatchSecondary: 'yellow',
        code: 'C-03',
      },
    ],
    availableSizes: [37, 38, 39, 40, 41, 42, 43, 44],
  },
  {
    id: 'weimar-atelier-boot',
    index: '02',
    name: 'Weimar Atelier Boot',
    category: ProductCategory.BOOT,
    price: 380,
    statusNote: 'In Stock',
    image: weimarBootImg,
    imageAlt:
      'Weimar Atelier mid-ankle boot in matte black full-grain hide with cobalt blue elastic side gusset, yellow pull loop, and off-white block lug sole.',
    shortSummary:
      'Hybrid lace-gusset utility boot with storm-welted dual-plane lug geometry.',
    description:
      'Engineered for wet urban stone and studio floors. Full-grain black bullhide frames a high-tension cobalt elastic gusset for rapid entry without unlacing the top hooks.',
    upperMaterial: '2.2mm Waxed Full-Grain Bullhide',
    soleCompound: 'Dual-Plane Vibram & Natural Crepe Block',
    liningMaterial: 'Full Calfskin Thermal Lining',
    lastCode: 'Weimar Last 02 (Structured)',
    stackMm: 34,
    dropMm: 6,
    weightGrams: 510,
    resoleable: true,
    resoleMethod: 'Goodyear Storm Welt',
    origin: 'Dessau / Marche Workshop',
    colorways: [
      {
        id: 'obsidian-cobalt',
        label: 'Obsidian / Cobalt Gusset',
        swatchPrimary: 'black',
        swatchSecondary: 'blue',
        code: 'C-04',
      },
      {
        id: 'monolith-black',
        label: 'Monolith Black / Red Tab',
        swatchPrimary: 'black',
        swatchSecondary: 'red',
        code: 'C-05',
      },
    ],
    availableSizes: [38, 39, 40, 41, 42, 43, 44, 45],
  },
  {
    id: 'kandinsky-studio-mule',
    index: '03',
    name: 'Kandinsky Studio Mule',
    category: ProductCategory.STUDIO_MULE,
    price: 255,
    statusNote: 'Limited Run',
    image: kandinskyMuleImg,
    imageAlt:
      'Kandinsky Studio Mule in matte chalk leather with a flat primary yellow midfoot strap, black cylindrical clasp, cork footbed, and faceted red wedge sole.',
    shortSummary:
      'Cantilevered open-heel studio clog with cork-latex anatomical bed and cylindrical lock.',
    description:
      'Designed for eight-hour standing sessions at drafting tables and workshops. The raw Portuguese cork footbed molds to plantar geometry over 14 days while the faceted red rubber base resists compression.',
    upperMaterial: '2.0mm Drum-Dyed Structured Calfskin',
    soleCompound: 'Faceted Primary Rubber + Cork-Latex Core',
    liningMaterial: 'Raw Suede Plantar Top-Cover',
    lastCode: 'Atelier Last 01 (Relaxed Forefoot)',
    stackMm: 30,
    dropMm: 4,
    weightGrams: 340,
    resoleable: true,
    resoleMethod: 'Solvent-Free Mechanical Recraft',
    origin: 'Dessau / Porto Studio',
    colorways: [
      {
        id: 'chalk-yellow-red',
        label: 'Chalk / Yellow / Red',
        swatchPrimary: 'yellow',
        swatchSecondary: 'red',
        code: 'C-06',
      },
      {
        id: 'plaster-blue',
        label: 'Plaster / Cobalt Strap',
        swatchPrimary: 'chalk',
        swatchSecondary: 'blue',
        code: 'C-07',
      },
    ],
    availableSizes: [37, 38, 39, 40, 41, 42, 43, 44],
  },
  {
    id: 'moholy-track-runner',
    index: '04',
    name: 'Moholy Track Runner',
    category: ProductCategory.RUNNER,
    price: 275,
    statusNote: 'In Stock',
    image: moholyRunnerImg,
    imageAlt:
      'Moholy Track Runner in off-white duck canvas and pale gray suede with black seam rules, cobalt blue flank, red tongue, and angular yellow heel stabilizer.',
    shortSummary:
      'Featherweight kinetic trainer built from 16oz loomstate canvas and triangulated EVA.',
    description:
      'Replaces heat-welded synthetics with breathable heavy cotton duck canvas, split suede mudguards, and an angular dual-density midsole with a rigid yellow heel counter triangle.',
    upperMaterial: '16oz Organic Duck Canvas + Velour Suede',
    soleCompound: 'Triangulated Bio-EVA + Raw Gum Tread',
    liningMaterial: 'Open-Weave Cotton Herringbone',
    lastCode: 'Kinetic Last 07 (Standard)',
    stackMm: 32,
    dropMm: 8,
    weightGrams: 315,
    resoleable: false,
    resoleMethod: 'Replaceable Gum Tread Cap Only',
    origin: 'Dessau / Porto Studio',
    colorways: [
      {
        id: 'canvas-primary',
        label: 'Canvas / Cobalt / Yellow',
        swatchPrimary: 'blue',
        swatchSecondary: 'yellow',
        code: 'C-08',
      },
      {
        id: 'chalk-signal',
        label: 'Chalk / Crimson Tongue',
        swatchPrimary: 'chalk',
        swatchSecondary: 'red',
        code: 'C-09',
      },
    ],
    availableSizes: [37, 38, 39, 41, 42, 43, 44, 45],
  },
  {
    id: 'gropius-square-derby',
    index: '05',
    name: 'Gropius Square Derby',
    category: ProductCategory.DERBY,
    price: 360,
    statusNote: 'In Stock',
    image: gropiusDerbyImg,
    imageAlt:
      'Gropius Square Derby in matte black calfskin with a white ceramic circular top eyelet, flat primary red heel counter, and 90-degree stacked platform sole.',
    shortSummary:
      'Chiseled 90-degree architectural derby anchored by a sintered ceramic top eyelet.',
    description:
      'A formal silhouette stripped of broguing and ornament. Features a machined white zirconia top eyelet ring and a sharp-edged primary red heel counter plane over a 36mm stacked sole.',
    upperMaterial: 'Polished Matte Box Calfskin + Ceramic Ring',
    soleCompound: '90° Stacked Compressed Rubber & Leather Mid',
    liningMaterial: 'Vegetable-Tanned Natural Vachetta',
    lastCode: 'Gropius Square 03 (Chiseled)',
    stackMm: 36,
    dropMm: 8,
    weightGrams: 490,
    resoleable: true,
    resoleMethod: '360° Blake-Rapid Stitch',
    origin: 'Dessau / Marche Workshop',
    colorways: [
      {
        id: 'black-red-counter',
        label: 'Obsidian / Red Counter',
        swatchPrimary: 'black',
        swatchSecondary: 'red',
        code: 'C-10',
      },
      {
        id: 'black-blue-counter',
        label: 'Obsidian / Cobalt Counter',
        swatchPrimary: 'black',
        swatchSecondary: 'blue',
        code: 'C-11',
      },
    ],
    availableSizes: [38, 39, 40, 41, 42, 44, 45],
  },
  {
    id: 'breuer-grid-high',
    index: '06',
    name: 'Breuer Grid High',
    category: ProductCategory.HIGH_TOP,
    price: 325,
    statusNote: 'Archive Issue',
    image: breuerHighImg,
    imageAlt:
      'Breuer Grid High sneaker in chalk and pale gray leather divided by black grid seams, primary yellow ankle strap, red circular medial patch, and cobalt heel block.',
    shortSummary:
      'High-cut modular court boot with removable ankle lock strap and grid seam matrix.',
    description:
      'Inspired by Marcel Breuer structural joinery. Twelve individual leather planes interlock along raised black welted seams to prevent creasing across the flex point while locking the talus.',
    upperMaterial: 'Multi-Panel Chalk & Quiet Gray Nappa',
    soleCompound: 'Flat Cupsole + Cobalt TPU Heel Block',
    liningMaterial: 'Perforated Micro-Calfskin Collar',
    lastCode: 'Dessau Last 04 (High Collar)',
    stackMm: 28,
    dropMm: 2,
    weightGrams: 430,
    resoleable: true,
    resoleMethod: '360° Sidewall Channel Stitch',
    origin: 'Dessau / Marche Workshop',
    colorways: [
      {
        id: 'grid-primary',
        label: 'Grid Chalk / Primary',
        swatchPrimary: 'yellow',
        swatchSecondary: 'blue',
        code: 'C-12',
      },
      {
        id: 'slate-crimson',
        label: 'Quiet Gray / Red Disc',
        swatchPrimary: 'chalk',
        swatchSecondary: 'red',
        code: 'C-13',
      },
    ],
    availableSizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
  },
];

export const SIZE_CHART: SizeChartRow[] = [
  { eu: 37, usMen: '5.0', usWomen: '6.5', uk: '4.0', mondoCm: '23.5' },
  { eu: 38, usMen: '6.0', usWomen: '7.5', uk: '5.0', mondoCm: '24.2' },
  { eu: 39, usMen: '6.5', usWomen: '8.0', uk: '5.5', mondoCm: '24.8' },
  { eu: 40, usMen: '7.5', usWomen: '9.0', uk: '6.5', mondoCm: '25.5' },
  { eu: 41, usMen: '8.0', usWomen: '9.5', uk: '7.0', mondoCm: '26.2' },
  { eu: 42, usMen: '9.0', usWomen: '10.5', uk: '8.0', mondoCm: '26.8' },
  { eu: 43, usMen: '10.0', usWomen: '11.5', uk: '9.0', mondoCm: '27.5' },
  { eu: 44, usMen: '11.0', usWomen: '12.5', uk: '10.0', mondoCm: '28.2' },
  { eu: 45, usMen: '12.0', usWomen: '13.5', uk: '11.0', mondoCm: '28.9' },
];

export const DISCLOSURE_ENTRIES: DisclosureEntry[] = [
  {
    id: 'modular-construction',
    index: '01',
    title: 'Modular Sole Geometry & Workshop Resoling',
    summary:
      'Five of our six core silhouettes attach upper to outsole mechanically without permanent petrochemical cements.',
    points: [
      '360° sidewall channel stitching and Goodyear storm welts allow full sole replacement in 10 business days.',
      'Each pair ships with a stamped brass serial plate inside the tongue recording Last Code and stitch batch.',
      'Worn rubber outsoles returned to our Dessau workshop are granulated into studio floor tiles.',
    ],
  },
  {
    id: 'last-proportions',
    index: '02',
    title: 'Dessau Last Proportions & Half-Size Guidance',
    summary:
      'Our lasts preserve natural first-metatarsal alignment with a squared or anatomical toe box.',
    points: [
      'True to EU Mondopoint length. If you stand between EU sizes, select the larger EU integer for Last 02 and 03.',
      'Dessau Last 04 (Monolith Low & Breuer High) includes a removable 3mm cork volume shim under the footbed.',
      'Use the interactive Mondopoint Foot Length calculator adjacent to verify exact millimeter clearance.',
    ],
  },
  {
    id: 'materials-ledger',
    index: '03',
    title: 'Raw Hide Traceability & Zero-Solvent Dyeing',
    summary:
      'Primary red, cobalt, and yellow planes are drum-dyed completely through the hide cross-section so scuffs never reveal gray core.',
    points: [
      '100% LWG Gold-rated European hides tanned with chestnut, mimosa, and quebracho bark extracts.',
      'Water-based edge inks and beeswax burnishing eliminate volatile organic solvent emissions on the assembly line.',
      'Heavy 16oz organic cotton duck on the Moholy Runner is woven unbleached in northern Portugal.',
    ],
  },
  {
    id: 'dispatch-returns',
    index: '04',
    title: 'Global Studio Dispatch, Duties & 30-Day Trial',
    summary:
      'Serialized pairs ship directly from Dessau within 24 hours in unbleached corrugated constructivist boxes.',
    points: [
      'Complimentary Standard Studio Courier on all orders from $350; flat $18 below threshold.',
      'All EU, UK, US, and Japanese import duties are calculated transparently at checkout with zero doorstep fees.',
      'Unworn indoor-tested pairs may be exchanged for size or returned within 30 days using the enclosed prepaid label.',
    ],
  },
];
