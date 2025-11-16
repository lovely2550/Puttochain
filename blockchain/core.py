class KarmaEngine:
    def __init__(self):
        self.ledger = []

    def process_transaction(self, tx):
        karma_value = tx.get('karma', 0)
        self.ledger.append(tx)
        return {"status": "processed", "karma": karma_value}