function ScrollToTop({ scrolled }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full
                 bg-gradient-to-br from-gold-500 to-gold-600
                 flex items-center justify-center shadow-xl
                 hover:from-gold-400 hover:to-gold-500 transition-all
                 ${
                   scrolled
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-10 pointer-events-none"
                 }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}

export default ScrollToTop;
