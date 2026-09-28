ARTIFACT_STORE = {}

def update_artifact(session_id: str, artifact_name: str, data: dict):
    if session_id not in ARTIFACT_STORE:
        ARTIFACT_STORE[session_id] = {}

    ARTIFACT_STORE[session_id][artifact_name] = data


def get_artifact(session_id: str):
    return ARTIFACT_STORE.get(session_id, {})