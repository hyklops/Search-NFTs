// FOR API KEY HIDING

// const axios = require("axios");
// const express = require("express");
// const app = express();
// require("dotenv").config();
// const cors = require("cors");
// app.use(cors());

// const port = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));

// app.get("/api", (req, res) => {
//   const apiKey = process.env.API_KEY;
//   const owner = req.query.owner;
//   const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
//   const fetchURL = `${baseURL}?owner=${owner}`;
//   axios
//     .get(fetchURL)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       res.json({ error: error.message });
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
