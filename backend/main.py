from fastapi import FastAPI
from blockchain.core import KarmaEngine

app = FastAPI()
karma = KarmaEngine()

@app.get('/status')
def status():
    return {"status": "Putthochain Backend Running"}

@app.post('/transaction')
def new_transaction(tx: dict):
    result = karma.process_transaction(tx)
    return result