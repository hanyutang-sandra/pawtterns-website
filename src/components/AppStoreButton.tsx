interface AppStoreButtonProps {
  comingSoon?: boolean
}

export default function AppStoreButton({ comingSoon = true }: AppStoreButtonProps) {
  if (comingSoon) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center" aria-label="App availability">
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-brand-green-tint px-6 sm:px-8 py-3 sm:py-4 rounded-2xl">
          <img
            src="/icon_green.png"
            alt="paw print"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
          />
          <div className="text-left">
            <div className="text-xs sm:text-sm font-medium text-brand-green uppercase tracking-wide">
              Coming Soon
            </div>
            <div className="text-base sm:text-lg font-semibold text-label-primary">
              Available on the App Store
            </div>
          </div>
        </div>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
          Pawtterns is currently in development. Check back soon!
        </p>
      </section>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <a
        href="https://apps.apple.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <div className="inline-flex items-center gap-3 bg-label-primary hover:bg-opacity-90 px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div className="text-left text-white">
            <div className="text-xs font-medium uppercase tracking-wide">
              Download on the
            </div>
            <div className="text-2xl font-semibold -mt-1">
              App Store
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
