import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { Activity, BarChart3, Database, LayoutDashboard, Users } from 'lucide-react'
import './globals.css'

export const metadata: Metadata = {
  title: 'PredictFlow AI | Churn Intelligence',
  description: 'Enterprise churn analytics and ModelOps workspace powered by PredictFlow AI.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1120',
  userScalable: false,
}

const navigation = [
  { href: '/', label: 'Executive Overview', icon: LayoutDashboard },
  { href: '/customers', label: 'Customer Data', icon: Users },
  { href: '/insights', label: 'Model Insights', icon: BarChart3 },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080d19] text-slate-100 antialiased">
        <div className="min-h-screen lg:flex">
          <aside className="border-b border-slate-800 bg-[#0b1220] lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3 px-5 py-5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                <Activity aria-hidden="true" className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">PredictFlow AI</p>
                <p className="text-[11px] text-slate-500">Intelligence workspace</p>
              </div>
            </div>
            <nav aria-label="Primary navigation" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-2 lg:px-3 lg:py-4">
              {navigation.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="group flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800/80 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                  <Icon aria-hidden="true" className="size-4 text-slate-500 group-hover:text-indigo-300" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto hidden p-4 lg:block">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-300"><Database aria-hidden="true" className="size-4 text-emerald-400" /> Live model feed</div>
                <p className="text-[11px] leading-5 text-slate-500">IBM Telco Churn dataset connected. Last sync 2 minutes ago.</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-400" /> Operational</div>
              </div>
            </div>
          </aside>
          <main className="min-w-0 flex-1 lg:ml-64">{children}</main>
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
