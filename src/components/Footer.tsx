import { BRAND } from "../config";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {BRAND.companyName}
            </h3>
            <p className="text-sm text-slate-600">
              Executive Growth Partnership
            </p>
          </div>

          {/* Powered By Section */}
          <div className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Powered by
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-800">
                  {BRAND.poweredBy}
                </span>
                <span className="text-xs text-slate-500">™</span>
              </div>
              <p className="text-xs text-slate-500">
                {BRAND.companyEntity}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-600 mb-1">
              Visit us at
            </p>
            <a
              href={`https://${BRAND.companyWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {BRAND.companyWebsite}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {BRAND.companyEntity}. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              You get clarity. We get fewer angry spreadsheets.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
