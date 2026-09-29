const A11Y = {
  role: "img",
  "aria-hidden": "true"
};

export const productModeVisuals = {
  landing: {
    title: "Landing Page",
    whatItDoes: "یک صفحه‌ی تک‌صفحه‌ای و هدفمند برای یک محصول/کمپین خاص. تمام پیام، دمو و CTA در همان یک scroll جا می‌گیرد.",
    useWhen: "موقعی که یک محصول خاص را می‌فروشی، یک کمپین تبلیغاتی داری، یا کاربر باید سریع به یک تصمیم برسد.",
    doesNotDo: "صفحات جدا برای قیمت/مستندات/بلاگ ندارد؛ برای محصولات چندوجهی کم می‌آورد.",
    reference: "linear.app · v0.dev · vercel landing pages",
    swatch: ["#0b0f14", "#91f2c8", "#ff8f5c"]
  },
  "full-site": {
    title: "Full Website",
    whatItDoes: "سایت چندصفحه‌ای کامل با Home، Product، Pricing، Docs و Contact که هر کدام نقش جدا دارند.",
    useWhen: "موقعی که محصول محتوای زیادی دارد، مستندات/قیمت/بخش پشتیبانی جدا لازم است، یا سئوی چندصفحه‌ای می‌خواهی.",
    doesNotDo: "به‌اندازه‌ی landing روی یک تبدیل متمرکز نیست؛ طراحی آن زمان بیشتری می‌برد.",
    reference: "stripe.com · framer.com · shadcn/ui docs",
    swatch: ["#0e1116", "#6e9bff", "#f2f5ff"]
  }
};

export const motionLevelVisuals = {
  low: {
    title: "Motion: Low",
    whatItDoes: "فقط fade/slide ساده و بی‌صدا هنگام ورود بخش‌ها. هیچ چیز چشم‌گیر حرکت نمی‌کند.",
    useWhen: "سایت B2B جدی، داشبورد، سایت سرعت-حساس، یا مخاطبی که حساسیت به انیمیشن دارد.",
    doesNotDo: "حس «زنده بودن» برند را منتقل نمی‌کند.",
    reference: "stripe.com · notion.so",
    gradient: ["#1b1f27", "#2a2f3a"],
    motion: "subtle"
  },
  medium: {
    title: "Motion: Medium",
    whatItDoes: "انیمیشن ورود بخش‌ها + hoverهای واکنش‌گرا + اسلایدر/کاروسل ملایم. حرکت‌ها کوتاه و حرفه‌ای.",
    useWhen: "اکثر سایت‌های محصولی SaaS، لندینگ‌های نرم‌افیری و برندهای مدرن. ایمن‌ترین انتخاب پیش‌فرض.",
    doesNotDo: "هنوز «wow» نمی‌سازد.",
    reference: "framer.com · vercel.com",
    gradient: ["#141a22", "#1f3a2f", "#0f1c16"],
    motion: "steady"
  },
  high: {
    title: "Motion: High",
    whatItDoes: "موشن روایی (scroll storytelling)، پارالاکس، تایپوگرافی کینتیک و ریز-تعامل‌ها در کل سایت.",
    useWhen: "برندهایی که می‌خواهند «حسِ خودشان» را در حرکت نشان دهند؛ سایت‌های جایزه (Awwwards) و محصولات خلاق.",
    doesNotDo: "سرعت لود را سنگین می‌کند و روی دستگاه‌های ضعیف کم می‌آورد.",
    reference: "docus.ai · awwwards.com/sites-of-the-day",
    gradient: ["#10131a", "#3b2a6b", "#ff5c8a"],
    motion: "flow"
  }
};

