const cluster = require('cluster');
const os = require('os');

const Application = require('../framework/app');
const jsonParser = require('../framework/middlewares/parse-json.middleware');
const urlParser = require('../framework/middlewares/parse-url.middleware');

const { BASE_URL } = require('./core/constants');
const usersRouter = require('./users/users.router');

const PORT = process.env.PORT || 5000;

const app = new Application();

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.schedulingPolicy = cluster.SCHED_NONE;
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    console.info(`Worker #${worker.id} is online`);
  });

  cluster.on('disconnect', (worker) => {
    console.info(`The worker #${worker.id} has disconnected`);
  });

  cluster.on('exit', (worker) => {
    console.info(`The worker #${worker.id} is dead`);
    cluster.fork();
  });

  let numRequests = 0;

  const messageHandler = (msg) => {
    if (msg && msg === 'notifyRequest') {
      numRequests += 1;
      console.info(`Requests received: ${numRequests}`);
    }
  };

  for (const id in cluster.workers) {
    if (Object.prototype.hasOwnProperty.call(cluster.workers, id)) {
      cluster.workers[id].on('message', messageHandler);
    }
  }
} else {
  app.use(jsonParser);
  app.use(urlParser(BASE_URL));

  app.addRouter(usersRouter);

  app.listen(PORT, () => console.info(`Server started on PORT ${PORT}`));
}
