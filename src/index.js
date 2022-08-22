const Application = require('../framework/app');
const jsonParser = require('../framework/middlewares/parse-json.middleware');
const urlParser = require('../framework/middlewares/parse-url.middleware');

const { BASE_URL } = require('./core/constants');
const usersRouter = require('./users/users.router');

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(jsonParser);
app.use(urlParser(BASE_URL));

app.addRouter(usersRouter);

app.listen(PORT, () => console.info(`Server started on PORT ${PORT}`));
