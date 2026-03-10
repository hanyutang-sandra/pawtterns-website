interface Feature {
  image: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    image: '/screenshots/quick-logging.png',
    title: 'Quick Logging',
    description: 'Record food and medication exposures in seconds with smart search and quick entry.',
  },
  {
    image: '/screenshots/pattern-detection.png',
    title: 'Pattern Detection',
    description: 'See clear correlations between exposures and symptoms through deterministic analysis.',
  },
  {
    image: '/screenshots/privacy-first.png',
    title: 'Privacy First',
    description: 'No account needed. One-click delete all data. Everything stays on your device.',
  },
  {
    image: '/screenshots/ads-free.png',
    title: 'Ads Free',
    description: '100% free. No ads, ever. Built for clarity and ease of use.',
  },
]

export default function FeatureGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" aria-label="Features">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {features.map((feature, index) => (
          <article
            key={index}
            className="bg-card-bg rounded-3xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.25)] hover:scale-[1.03] transition-all duration-300"
          >
            {/* Screenshot placeholder with iPhone 17 aspect ratio */}
            <div className="mb-4 overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center mx-auto" style={{ aspectRatio: '1320 / 2868', maxWidth: '50%' }}>
              <img
                src={feature.image}
                alt={`${feature.title} screenshot`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-label-primary mb-2 sm:mb-3">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
