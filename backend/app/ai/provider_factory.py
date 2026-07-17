from backend.app.ai.ai_manager import AIManager

_manager = AIManager()


def analyze(text: str):
    """
    Analyze a medical document using the AI Gateway.
    """
    return _manager.analyze(text)


def chat(prompt: str):
    """
    Chat using the AI Gateway.
    """
    return _manager.chat(prompt)