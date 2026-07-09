from pdf2image import convert_from_path
import pytesseract


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Convert every page of a PDF into an image
    and perform OCR using Tesseract.
    """

    pages = convert_from_path(pdf_path)

    extracted_text = []

    for page in pages:
        text = pytesseract.image_to_string(page)
        extracted_text.append(text)

    return "\n".join(extracted_text)