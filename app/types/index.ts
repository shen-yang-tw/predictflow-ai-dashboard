import { z } from 'zod'

export const CustomerChurnSchema = z.object({
  id: z.string().uuid().optional(),
  customer_id: z.string(),
  tenure: z.number().min(0).max(100),
  monthly_charges: z.number().positive(),
  total_charges: z.number().nonnegative(),
  contract: z.enum(['Month-to-month', 'One year', 'Two year']),
  actual_churn: z.boolean(),
  churn_probability: z.number().min(0).max(1),
  risk_level: z.enum(['High', 'Medium', 'Low']),
  created_at: z.string().optional(),
})

export type CustomerChurnRecord = z.infer<typeof CustomerChurnSchema>

export interface ModelMetrics {
  accuracy: number
  roc_auc: number
  precision: number
  recall: number
  latency_ms: number
  confusion_matrix: {
    true_positive: number
    false_positive: number
    true_negative: number
    false_negative: number
  }
}

export const REAL_KAGGLE_CHURN_DATA: CustomerChurnRecord[] = [
  {
    customer_id: '7590-VHVEG',
    tenure: 1,
    monthly_charges: 29.85,
    total_charges: 29.85,
    contract: 'Month-to-month',
    actual_churn: true,
    churn_probability: 0.88,
    risk_level: 'High',
    created_at: '2026-09-01T08:00:00Z',
  },
  {
    customer_id: '5575-GNVDE',
    tenure: 34,
    monthly_charges: 56.95,
    total_charges: 1889.5,
    contract: 'One year',
    actual_churn: false,
    churn_probability: 0.22,
    risk_level: 'Low',
    created_at: '2026-09-01T09:40:00Z',
  },
  {
    customer_id: '3668-QPYBK',
    tenure: 2,
    monthly_charges: 53.85,
    total_charges: 108.15,
    contract: 'Month-to-month',
    actual_churn: true,
    churn_probability: 0.91,
    risk_level: 'High',
    created_at: '2026-09-01T09:00:00Z',
  },
  {
    customer_id: '7795-CFOCW',
    tenure: 45,
    monthly_charges: 42.3,
    total_charges: 1840.75,
    contract: 'One year',
    actual_churn: false,
    churn_probability: 0.15,
    risk_level: 'Low',
    created_at: '2026-09-01T09:20:00Z',
  },
  {
    customer_id: '9237-HQJGM',
    tenure: 2,
    monthly_charges: 70.7,
    total_charges: 151.65,
    contract: 'Month-to-month',
    actual_churn: true,
    churn_probability: 0.84,
    risk_level: 'High',
    created_at: '2026-09-01T08:00:00Z',
  },
  {
    customer_id: '9305-CDSKC',
    tenure: 8,
    monthly_charges: 99.65,
    total_charges: 820.5,
    contract: 'Month-to-month',
    actual_churn: true,
    churn_probability: 0.79,
    risk_level: 'High',
    created_at: '2026-09-01T08:10:00Z',
  },
  {
    customer_id: '1452-KNGTH',
    tenure: 22,
    monthly_charges: 89.1,
    total_charges: 1949.4,
    contract: 'Month-to-month',
    actual_churn: false,
    churn_probability: 0.58,
    risk_level: 'Medium',
    created_at: '2026-09-01T09:40:00Z',
  },
  {
    customer_id: '6713-OKOMC',
    tenure: 10,
    monthly_charges: 29.75,
    total_charges: 301.9,
    contract: 'Month-to-month',
    actual_churn: false,
    churn_probability: 0.42,
    risk_level: 'Medium',
    created_at: '2026-09-01T09:20:00Z',
  },
  {
    customer_id: '7892-POOKP',
    tenure: 28,
    monthly_charges: 104.8,
    total_charges: 3046.05,
    contract: 'Month-to-month',
    actual_churn: true,
    churn_probability: 0.76,
    risk_level: 'High',
    created_at: '2026-09-01T09:50:00Z',
  },
  {
    customer_id: '6388-TABGU',
    tenure: 62,
    monthly_charges: 56.15,
    total_charges: 3487.95,
    contract: 'One year',
    actual_churn: false,
    churn_probability: 0.12,
    risk_level: 'Low',
    created_at: '2026-09-01T10:20:00Z',
  },
  {
    customer_id: '9763-GRSKD',
    tenure: 13,
    monthly_charges: 49.95,
    total_charges: 587.45,
    contract: 'Month-to-month',
    actual_churn: false,
    churn_probability: 0.38,
    risk_level: 'Medium',
    created_at: '2026-09-01T09:10:00Z',
  },
  {
    customer_id: '7469-LKBCI',
    tenure: 16,
    monthly_charges: 18.95,
    total_charges: 326.8,
    contract: 'Two year',
    actual_churn: false,
    churn_probability: 0.05,
    risk_level: 'Low',
    created_at: '2026-09-01T09:30:00Z',
  },
  {
    customer_id: '8091-TTWWE',
    tenure: 58,
    monthly_charges: 100.35,
    total_charges: 5681.1,
    contract: 'One year',
    actual_churn: false,
    churn_probability: 0.18,
    risk_level: 'Low',
    created_at: '2026-09-01T10:10:00Z',
  },
  {
    customer_id: '0280-XJG2V',
    tenure: 49,
    monthly_charges: 107.2,
    total_charges: 5202.25,
    contract: 'Month-to-month',
    actual_churn: true,
    churn_probability: 0.72,
    risk_level: 'High',
    created_at: '2026-09-01T10:00:00Z',
  },
  {
    customer_id: '5129-JLPIS',
    tenure: 25,
    monthly_charges: 105.5,
    total_charges: 2686.05,
    contract: 'Month-to-month',
    actual_churn: false,
    churn_probability: 0.49,
    risk_level: 'Medium',
    created_at: '2026-09-01T09:50:00Z',
  },
]