export const threeDVisuals = {
  none: {
    title: "بدون 3D",
    whatItDoes: "تمام رابط با HTML/CSS/SVG مسطح ساخته می‌شود. هیچ فایل 3D، مدل یا صحنه‌ای بارگذاری نمی‌شود.",
    useWhen: "سرعت و سبکی اولویت است، یا مدل 3D به محصول ارتباطی ندارد.",
    doesNotDo: "عمق و «مهره بودن» محصول را نشان نمی‌دهد.",
    reference: "linear.app · shadcn/ui",
    shape: "flat"
  },
  low: {
    title: "3D: Accent only",
    whatItDoes: "فقط یک عنصر کوچک 3D (مثلاً آیکون، لوگوی سه‌بعدی یا یک object کنار hero) و بقیه‌ی سایت مسطح.",
    useWhen: "موقعی که می‌خواهی امضای بصری خاص داری ولی سایت سبک و سریع بماند.",
    doesNotDo: "یک تجربه‌ی همه‌جانبه 3D نمی‌سازد.",
    reference: "spline.design examples · 21st.dev 3D avatars",
    shape: "accent"
  },
  medium: {
    title: "3D: Section-driven",
    whatItDoes: "چند بخش مشخص (hero، featureها یا modals و کارت‌ها) حالت سه‌بعدی می‌گیرند و بقیه مسطح می‌مانند.",
    useWhen: "محصولی که فضایی دارد (رندر محصول، نمای داخلی، فضای کاری) و می‌خواهی آن را نشانه بگیری.",
    doesNotDo: "کل سایت غرق در 3D نمی‌شود؛ باید مرز بین بخش‌های 3D و مسطح دست باشد.",
    reference: "vercel demos · three.js editor examples",
    shape: "section"
  },
  high: {
    title: "3D: Immersive",
    whatItDoes: "کل قالب همه‌جانبه سه‌بعدی و غیرعادی: ناوبری فضایی، دوربین فعال و صحنه‌های واقعی جای رابط کلاسیک را می‌گیرند.",
    useWhen: "پروژه‌های نمایشی/کمپین ویژه/گیم‌لایک که هدفشان شگفتی بصری است.",
    doesNotDo: "هزینه‌ی ساخت، GPU و نگهداری بالا؛ روی موبایل و دستگاه‌های ضعیف افت می‌کند.",
    reference: "bruno-simon.com · awwwards.com (3D/ WebGL)",
    shape: "immersive"
  }
};

export const loaderVisuals = {
  "overlay-reveal": {
    title: "Overlay Reveal",
    whatItDoes: "یک لایه‌ی روی صفحه پر از آیکون/نوار پیشرفت می‌آید، بعد از آماده‌شدن محتوا کنار می‌رود.",
    useWhen: "موقعی که می‌خواهی حس «یک چیزی دارد اتفاق می‌افتد» بدهی و برندت را در همان ثانیه اول نشان دهی.",
    doesNotDo: "محتوا تا پایان لود پنهان است؛ کاربر منتظر می‌ماند.",
    reference: "framer.com loaders · uiverse.io/loaders",
    pattern: "overlay"
  },
  skeleton: {
    title: "Skeleton",
    whatItDoes: "همین حالا ساختار خاکستری محتوا نشان داده می‌شود و وقتی داده آمد، جای خود را می‌گیرد.",
    useWhen: "محتوای داینامیک داری یا می‌خواهی کاربر حس کند سایت سریع است.",
    doesNotDo: "چشم نوازی برند را در همان لحظه‌ی اول ندارد.",
    reference: "vercel · shadcn/ui skeleton",
    pattern: "skeleton"
  },
  "hard-gate": {
    title: "Show after ready",
    whatItDoes: "تا کاملاً لود نشده، چیزی نشان داده نمی‌شود؛ بعد همه‌چیز یک‌جا ظاهر می‌شود.",
    useWhen: "موقعی که پرش چیدمان (layout shift) و انیمیشن نصفه раздражکننده است.",
    doesNotDo: "صفحه می‌تواند خالی به نظر برسد اگر لود طولانی شود.",
    reference: "gatsby/ssr sites",
    pattern: "gate"
  }
};

export const sliderModeVisuals = {
  hero: {
    title: "Hero Section",
    whatItDoes: "یک بخش بزرگ و ثابت در بالای صفحه که پیام اصلی + یک تصویر/دمو را می‌گوید، بعد بقیه‌ی بخش‌ها می‌آیند.",
    useWhen: "موقعی که یک پیام قوی و مرتب دارید که هر بازدیدکننده‌ای باید آن را ببیند. گزینه‌ی پیش‌فرض امن.",
    doesNotDo: "محتوای متعدد را کنار هم نشان نمی‌دهد.",
    reference: "linear.app · vercel.com",
    layout: "hero"
  },
  slider: {
    title: "Slider Focus",
    whatItDoes: "یک اسلایدر/کاروسل اصلی که چند کارت، ویژگی یا دمو را یکی‌یکی می‌چرخاند.",
    useWhen: "چند پیام یا چند ویژگی هم‌رتبه داری و می‌خواهی همه‌شان جلوی چشم باشند.",
    doesNotDo: "هر کارت فقط چند ثانیه جلوی چشم است؛ پیام اصلی می‌تواند نادیده گرفته شود.",
    reference: "swiper.js demos · embla carousel",
    layout: "slider"
  }
};

