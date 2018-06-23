
require('dotenv').config()
const app = require('./index')

const port = process.env.PORT || 5000;

// Launch
app.listen(port, () => console.log(`Listening on port ${port}`));