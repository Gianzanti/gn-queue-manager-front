export interface Visitor {
    id?: number;
    customer: string;
    name: string;
    email: string;
    phone: string;
    lgpd: boolean;
    created_at?: string;
    image_rights: boolean;
    observations?: string;
    confirm_visit: boolean;
    state: string;
    job: string;
}
