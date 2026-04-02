import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   Loan Fair API — running on port ${PORT}   ║
║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(26)}║
╚══════════════════════════════════════════╝
  `);
});