export const mascotStyleVisuals = {
  abstract: {
    title: "Abstract",
    whatItDoes: "یک شکل هندسی/ارگانیک مجرد به‌جای یک شخصیت با چهره. مثل یک لوگوی زنده یا یک مهره هندسی.",
    useWhen: "برندهای جدی، B2B یا تکنولوژی که نمی‌خواهند «بچگانه» به نظر برسند.",
    doesNotDo: "شخصیت و احسام مستقیم منتقل نمی‌کند.",
    reference: "21st.dev abstract avatars · figma community",
    face: "abstract"
  },
  robotic: {
    title: "Robotic",
    whatItDoes: "یک ربات/ایجنت دوست‌داشتنی با شکل مکانیکی که محصول تکنولوژیک را نشان می‌دهد.",
    useWhen: "محصولات AI، اتوماسیون، SaaS فنی و DevTools.",
    doesNotDo: "حس گرم و انسانی کمتری دارد.",
    reference: "botify · notion mascot · spline robots",
    face: "robot"
  },
  organic: {
    title: "Organic",
    whatItDoes: "کاراکتر با فرم نرم، طبیعی یا دست‌ساز؛ می‌تواند یک گیاه، جانور یا یک موجود ابرقهرمانی باشد.",
    useWhen: "برندهای سبز، سلامت، آموزشی یا محصولاتی که گرما می‌خواهند.",
    doesNotDo: "با هویت تکنولوژیک/صنعتی تناقض دارد.",
    reference: "duolingo · mailchimp · github octocat",
    face: "organic"
  },
  playful: {
    title: "Playful",
    whatItDoes: "کاراکتر رنگی، خنده‌دار و اغراق‌شده با حرکات و احساسات روشن.",
    useWhen: "مخاطب جوان، محصول سرگرمی/آموزشی یا برندی که شادی می‌فروشد.",
    doesNotDo: "در B2B جدی و محصولات مالی اعتماد را کم می‌کند.",
    reference: "duolingo · notion · linear mascot",
    face: "playful"
  }
};

