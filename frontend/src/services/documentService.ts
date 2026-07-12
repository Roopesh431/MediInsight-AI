import api from "./api";
import type { Document } from "../types/document";

export async function getOCRText(
    documentId: string,
) {

    const response = await api.get(
        `/documents/${documentId}/ocr-text`,
    );

    return response.data;

}

export async function uploadDocument(
    file: File,
) {

    const formData = new FormData();

    formData.append(
        "file",
        file,
    );

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

    const response = await api.get("/documents");

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