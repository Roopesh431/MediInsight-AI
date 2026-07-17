export interface Procedure {
    code: string;
    description: string;
    charge: number;
}

export interface MedicalTerm {
    term: string;
    explanation: string;
}

export interface AIReport {
    patient_name: string | null;
    hospital: string | null;
    doctor: string | null;

    document_type?: string | null;
    statement_date?: string | null;

    total_charges: number | null;
    remaining_balance?: number | null;

    summary: string;

    procedures: Procedure[];

    medical_terms: MedicalTerm[];

    patient_advice: string[];

    recommended_questions: string[];

    confidence?: number | null;
}