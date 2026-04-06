import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory store for health logs for demo purposes
// In production, sync this to MongoDB
let userHealthStatus = {
  metrics: { blinkRate: 0, distance: 0, screenTime: 0 },
  status: { isFatigued: false, needsBreak: false, skipCount: 0 },
  session: { startTime: new Date(), lastBreak: new Date() }
};

app.get('/api/v1/status', (req, res) => {
  res.json({
    success: true,
    data: userHealthStatus
  });
});

app.post('/api/v1/health-log', (req, res) => {
  const { metrics, status, session } = req.body;
  
  if (metrics) userHealthStatus.metrics = { ...userHealthStatus.metrics, ...metrics };
  if (status) userHealthStatus.status = { ...userHealthStatus.status, ...status };
  if (session) userHealthStatus.session = { ...userHealthStatus.session, ...session };
  
  res.json({
    success: true,
    message: 'Health log updated',
    data: userHealthStatus
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Avoid connecting to a non-existent local MongoDB in boilerplate without setup
// But provide the skeleton
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/drishti')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
*/

app.listen(PORT, () => {
  console.log(`Drishti Backend running on port ${PORT}`);
});