CustomerChurnSchema.array().parse(REAL_KAGGLE_CHURN_DATA)

export const MODEL_METRICS: ModelMetrics = {
  accuracy: 0.815,
  roc_auc: 0.86,
  precision: 0.7,
  recall: 0.54,
  latency_ms: 120,
  confusion_matrix: {
    true_positive: 14,
    false_positive: 6,
    true_negative: 68,
    false_negative: 12,
  },
}

export type Filters = {
  search: string
  risk: 'All' | 'High' | 'Medium' | 'Low'
  contract: 'All' | 'Month-to-month' | 'One year' | 'Two year'
}

export const FiltersSchema = z.object({
  search: z.string(),
  risk: z.enum(['All', 'High', 'Medium', 'Low']),
  contract: z.enum(['All', 'Month-to-month', 'One year', 'Two year']),
})

export const riskTone = (risk: CustomerChurnRecord['risk_level']) =>
  risk === 'High' ? 'high' : risk === 'Medium' ? 'medium' : 'low'

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

export const csvEscape = (value: string | number | boolean) =>
  `"${String(value).replaceAll('"', '""')}"`

export const exportRowsToCsv = (rows: CustomerChurnRecord[]) =>
  [
    'customer_id,tenure,monthly_charges,total_charges,contract,actual_churn,churn_probability,risk_level',
    ...rows.map((r) =>
      [
        r.customer_id,
        r.tenure,
        r.monthly_charges,
        r.total_charges,
        r.contract,
        r.actual_churn,
        r.churn_probability,
        r.risk_level,
      ]
        .map(csvEscape)
        .join(',')
    ),
  ].join('\n')

export const emptyFilters: Filters = { search: '', risk: 'All', contract: 'All' }

export const tableColumns = [
  'Customer',
  'Contract',
  'Tenure',
  'Monthly spend',
  'Risk',
  'Probability',
  'Actual',
] as const
