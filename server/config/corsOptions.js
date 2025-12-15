const allowedOrigins = [
  "http://localhost:5173",
  "https://chitomed.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Zezwól
    } else {
      callback(new Error("Not allowed by CORS")); 
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions; //
