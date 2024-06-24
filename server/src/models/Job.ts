export interface Job {
    client_id?: string,
    status: 'In Progress' | 'Awaiting Payment' | 'Complete',
    description: string,
    comments?: string,
    amount_due: number,
    amount_paid: number
}