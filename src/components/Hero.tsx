export default function Hero() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
      {/* App Icon */}
      <div className="mb-8 flex justify-center">
        <img
          src="/icon_green.png"
          alt="Pawtterns app icon"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl shadow-lg"
        />
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-label-primary mb-8 leading-tight">
        Love your pets, with data
      </h1>

      {/* Subheadline */}
      <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
        Pawtterns helps you identify possible food and medication triggers through simple logging and clear, deterministic analysis.
        <span className="text-label-primary font-medium"> No AI, no guesswork—just patterns.</span>
      </p>

    </div>
  )
}