export const styleVisuals = {
  Minimalism: {
    title: "Minimalism & Swiss Style",
    whatItDoes: "فضای سفید زیاد، تایپوگرافی قوی، گرید سویسی و فقط چند رنگ. هر عنصر دلیلی دارد.",
    useWhen: "محصولات جدی، سرویس‌های مالی، برندهای لوکس و داشبوردها.",
    doesNotDo: "برای برندهای پرانرژی و سرگرم‌کننده خشک به نظر می‌رسد.",
    reference: "linear.app · apple.com · lumio.so",
    swatch: ["#f6f4ef", "#0b0b0c", "#c8553d"]
  },
  Neumorphism: {
    title: "Neumorphism",
    whatItDoes: "کنترل‌های نرم، برجسته و فشرده از یک سطح پس‌زمینه؛ مثل پلاستیک نرم و روشن.",
    useWhen: "اپ‌های موبایل، اپ‌های ابزاری و رابط‌های آرام.",
    doesNotDo: "کنتراست ضعیف و دسترسی‌پذیری بد؛ در تم تیره اغلب نتیجه نمی‌دهد.",
    reference: "dribbble neomorphism shots",
    swatch: ["#e0e5ec", "#a3b1c6", "#7b8aa3"]
  },
  Glassmorphism: {
    title: "Glassmorphism",
    whatItDoes: "لایه‌های شیشه مات، شفافیت و blur روی پس‌زمینه‌ی رنگی. عمق بدون سنگینی.",
    useWhen: "SaaS مدرن، اپ‌های AI و محصولات облаقی.",
    doesNotDo: "در دستگاه‌های ضعیف تاری را از دست می‌دهد و متن روی شیشه کم‌کنتراست می‌شود.",
    reference: "apple vision pro · 21st.dev glass cards",
    swatch: ["#0f1c2e", "#8fd3ff", "#ff7eb3"]
  },
  Brutalism: {
    title: "Brutalism",
    whatItDoes: "خام، ساده، فونت‌های پیش‌فرض، حاشیه‌های تیز و تضاد شدید. مثل HTML خام.",
    useWhen: "کمپین‌های جسورانه، کامیونیتی‌های تکنیک و برندهای ضد استاتوس.",
    doesNotDo: "مخاطب عمومی را پس می‌زند و دسترسی‌پذیری می‌تواند بد باشد.",
    reference: "balenciaga · yale art · lol.substack",
    swatch: ["#ffffff", "#000000", "#ffd400"]
  },
  "3D": {
    title: "3D & Hyperrealism",
    whatItDoes: "مدل‌های سه‌بعدی واقعی، تکسچر، نور و سایه. محصول را مثل یک شیء فیزیکی نشان می‌دهد.",
    useWhen: "محصولات فیزیکی، گیم، املاک و نمایش‌های ویژه.",
    doesNotDo: "هزینه‌ی تولید بالا و زمان لود سنگین.",
    reference: "three.js gallery · spline.design",
    swatch: ["#1a1d24", "#ff8f5c", "#91f2c8"]
  },
  Vibrant: {
    title: "Vibrant & Block-based",
    whatItDoes: "رنگ‌های جسور، بلوک‌های رنگی بزرگ و شکل‌های هندسی. پر انرژی و واضح.",
    useWhen: "e-commerce، برندهای جوان، آموزشی و محصولات B2C.",
    doesNotDo: "حس پریمیوم و لوکس نمی‌سازد.",
    reference: "gumroad · duolingo · Linear's pricing",
    swatch: ["#ff5d8f", "#ffd166", "#06d6a0"]
  },
  "Dark Mode": {
    title: "Dark Mode (OLED)",
    whatItDoes: "پس‌زمینه‌ی مشکی واقعی (#000) و کمترین نور. باتری دوست و چشم‌دوست در شب.",
    useWhen: "ابزارهای dev، اپ‌های شبانه، کد و محتوای تصویری.",
    doesNotDo: "در روشنایی روز و برای متن بلند خسته‌کننده است.",
    reference: "vercel dashboard · linear · raycast",
    swatch: ["#000000", "#0a0a0a", "#91f2c8"]
  },
  Claymorphism: {
    title: "Claymorphism",
    whatItDoes: "اشکال گلی نرم، گوشه‌های گرد، سایه‌های داخل/بیرون و رنگ‌های پاستلی.",
    useWhen: "اپ‌های آموزشی، کودکان و برندهای دوستانه.",
    doesNotDo: "حس حرفه‌ای B2B ندارد.",
    reference: "dribbble claymorphism",
    swatch: ["#f4d7d0", "#aee6e6", "#ffd6a5"]
  },
  Aurora: {
    title: "Aurora UI",
    whatItDoes: "گرادیان‌های نرم شناور مثل شفق قطبی، گلو و هاله‌های نورانی.",
    useWhen: "محصولات AI، برندهای مدرن و علمی، لندینگ‌های باحال.",
    doesNotDo: "تراکم بالا و متن زیاد را خوب نشان نمی‌دهد.",
    reference: "v0.dev · linear · stripe gradient",
    swatch: ["#0b1020", "#6d4bd8", "#41d1ff"]
  },
  "Retro-Futurism": {
    title: "Retro-Futurism",
    whatItDoes: "نگاه آینده از نگاه گذشته: نئون، گرید، فونت‌های پیکسلی و طرح‌های ۸۰s.",
    useWhen: "گیم، کامیونیتی‌های کریپتو، برندهای جسور.",
    doesNotDo: "مخاطب عمومی B2B.",
    reference: "synthwave sites · awwwards retro",
    swatch: ["#2b1055", "#ff006e", "#ffbe0b"]
  },
  "Flat Design": {
    title: "Flat Design",
    whatItDoes: "بدون سایه و بدون تکسچر؛ رنگ‌های تخت، آیکون‌های مسطح و چیدمان واضح.",
    useWhen: "محصولات گروهی، مستندات، و سایت‌های اطلاعاتی سریع.",
    doesNotDo: "عمق و لایه را نشان نمی‌دهد؛ می‌تواند یکنواخت شود.",
    reference: "microsoft fluent · material design",
    swatch: ["#ffffff", "#0078d4", "#107c10"]
  },
  "Liquid Glass": {
    title: "Liquid Glass",
    whatItDoes: "شیشه‌ی مایع و در حال حرکت، انعکاس و شکست نور؛ نسخه‌ی پویاتر Glassmorphism.",
    useWhen: "محصولات پریمیوم، اپ‌های 2025+ و برندهای لوکس.",
    doesNotDo: "بازده بر روی سیستمعامل‌های قدیمی.",
    reference: "apple iOS 26 · figma liquid glass",
    swatch: ["#0a0f1c", "#7fd1ff", "#d6b8ff"]
  },
  "Motion-Driven": {
    title: "Motion-Driven",
    whatItDoes: "حرکت خودش استارت این رابط است: عناصر موقع ورود، اسکرول و کلیک می‌رقصند.",
    useWhen: "محصولات خلاق، کمپین‌ها و برندهایی که می‌خواهند متفاوت دیده شوند.",
    doesNotDo: "احتیاج به تست روی دستگاه‌های ضعیف دارد.",
    reference: "framer.com · awwwards motion sites",
    swatch: ["#0d0d12", "#ff5c8a", "#5cf2c8"]
  },
  "Bento Box": {
    title: "Bento Box Grid",
    whatItDoes: "گرید کارت‌های با اندازه‌های مختلف مثل یک ناهارخانه ژاپنی؛ هر کارت یک ویژگی.",
    useWhen: "محصولات SaaS با چند ویژگی پراکنده، Apple-style showcaseها.",
    doesNotDo: "محتوای روایی طولانی را خوب نشان نمی‌دهد.",
    reference: "apple iphone page · shadcn blocks · 21st.dev bento",
    swatch: ["#101318", "#1c2230", "#91f2c8"]
  },
  Neubrutalism: {
    title: "Neubrutalism",
    whatItDoes: "نسخه‌ی مدرن Brutalism: حاشیه‌های ضخیم، رنگ‌های سخت، سایه‌های تخت و تایپوگرافی درشت.",
    useWhen: "استارتاپ‌های جسور، DevTools، برندهای جوان.",
    doesNotDo: "محصولات مالی و سلامت.",
    reference: "gumroad · lovable.dev · v0",
    swatch: ["#fdfdf6", "#111111", "#ff5722"]
  },
  "AI-Native": {
    title: "AI-Native UI",
    whatItDoes: "رابط که اساساً حول یک کادر گفتگو/پرامپت ساخته شده؛ بقیه‌ی صفحه کمترین نقش را دارد.",
    useWhen: "محصولات AI، ایجنت‌ها، دستیارها.",
    doesNotDo: "محصولاتی که GUI سنتی لازم دارند.",
    reference: "chatgpt · claude.ai · v0.dev",
    swatch: ["#0f0f10", "#ece8e1", "#91f2c8"]
  },
  Cyberpunk: {
    title: "Cyberpunk UI",
    whatItDoes: "HUD علمی-تخیلی، نئون، گرید خطی، و افکت‌های scanline.",
    useWhen: "گیم، کریپتو، امنیت سایبری.",
    doesNotDo: "خوانایی متن بلند.",
    reference: "cyberpunk 2077 UI · awwwards sci-fi",
    swatch: ["#0a0014", "#ff003c", "#00f0ff"]
  },
  Editorial: {
    title: "Editorial / Magazine",
    whatItDoes: "چیدمان مجله‌ای، تایپوگرافی سرلوحه و گرید محتوای غنی.",
    useWhen: "نشریات، وبلاگ‌ها، پورتفولیو و برندهای روایی.",
    doesNotDo: "محصولات اپلیکیشنی.",
    reference: "nytimes · theverge · portfolio sites",
    swatch: ["#f7f4ee", "#1a1a1a", "#c0392b"]
  }
};

