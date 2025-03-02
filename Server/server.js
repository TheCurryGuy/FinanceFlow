require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const goalRoutes = require('./routes/goalRoutes');
const shareRoutes = require('./routes/shareRoutes');
const aiRoutes = require('./routes/aiRoutes');
const exportRoutes = require('./routes/exportRoutes');
const {scheduleRecurringExpenses} = require('./cron/recurringExpenses');

const app = express();

connectDB();
app.use(express.json());

app.use(cors({
  origin: "https://financeflow-tcg.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true 
}));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://financeflow-tcg.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/share', shareRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/export', exportRoutes);

app.get("/", (req, res) => {

  res.json({
      message: "Finance Flow Server is alive and well!"
  })
})



httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
  scheduleRecurringExpenses();
});