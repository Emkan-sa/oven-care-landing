import { useEffect, useState } from "react";
import { Check, Clock3, Copy, MessageCircle, Phone, Share2, ShieldCheck } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/966509677008?text=مرحباً، أرسلت طلب حجز وأرغب بتأكيد الموعد";

export default function ThankYou() {
  const [orderNumber, setOrderNumber] = useState("OM-000000");
  const [shared, setShared] = useState(false);
  useEffect(() => { try { const booking = JSON.parse(sessionStorage.getItem("oven-care-booking") || "{}"); if (booking.orderNumber) setOrderNumber(booking.orderNumber); } catch { /* ignore malformed session data */ } }, []);
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = "عرض اليوم الوطني من المجموعة المثالية: خصم 15% على خدمات صيانة وتنظيف الأفران";
  const shareOffer = async () => { if (navigator.share) { await navigator.share({ title: "عرض المجموعة المثالية", text: shareText, url: shareUrl }); } else { await navigator.clipboard?.writeText(`${shareText} ${shareUrl}`); setShared(true); } };
  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-5 py-16 text-[#f7f2e8]">
      <div className="fixed inset-0 -z-0 opacity-30 [background-image:radial-gradient(#d6a944_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
      <section className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-[#d6a944]/35 bg-[#0b1929]/90 p-7 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#20bf68]/15 text-[#40d982] ring-1 ring-[#20bf68]/35"><Check size={42} strokeWidth={2.5} /></div>
        <p className="mt-7 text-sm font-bold tracking-[0.2em] text-[#d6a944]">تم استلام طلبك بنجاح</p>
        <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">شكرًا لثقتك<br /><span className="gold-text">بالمجموعة المثالية</span></h1>
        <p className="mx-auto mt-5 max-w-lg leading-8 text-white/65">سيتواصل معك فريقنا قريبًا لتأكيد الموعد والتفاصيل. وللحصول على رد أسرع، يمكنك بدء محادثة مباشرة عبر واتساب.</p>
        <div className="mx-auto mt-7 flex max-w-md items-center justify-between rounded-2xl border border-[#d6a944]/30 bg-[#d6a944]/10 px-5 py-4 text-right"><div><p className="text-xs text-white/45">رقم الطلب</p><p className="mt-1 font-black tracking-widest text-[#f0ca70]">{orderNumber}</p></div><div className="text-left"><p className="text-xs text-white/45">وقت التواصل المتوقع</p><p className="mt-1 font-bold text-white/80">خلال 30 دقيقة</p></div></div>
        <div className="my-9 grid gap-3 text-right sm:grid-cols-3">{[[Clock3, "تأكيد سريع", "نتواصل معك قريبًا"], [ShieldCheck, "ضمان معتمد", "خدمة باحتراف"], [MessageCircle, "تواصل مباشر", "واتساب متاح"]].map(([Icon, title, text]) => <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><Icon size={20} className="mb-3 text-[#d6a944]" /><p className="font-bold">{String(title)}</p><p className="mt-1 text-xs text-white/45">{String(text)}</p></div>)}</div>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="gold-button inline-flex items-center gap-3 rounded-2xl px-7 py-4 font-black"><MessageCircle size={19} /> متابعة الحجز عبر واتساب</a>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#20bf68]/40 px-4 py-3 text-sm font-bold text-[#55db8b] transition hover:bg-[#20bf68]/10"><MessageCircle size={17} /> مشاركة عبر واتساب</a><button onClick={shareOffer} className="inline-flex items-center gap-2 rounded-xl border border-[#d6a944]/40 px-4 py-3 text-sm font-bold text-[#f0ca70] transition hover:bg-[#d6a944]/10"><Share2 size={17} /> مشاركة عبر سناب {shared ? <Check size={15} /> : <Copy size={15} />}</button></div>
        <a href="/" className="mt-5 block text-sm font-bold text-white/45 transition hover:text-[#f0ca70]">العودة إلى الصفحة الرئيسية</a>
      </section>
      <a href="tel:+966509677008" className="call-float" aria-label="الاتصال بالمجموعة المثالية"><Phone size={22} /></a>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="الحجز عبر واتساب">واتساب</a>
    </main>
  );
}
