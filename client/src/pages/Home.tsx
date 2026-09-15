import { useEffect, useState } from "react";
import type React from "react";
import { ArrowLeft, Check, Clock3, Flame, MapPin, MessageCircle, Quote, ShieldCheck, Sparkles, Wrench, Zap } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/966509677008?text=مرحباً، أرغب بحجز خدمة صيانة وتنظيف الفرن والاستفادة من خصم 15٪";
const SNAP_PIXEL_ID = "1f59acaf-f834-4106-bd0a-e07bc9e18c68";
const GA_MEASUREMENT_ID = "";

const services = [
  { icon: Flame, title: "صيانة الأفران", text: "تشخيص دقيق وإصلاح احترافي لأفران الغاز والكهرباء." },
  { icon: Sparkles, title: "تنظيف وتعقيم", text: "إزالة الدهون وتلميع زجاج الباب والتجويف بعناية." },
  { icon: Wrench, title: "قطع أصلية", text: "قطع غيار موثوقة لكافة الماركات الإيطالية والألمانية والأمريكية." },
];

const benefits = ["فحص تسريب الغاز مجاناً مع الصيانة", "خدمة سريعة بنفس اليوم", "فنيون مدربون بضمان معتمد", "أسعار واضحة وخصم 15% لفترة محدودة"];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (GA_MEASUREMENT_ID && !document.querySelector("script[data-oven-ga]")) {
      const script = document.createElement("script"); script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`; script.dataset.ovenGa = "true"; document.head.appendChild(script);
      const inline = document.createElement("script"); inline.dataset.ovenGa = "true"; inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}')`; document.head.appendChild(inline);
    }
    if (SNAP_PIXEL_ID && !document.querySelector("script[data-oven-snap]")) {
      const script = document.createElement("script"); script.dataset.ovenSnap = "true"; script.innerHTML = `!function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script',r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u)}(window,document,'https://sc-static.net/scevent.min.js');snaptr('init','${SNAP_PIXEL_ID}');snaptr('track','PAGE_VIEW');`; document.head.appendChild(script);
    }
  }, []);

  const trackConversion = (eventName: string) => {
    const w = window as Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void; snaptr?: (...args: unknown[]) => void };
    w.dataLayer = w.dataLayer || []; w.dataLayer.push({ event: eventName, page: "oven-care-landing" });
    w.gtag?.("event", eventName);
    w.snaptr?.("track", eventName === "booking_submit" ? "SIGN_UP" : "CONTACT");
  };

  const handleBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `مرحباً، أرغب بحجز موعد.%0Aالاسم: ${data.get("name")}%0Aالمدينة: ${data.get("city")}%0Aنوع الفرن: ${data.get("oven")}`;
    trackConversion("booking_submit"); setIsSubmitting(true); window.open(`https://wa.me/966509677008?text=${message}`, "_blank", "noopener,noreferrer");
    window.setTimeout(() => { setIsSubmitting(false); setSubmitted(true); window.location.assign("/thank-you"); }, 900);
  };

  const whatsappClick = () => trackConversion("whatsapp_click");
  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#07111f] text-[#f7f2e8]">
      <div className="fixed inset-0 -z-0 opacity-30 [background-image:radial-gradient(#d6a944_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
      <div className="relative z-10">
        <div className="border-b border-[#d6a944]/20 bg-[#d6a944] px-4 py-2 text-center text-sm font-bold text-[#07111f] sm:text-base">
          <span className="ml-2 inline-flex items-center gap-1"><Sparkles size={15} /> عرض اليوم الوطني</span>
          <span className="font-black"> خصم 15% على جميع الخدمات</span>
        </div>

        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="المجموعة المثالية">
            <img src="/manus-storage/logo.jpeg" alt="شعار المجموعة المثالية" className="h-12 w-12 rounded-xl object-cover ring-1 ring-[#d6a944]/50" />
            <div className="hidden sm:block"><p className="text-sm font-bold text-[#eac267]">المجموعة المثالية</p><p className="text-[11px] tracking-[0.22em] text-white/50">INTEGRATED HOME SERVICES</p></div>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="gold-button hidden rounded-full px-5 py-3 text-sm font-extrabold sm:inline-flex">احجز عبر واتساب <ArrowLeft size={17} /></a>
        </header>

        <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-16">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6a944]/35 bg-[#d6a944]/10 px-4 py-2 text-sm text-[#f0ca70]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#d6a944]" /> خدمة معتمدة داخل المملكة</div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.18] tracking-tight sm:text-5xl lg:text-7xl">فرنك يستحق <span className="gold-text">عناية مثالية</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-white/65 sm:text-xl">صيانة وتنظيف وإصلاح الأفران بقطع أصلية وضمان معتمد. نعيد لفرنك كفاءته ونظافته بأيدي فنيين محترفين.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a onClick={whatsappClick} href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="gold-button inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-base font-black">حجز فوري عبر واتساب <ArrowLeft size={19} /></a>
              <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-7 py-4 text-base font-bold text-white/80 transition hover:border-[#d6a944]/50 hover:text-[#f0ca70]">تصفح خدماتنا</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55"><span className="flex items-center gap-2"><Clock3 size={16} className="text-[#d6a944]" /> بنفس اليوم</span><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#d6a944]" /> ضمان معتمد</span><span className="flex items-center gap-2"><Zap size={16} className="text-[#d6a944]" /> استجابة سريعة</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] animate-float">
            <div className="absolute -inset-8 rounded-full bg-[#d6a944]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#d6a944]/35 bg-[#0b1726] p-2 shadow-2xl shadow-black/50">
              <img src="/manus-storage/hero_5618d869.png" alt="فني المجموعة المثالية ينظف الفرن" className="h-auto max-h-[660px] w-full rounded-[2.15rem] object-cover object-top" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-[#07111f]/85 px-5 py-3 text-white backdrop-blur-md"><span className="text-sm font-bold">احصل على خصمك الآن</span><span className="text-2xl font-black text-[#f4d26e]">15%</span></div>
            </div>
          </div>
        </section>

        <section id="services" className="border-y border-white/8 bg-[#0b1929]/70 px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-12 max-w-2xl"><p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#d6a944]">خدماتنا المتخصصة</p><h2 className="text-3xl font-black sm:text-5xl">المجموعة المثالية<br /><span className="text-white/55">للخدمات المنزلية المعتمدة</span></h2></div><div className="grid gap-5 md:grid-cols-3">{services.map(({ icon: Icon, title, text }) => <article key={title} className="service-card rounded-3xl border border-white/10 bg-white/[.035] p-7"><div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d6a944]/10 text-[#eac267]"><Icon size={27} /></div><h3 className="text-xl font-extrabold">{title}</h3><p className="mt-3 leading-7 text-white/55">{text}</p></article>)}</div></div></section>

        <section className="border-y border-white/8 bg-[#0b1929]/70 px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]"><div><p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#d6a944]">احجز خدمتك</p><h2 className="text-3xl font-black sm:text-5xl">موعدك يبدأ<br /><span className="gold-text">بثلاث معلومات</span></h2><p className="mt-5 leading-8 text-white/55">أرسل بياناتك وسنفتح لك محادثة واتساب جاهزة مع تفاصيل الحجز.</p><div className="mt-7 flex items-center gap-3 text-sm text-white/55"><MapPin size={18} className="text-[#d6a944]" /> نخدم مدن المملكة والمناطق المجاورة</div></div><form onSubmit={handleBooking} className="rounded-3xl border border-[#d6a944]/25 bg-[#07111f] p-6 shadow-2xl sm:p-8"><label className="mb-4 block text-sm font-bold text-white/80">الاسم الكامل<input required name="name" placeholder="مثال: محمد العتيبي" className="form-input" /></label><label className="mb-4 block text-sm font-bold text-white/80">المدينة<input required name="city" placeholder="الرياض" className="form-input" /></label><label className="mb-6 block text-sm font-bold text-white/80">نوع الفرن<select required name="oven" defaultValue="" className="form-input"><option value="" disabled>اختر النوع</option><option>فرن غاز</option><option>فرن كهرباء</option><option>فرن غاز وكهرباء</option><option>لا أعلم</option></select></label><button disabled={isSubmitting} className="gold-button flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black disabled:cursor-wait disabled:opacity-75">{isSubmitting ? <><span className="loader" /> جارٍ تجهيز طلبك...</> : <><MessageCircle size={19} /> {submitted ? "تم تجهيز محادثة واتساب" : "إرسال طلب الحجز"}</>}</button><p className="mt-3 text-center text-xs text-white/35">سيتم فتح واتساب ثم نقلك لصفحة تأكيد الطلب</p></form></div></section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#d6a944]">لماذا نحن؟</p><h2 className="text-3xl font-black leading-tight sm:text-5xl">راحة بالك تبدأ<br /><span className="gold-text">من مطبخك</span></h2><p className="mt-5 leading-8 text-white/55">نعرف أن الفرن جزء أساسي من يومك، لذلك نصل إليك بسرعة وننجز العمل باحتراف من أول زيارة.</p></div><div className="grid gap-3 sm:grid-cols-2">{benefits.map((item, i) => <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d6a944] text-sm font-black text-[#07111f]">0{i + 1}</span><span className="font-bold text-white/80">{item}</span></div>)}</div></div></section>

        <section className="border-y border-white/8 bg-[#0b1929]/70 px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#d6a944]">ثقة تتكرر</p><h2 className="text-3xl font-black sm:text-5xl">ماذا يقول <span className="gold-text">عملاؤنا؟</span></h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[["سارة من الرياض","الخدمة سريعة جداً والفني نظف الفرن كأنه جديد. أنصح بهم."],["خالد من جدة","فحص تسريب الغاز أعطاني راحة كبيرة، والتعامل كان احترافياً."],["نورة من الدمام","حجزت عبر واتساب ووصل الفني بنفس اليوم. تجربة ممتازة." ]].map(([name,text]) => <article key={name} className="rounded-3xl border border-white/10 bg-white/[.035] p-6"><Quote className="text-[#d6a944]" size={24} /><p className="mt-5 leading-7 text-white/70">“{text}”</p><p className="mt-5 font-bold text-[#f0ca70]">{name}</p></article>)}</div><div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-t border-white/10 pt-8 text-sm font-bold text-white/40"><span className="text-lg text-white/55">BOSCH</span><span className="text-lg text-white/55">ARISTON</span><span className="text-lg text-white/55">ELECTROLUX</span><span className="text-lg text-white/55">WHIRLPOOL</span><span className="text-lg text-white/55">SIEMENS</span></div></div></section>

        <section className="px-5 pb-24 lg:px-8"><div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#d6a944]/35 bg-gradient-to-br from-[#172b3d] to-[#0b1726] p-8 text-center shadow-2xl sm:p-14"><p className="text-sm font-bold tracking-[0.2em] text-[#d6a944]">جاهز لفرن أنظف وأكثر أماناً؟</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">احجز موعدك الآن واستفد من <span className="gold-text">خصم 15%</span></h2><p className="mt-5 text-white/55">تواصل معنا مباشرة عبر واتساب على الرقم <span dir="ltr" className="font-bold text-[#f0ca70]">+966 50 967 7008</span></p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="gold-button mt-8 inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-black">ابدأ محادثة واتساب <ArrowLeft size={19} /></a></div></section>

        <footer className="border-t border-white/8 px-5 py-7 text-center text-sm text-white/40"><p>© {new Date().getFullYear()} المجموعة المثالية للخدمات المنزلية. جميع الحقوق محفوظة.</p></footer>
        <a onClick={whatsappClick} href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="الحجز عبر واتساب">واتساب</a><a href="tel:+966509677008" className="call-float" aria-label="الاتصال بالمجموعة المثالية">اتصال</a>
      </div>
    </main>
  );
}
