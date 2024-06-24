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
    client_contacts?: ClientContact[]
};

export interface OutputClient extends InputClient {
    id: string
    active: boolean
    comments: string
    total_outstanding?: number
    jobs?: OutputJob[]
};