const SHAPE = {
  flat: `<rect x="0" y="0" width="120" height="76" fill="#161a21"/>`,
  accent: `<circle cx="60" cy="38" r="20" fill="url(#g3d)"/><rect x="0" y="0" width="120" height="76" fill="#161a21" opacity="0.35"/>`,
  section: `<rect x="8" y="8" width="46" height="28" rx="4" fill="url(#g3d)"/><rect x="62" y="8" width="50" height="28" rx="4" fill="#20262f"/><rect x="8" y="42" width="104" height="26" rx="4" fill="#1a1f28"/>`,
  immersive: `<path d="M10 66 L40 14 L74 50 L110 22 L110 76 L10 76 Z" fill="url(#g3d)"/><circle cx="96" cy="20" r="8" fill="var(--accent-2, #ff8f5c)"/>`
};

const GRADIENT_DEFS = `
  <defs>
    <linearGradient id="g3d" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#91f2c8"/>
      <stop offset="1" stop-color="#6e9bff"/>
    </linearGradient>
  </defs>
`;

export function renderSwatchVisual(swatch, uid) {
  const id = `sw-${uid}`;
  const stops = swatch.map((color, index) => `<stop offset="${(index / (swatch.length - 1 || 1)).toFixed(2)}" stop-color="${color}"/>`).join("");
  return `<svg class="visual-svg" viewBox="0 0 120 76" ${Object.entries(A11Y).map(([k, v]) => `${k}="${v}"`).join(" ")}>
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient></defs>
    <rect width="120" height="76" rx="10" fill="#0e1116"/>
    <rect x="6" y="6" width="108" height="64" rx="8" fill="url(#${id})"/>
    <rect x="14" y="52" width="46" height="10" rx="5" fill="rgba(255,255,255,0.82)"/>
  </svg>`;
}

