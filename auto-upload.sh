#!/bin/bash
cd ~/bjjjjjj
git add .
git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
echo "✅ Uploaded at $(date)"
