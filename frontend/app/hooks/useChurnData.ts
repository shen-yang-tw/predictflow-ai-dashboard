'use client'

import { useMemo, useState } from 'react'
import { CustomerChurnRecord, emptyFilters, exportRowsToCsv, Filters, FiltersSchema, REAL_KAGGLE_CHURN_DATA } from '../types'

export function useChurnData() {
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [isLoading] = useState(false)

  const filteredRows = useMemo(() => REAL_KAGGLE_CHURN_DATA.filter((row) => {
    const matchesSearch = row.customer_id.toLowerCase().includes(filters.search.toLowerCase())
    const matchesRisk = filters.risk === 'All' || row.risk_level === filters.risk
    const matchesContract = filters.contract === 'All' || row.contract === filters.contract
    return matchesSearch && matchesRisk && matchesContract
  }), [filters])

  const highRiskRows = useMemo(() => REAL_KAGGLE_CHURN_DATA.filter((row) => row.churn_probability >= 0.8), [])
  const meanSpend = useMemo(() => REAL_KAGGLE_CHURN_DATA.reduce((sum, row) => sum + row.monthly_charges, 0) / REAL_KAGGLE_CHURN_DATA.length, [])

  const updateFilters = (next: Partial<Filters>) => setFilters((current) => FiltersSchema.parse({ ...current, ...next }))
  const resetFilters = () => setFilters(emptyFilters)
  const exportToCSV = () => {
    const blob = new Blob([exportRowsToCsv(filteredRows)], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'predictflow-churn-customers.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return { rows: filteredRows, allRows: REAL_KAGGLE_CHURN_DATA, highRiskRows, meanSpend, filters, updateFilters, resetFilters, exportToCSV, isLoading }
}

export type ChurnDataState = ReturnType<typeof useChurnData>
export type ChurnRow = CustomerChurnRecord
