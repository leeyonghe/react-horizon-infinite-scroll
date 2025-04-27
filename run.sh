killall -9 node
pkill -f "node.*3000|node.*3001|node.*3002"
cd example
npm run dev