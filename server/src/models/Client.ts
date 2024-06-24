import { ClientContact } from "./ClientContact";

export interface Client {
    company_name: string,
    trading_as: string,
    abn: string,
    active?: boolean,
    address: string,
    suburb: string,
    state: 'QLD' | 'NSW' | 'TAS' | 'ACT' | 'VIC' | 'WA' | 'SA' | 'NT',
    postcode: number,
    comments?: string,
    client_contacts: ClientContact[]
};