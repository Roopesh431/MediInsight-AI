from abc import ABC, abstractmethod


class BaseAIProvider(ABC):
    """
    Base class for all AI providers.
    """

    name: str = "base"

    @abstractmethod
    def analyze(self, text: str) -> str:
        """
        Analyze a medical document and return raw JSON/text from the model.
        """
        pass

    @abstractmethod
    def chat(self, prompt: str) -> str:
        """
        Send a chat prompt and return the raw model response.
        """
        pass

    @abstractmethod
    def is_available(self) -> bool:
        """
        Return True if this provider is configured and available.
        """
        pass