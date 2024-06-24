export interface InputJob {
    client_id?: string
    status: 'In Progress' | 'Awaiting Payment' | 'Complete'
    description: string
    comments?: string
    amount_due: number
    amount_paid: number
}

export interface OutputJob extends InputJob {
    id: string
    company_name?: string
    trading_as?: string
    abn?: string
    comments: string
    job_number: number
    total_outstanding: number
}