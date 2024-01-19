const express = require("express");
const app = express();
const cors = require("cors");
const { readdirSync } = require("fs");
const PORT = 5000;

// middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
	app.use("/api", require("./routes/" + route))
);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
