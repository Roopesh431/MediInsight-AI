import api from "./api";
import type { Document } from "../types/document";

export async function uploadDocument(file: File) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/documents",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return response.data;

}

export async function getDocuments(): Promise<Document[]> {

    const response = await api.get(
        "/documents",
    );

    return response.data;

}

export async function runOCR(
    documentId: string,
) {

    const response = await api.post(
        `/documents/${documentId}/ocr`,
    );

    return response.data;

}

export async function runAIAnalysis(
    documentId: string,
) {

    const response = await api.post(
        `/documents/${documentId}/ai-analyze`,
    );

    return response.data;

}

export async function getOCRText(
    documentId: string,
) {

    const response = await api.get(
        `/documents/${documentId}/ocr-text`,
    );

    return response.data;

}

export async function getAnalysis(
    documentId: string,
) {

    const response = await api.get(
        `/documents/${documentId}/analysis`,
    );

    return response.data;

}

export async function chatWithDocument(
    documentId: string,
    question: string,
) {

    const response = await api.post(
        `/documents/${documentId}/chat`,
        {
            document_id: documentId,
            question,
        },
    );

    return response.data;

}

export async function deleteDocument(
    documentId: string,
) {

    const response = await api.delete(
        `/documents/${documentId}`,
    );

    return response.data;

}

export async function getTimeline() {

    const response = await api.get(
        "/timeline",
    );

    return response.data;

}

export interface ReportVersion {

    version_number: number;

    created_at: string;

    is_current: boolean;

}

export async function getVersions(
    documentId: string,
): Promise<{ document_id: string; versions: ReportVersion[] }> {

    const response = await api.get(
        `/documents/${documentId}/versions`,
    );

    return response.data;

}

export async function getVersionAnalysis(
    documentId: string,
    versionNumber: number,
) {

    const response = await api.get(
        `/documents/${documentId}/versions/${versionNumber}`,
    );

    return response.data;

}

export async function restoreVersion(
    documentId: string,
    versionNumber: number,
) {

    const response = await api.post(
        `/documents/${documentId}/versions/${versionNumber}/restore`,
    );

    return response.data;

}