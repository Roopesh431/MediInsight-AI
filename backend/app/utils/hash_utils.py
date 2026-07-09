import hashlib

from fastapi import UploadFile


def calculate_sha256(file: UploadFile):

    file.file.seek(0)

    sha = hashlib.sha256()

    while chunk := file.file.read(4096):
        sha.update(chunk)

    file.file.seek(0)

    return sha.hexdigest()