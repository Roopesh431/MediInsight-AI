from pdf2image import convert_from_path
from pathlib import Path


def convert_pdf_to_images(pdf_path: Path):
    """
    Convert a PDF into a list of PIL Images.
    """

    images = convert_from_path(str(pdf_path))

    return images