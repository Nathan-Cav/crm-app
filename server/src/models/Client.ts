import { ClientContact } from "./ClientContact";
import { OutputJob } from "./Job";

export interface InputClient {
    company_name: string
    trading_as: string
    abn: string
    active?: boolean
    address: string
    suburb: string
    state: 'QLD' | 'NSW' | 'TAS' | 'ACT' | 'VIC' | 'WA' | 'SA' | 'NT'
    postcode: number
    comments?: string
    client_contacts: ClientContact[]
};

export interface OutputClient {
    id: string
    company_name: string
    trading_as: string
    abn: string
    active: boolean
    address: string
    suburb: string
    state: 'QLD' | 'NSW' | 'TAS' | 'ACT' | 'VIC' | 'WA' | 'SA' | 'NT'
    postcode: number
    comments: string
    total_outstanding?: number
    client_contacts?: ClientContact[],
    jobs?: OutputJob[]
};