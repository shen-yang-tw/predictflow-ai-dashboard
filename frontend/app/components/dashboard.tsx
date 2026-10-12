'use client'

import { useState } from 'react'
import { AlertTriangle, ArrowUpRight, CheckCircle2, Download, RefreshCw, Search, ShieldAlert, SlidersHorizontal, X } from 'lucide-react'
import { ChurnRow } from '../hooks/useChurnData'
import { formatCurrency, riskTone } from '../types'

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <header className="flex flex-col gap-5 border-b border-slate-800/80 px-5 py-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10"><div><p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300">{eyebrow}</p><h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p></div>{action}</header>
}

export function MetricCard({ label, value, detail, accent = 'indigo', icon: Icon }: { label: string; value: string; detail: string; accent?: 'indigo' | 'emerald' | 'amber' | 'rose'; icon: React.ElementType }) {
  const tones = { indigo: 'text-indigo-300 bg-indigo-500/10 ring-indigo-400/20', emerald: 'text-emerald-300 bg-emerald-500/10 ring-emerald-400/20', amber: 'text-amber-300 bg-amber-500/10 ring-amber-400/20', rose: 'text-rose-300 bg-rose-500/10 ring-rose-400/20' }
  return <div className="rounded-xl border border-slate-800 bg-[#0d1525] p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold text-white">{value}</p></div><div className={`flex size-9 items-center justify-center rounded-lg ring-1 ${tones[accent]}`}><Icon aria-hidden="true" className="size-4" /></div></div><p className="mt-3 text-xs text-slate-500">{detail}</p></div>
}

export function RiskBadge({ risk }: { risk: ChurnRow['risk_level'] }) {
  const tone = riskTone(risk)
  const classes = { high: 'bg-rose-500/10 text-rose-300 ring-rose-400/20', medium: 'bg-amber-500/10 text-amber-300 ring-amber-400/20', low: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20' }
  return <span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-medium ring-1 ${classes[tone]}`}>{risk} risk</span>
}

export function RiskPanel({ rows, onClose }: { rows: ChurnRow[]; onClose: () => void }) {
  const [remediated, setRemediated] = useState<string[]>([])
  return <div className="fixed inset-0 z-50 flex justify-end bg-black/50" role="dialog" aria-modal="true" aria-label="Urgent risk accounts"><button className="absolute inset-0 cursor-default" aria-label="Close risk panel" onClick={onClose} /><aside className="relative h-full w-full max-w-md overflow-y-auto border-l border-slate-700 bg-[#0b1220] p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300">Action queue</p><h2 className="mt-2 text-xl font-semibold text-white">Urgent risk accounts</h2><p className="mt-2 text-sm text-slate-400">{rows.length} accounts need immediate attention.</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" aria-label="Close"><X className="size-5" /></button></div><div className="mt-6 flex flex-col gap-3">{rows.map((row) => { const done = remediated.includes(row.customer_id); return <div key={row.customer_id} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"><div className="flex items-start justify-between"><div><p className="font-mono text-sm text-white">{row.customer_id}</p><p className="mt-1 text-xs text-slate-500">{row.contract} · {row.tenure} months</p></div><RiskBadge risk={row.risk_level} /></div><div className="mt-4 flex items-center justify-between"><span className="text-xs text-slate-400">Churn probability <strong className="text-rose-300">{Math.round(row.churn_probability * 100)}%</strong></span><button disabled={done} onClick={() => setRemediated((current) => [...current, row.customer_id])} className="rounded-md border border-slate-700 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 transition hover:border-indigo-400 hover:text-white disabled:cursor-default disabled:border-emerald-500/30 disabled:text-emerald-300">{done ? 'Queued' : 'Start save play'}</button></div></div> })}</div></aside></div>
}

export function CustomerTable({ rows, isLoading }: { rows: ChurnRow[]; isLoading: boolean }) {
  if (isLoading) return <div className="p-6 text-sm text-slate-400" role="status" aria-live="polite">Loading customer records…</div>
  if (rows.length === 0) return <div className="flex flex-col items-center justify-center gap-2 p-14 text-center"><Search className="size-6 text-slate-600" /><p className="text-sm font-medium text-slate-300">No customers match these filters</p><p className="text-xs text-slate-500">Try a broader search or reset the filters.</p></div>
  return <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-500"><tr>{['Customer', 'Contract', 'Tenure', 'Monthly spend', 'Risk', 'Probability', 'Actual'].map((heading) => <th key={heading} className="px-6 py-4 font-medium">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-800/70">{rows.map((row) => <tr key={row.customer_id} className="transition hover:bg-slate-800/30"><td className="px-6 py-4 font-mono text-xs text-slate-200">{row.customer_id}</td><td className="px-6 py-4 text-xs text-slate-400">{row.contract}</td><td className="px-6 py-4 text-xs text-slate-400">{row.tenure} mo</td><td className="px-6 py-4 text-xs text-slate-300">{formatCurrency(row.monthly_charges)}</td><td className="px-6 py-4"><RiskBadge risk={row.risk_level} /></td><td className="px-6 py-4 text-xs font-medium text-slate-200">{Math.round(row.churn_probability * 100)}%</td><td className="px-6 py-4 text-xs text-slate-400">{row.actual_churn ? 'Churned' : 'Retained'}</td></tr>)}</tbody></table></div>
}

export function ProgressBar({ label, value }: { label: string; value: number }) { return <div><div className="mb-2 flex justify-between text-xs"><span className="text-slate-300">{label}</span><span className="text-slate-500">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-indigo-400" style={{ width: `${value}%` }} /></div></div> }

export { AlertTriangle, ArrowUpRight, CheckCircle2, Download, RefreshCw, ShieldAlert, SlidersHorizontal }
