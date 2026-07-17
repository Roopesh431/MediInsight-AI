import logging
import time
from pathlib import Path

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

LOG_FILE = LOG_DIR / "ai_provider.log"

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)


class ProviderStats:

    @staticmethod
    def start():
        return time.perf_counter()

    @staticmethod
    def success(provider: str, model: str, start_time: float):
        elapsed = round(time.perf_counter() - start_time, 3)

        logging.info(
            f"SUCCESS | Provider={provider} | Model={model} | Time={elapsed}s"
        )

    @staticmethod
    def failure(provider: str, model: str, error: str, start_time: float):
        elapsed = round(time.perf_counter() - start_time, 3)

        logging.error(
            f"FAILED | Provider={provider} | Model={model} | Time={elapsed}s | Error={error}"
        )