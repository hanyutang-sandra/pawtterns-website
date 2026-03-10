import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card-bg border-t border-gray-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: Links */}
          <div className="flex gap-6 text-sm order-2 md:order-1">
            <Link
              to="/"
              className="text-gray-600 hover:text-brand-green transition-colors"
            >
              Home
            </Link>
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-brand-green transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right: Copyright */}
          <div className="text-sm text-gray-600 text-center md:text-right order-1 md:order-2">
            © {currentYear} Pawtterns. All rights reserved.
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Questions?{' '}
          <a
            href="mailto:support@pawtterns.app"
            className="text-brand-green hover:underline"
          >
            support@pawtterns.app
          </a>
        </div>
      </div>
    </footer>
  )
}
