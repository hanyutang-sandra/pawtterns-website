export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-page-bg py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-label-primary mb-3 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Last updated: March 10, 2026
          </p>
        </header>

        {/* Content */}
        <section className="bg-card-bg rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
            {/* Data Storage */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-label-primary mb-3 sm:mb-4">
                Data Storage
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <p>
                  All data you enter into Pawtterns is stored locally on your device using Core Data. No information is transmitted to external servers or third parties.
                </p>
                <p>
                  Your pet profiles, logged exposures, symptoms, and insights remain entirely on your device and under your control.
                </p>
              </div>
            </div>

            {/* Data Collection */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-label-primary mb-3 sm:mb-4">
                Data Collection
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <p>
                  Pawtterns does not collect, transmit, or share any personal information or usage data.
                </p>
                <p>
                  We do not use analytics, tracking, or advertising services.
                </p>
                <p>
                  No account or login is required to use the app.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-label-primary mb-3 sm:mb-4">
                Your Rights
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <p>You have complete control over your data:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">•</span>
                    <span>Delete individual logs or pets at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">•</span>
                    <span>Remove all data from the app using the "Remove All Data" option in the More tab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">•</span>
                    <span>Uninstalling the app will permanently delete all local data</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-label-primary mb-3 sm:mb-4">
                Contact
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <p>Questions about privacy?</p>
                <a
                  href="mailto:support@pawtterns.app"
                  className="inline-flex items-center gap-2 text-brand-green hover:underline font-medium"
                >
                  support@pawtterns.app
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
