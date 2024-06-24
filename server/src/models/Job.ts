export interface InputJob {
    client_id?: string
    status: 'In Progress' | 'Awaiting Payment' | 'Complete'
    description: string
    comments?: string
    amount_due: number
    amount_paid: number
}

export interface OutputJob {
    id: string
    client_id?: string
    company_name?: string
    trading_as?: string
    abn?: string
    status: 'In Progress' | 'Awaiting Payment' | 'Complete'
    job_number: number
    description: string
    comments?: string
    amount_due: number
    amount_paid: number
    total_outstanding: number
}