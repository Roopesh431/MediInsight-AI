export interface Document {
    document_id: string;
    original_filename: string;
    saved_filename: string;
    document_type: string;
    confidence: number;
    status: string;
    ocr_text_path: string;
}