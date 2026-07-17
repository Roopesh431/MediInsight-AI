from backend.app.ai.ai_manager import AIManager

_manager = AIManager()


def analyze_document(text: str):
    return _manager.analyze(text)