export function renderMotionVisual(gradient, motion, uid) {
  const id = `mo-${uid}`;
  const stops = gradient.map((color, index) => `<stop offset="${(index / (gradient.length - 1)).toFixed(2)}" stop-color="${color}"/>`).join("");
  const wave = {
    subtle: `<path d="M0 56 Q 30 50 60 56 T 120 56" stroke="rgba(255,255,255,0.55)" stroke-width="2" fill="none"/>`,
    steady: `<path d="M0 58 Q 20 44 40 58 T 80 58 T 120 58" stroke="rgba(255,255,255,0.65)" stroke-width="2.5" fill="none"/><circle cx="30" cy="26" r="6" fill="rgba(255,255,255,0.8)"><animate attributeName="cx" values="14;106;14" dur="3.2s" repeatCount="indefinite"/></circle>`,
    flow: `<path d="M0 60 Q 24 36 48 52 T 96 44 T 120 58" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" fill="none"/><circle cx="20" cy="22" r="5" fill="#fff"><animate attributeName="cx" values="12;108;12" dur="2.4s" repeatCount="indefinite"/><animate attributeName="cy" values="22;40;22" dur="2.4s" repeatCount="indefinite"/></circle><circle cx="80" cy="30" r="4" fill="#fff" opacity="0.7"><animate attributeName="cx" values="96;16;96" dur="3.4s" repeatCount="indefinite"/></circle>`
  }[motion] || "";
  return `<svg class="visual-svg" viewBox="0 0 120 76" ${Object.entries(A11Y).map(([k, v]) => `${k}="${v}"`).join(" ")}>
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient></defs>
    <rect width="120" height="76" rx="10" fill="url(#${id})"/>
    ${wave}
  </svg>`;
}

export function renderThreeDVisual(shape, uid) {
  const id = `td-${uid}`;
  return `<svg class="visual-svg" viewBox="0 0 120 76" ${Object.entries(A11Y).map(([k, v]) => `${k}="${v}"`).join(" ")}>
    ${GRADIENT_DEFS.replace("g3d", id)}
    ${SHAPE[shape] || SHAPE.flat}
  </svg>`;
}

export function renderLoaderVisual(pattern, uid) {
  const id = `ld-${uid}`;
  const body = {
    overlay: `<rect width="120" height="76" rx="10" fill="#0e1116"/><rect x="34" y="26" width="52" height="24" rx="12" fill="rgba(255,255,255,0.08)"/><rect x="34" y="26" width="52" height="24" rx="12" fill="none" stroke="rgba(255,255,255,0.18)"/><rect x="40" y="34" width="40" height="8" rx="4" fill="${"#91f2c8"}"><animate attributeName="width" values="6;40;6" dur="1.6s" repeatCount="indefinite"/></rect>`,
    skeleton: `<rect width="120" height="76" rx="10" fill="#14171d"/><rect x="12" y="12" width="44" height="10" rx="5" fill="rgba(255,255,255,0.1)"><animate attributeName="opacity" values="0.35;0.75;0.35" dur="1.4s" repeatCount="indefinite"/></rect><rect x="12" y="28" width="96" height="8" rx="4" fill="rgba(255,255,255,0.08)"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.4s" begin="0.15s" repeatCount="indefinite"/></rect><rect x="12" y="42" width="70" height="8" rx="4" fill="rgba(255,255,255,0.08)"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.4s" begin="0.3s" repeatCount="indefinite"/></rect><rect x="12" y="56" width="34" height="8" rx="4" fill="rgba(255,255,255,0.08)"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.4s" begin="0.45s" repeatCount="indefinite"/></rect>`,
    gate: `<rect width="120" height="76" rx="10" fill="#0e1116"/><circle cx="60" cy="38" r="14" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="4"/><circle cx="60" cy="38" r="14" fill="none" stroke="#91f2c8" stroke-width="4" stroke-dasharray="88" stroke-dashoffset="0" transform="rotate(-90 60 38)"><animate attributeName="stroke-dashoffset" values="88;0" dur="1.8s" repeatCount="indefinite"/></circle>`
  }[pattern] || "";
  return `<svg class="visual-svg" viewBox="0 0 120 76" ${Object.entries(A11Y).map(([k, v]) => `${k}="${v}"`).join(" ")}>${body}</svg>`;
}

