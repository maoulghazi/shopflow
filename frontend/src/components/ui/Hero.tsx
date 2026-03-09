export default function Hero() {
  return (
    <section className="bg-earth text-cream py-24 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(196,154,60,0.15),transparent_60%)]" />
      <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4 relative">Curated Objects for Slow Living</p>
      <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6 relative">
        Made with <em className="text-gold">intention,</em><br />built to last.
      </h1>
      <p className="text-stone max-w-md mx-auto leading-relaxed mb-10 relative">
        A carefully chosen selection of handcrafted homeware, textiles, and everyday objects from independent makers.
      </p>
      <button
        onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-rust text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-gold hover:text-char transition-all hover:-translate-y-0.5 relative"
      >
        Shop the Collection
      </button>
    </section>
  )
}
