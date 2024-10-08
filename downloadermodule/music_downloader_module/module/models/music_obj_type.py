class MusicObjectType:
    def __init__(self):
        self.is_top_result = False

    def to_json(self) -> dict:
        raise NotImplementedError('')