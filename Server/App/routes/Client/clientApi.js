// Importing Controllers
const { userEnquiry } = require("../Client/");
let app = express();

app.use(express.json());

app.post("/insert-enquiry",userEnquiry);


module.exports = router;