export function renderLayoutVisual(layout, uid) {
  const id = `ly-${uid}`;
  const hero = `<rect width="120" height="76" rx="10" fill="#0e1116"/><rect x="10" y="10" width="100" height="30" rx="8" fill="url(#${id})"/><rect x="10" y="46" width="46" height="20" rx="6" fill="rgba(255,255,255,0.08)"/><rect x="64" y="46" width="46" height="20" rx="6" fill="rgba(255,255,255,0.05)"/>`;
  const slider = `<rect width="120" height="76" rx="10" fill="#0e1116"/><rect x="8" y="12" width="74" height="52" rx="8" fill="url(#${id})"/><rect x="88" y="20" width="24" height="36" rx="6" fill="rgba(255,255,255,0.1)"/><circle cx="98" cy="38" r="5" fill="#fff" opacity="0.8"><animate attributeName="cy" values="26;50;26" dur="2s" repeatCount="indefinite"/></circle>`;
  const defs = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#91f2c8"/><stop offset="1" stop-color="#6e9bff"/></linearGradient></defs>`;
  return `<svg class="visual-svg" viewBox="0 0 120 76" ${Object.entries(A11Y).map(([k, v]) => `${k}="${v}"`).join(" ")}>${defs}${layout === "slider" ? slider : hero}</svg>`;
}

export function renderMascotVisual(face, uid) {
  const id = `ms-${uid}`;
  const defs = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#91f2c8"/><stop offset="1" stop-color="#ff8f5c"/></linearGradient></defs>`;
  const bodies = {
    abstract: `<circle cx="60" cy="40" r="22" fill="url(#${id})"/><circle cx="60" cy="40" r="10" fill="#0e1116" opacity="0.55"/>`,
    robot: `<rect x="38" y="20" width="44" height="34" rx="10" fill="url(#${id})"/><circle cx="50" cy="35" r="4" fill="#0e1116"/><circle cx="70" cy="35" r="4" fill="#0e1116"/><rect x="52" y="46" width="16" height="4" rx="2" fill="#0e1116"/><rect x="56" y="10" width="8" height="10" rx="4" fill="#0e1116"/><circle cx="60" cy="8" r="4" fill="#ff8f5c"/>`,
    organic: `<path d="M38 52 C 30 40 34 22 52 20 C 72 18 84 32 78 48 C 74 60 48 64 38 52 Z" fill="url(#${id})"/><circle cx="52" cy="34" r="3.5" fill="#0e1116"/><circle cx="66" cy="36" r="3.5" fill="#0e1116"/><path d="M52 46 Q 60 52 68 46" stroke="#0e1116" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    playful: `<circle cx="60" cy="38" r="24" fill="url(#${id})"/><circle cx="51" cy="32" r="5" fill="#fff"/><circle cx="69" cy="32" r="5" fill="#fff"/><circle cx="52" cy="33" r="2.4" fill="#0e1116"/><circle cx="70" cy="33" r="2.4" fill="#0e1116"/><path d="M48 48 Q 60 58 72 48" stroke="#0e1116" stroke-width="3" fill="none" stroke-linecap="round"/>`
  };
  return `<svg class="visual-svg" viewBox="0 0 120 76" ${Object.entries(A11Y).map(([k, v]) => `${k}="${v}"`).join(" ")}>${defs}${bodies[face] || bodies.abstract}</svg>`;
}

export function pickStyleVisual(category) {
  const key = Object.keys(styleVisuals).find((key) => category.includes(key));
  return styleVisuals[key] ?? null;
}
