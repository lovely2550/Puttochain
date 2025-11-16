#!/bin/bash
# One-command deploy
cd backend && pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port 8000 &
cd ../frontend && npm install && npm run build
cd ../electron && npm install && npm run start &
cd ../smart-contracts && npm install && npx hardhat run scripts/deploy.js --network polygon_mumbai