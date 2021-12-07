import '../../alias-modules';
import createWorker from './worker';

function createWorkerServer() {
  const server: any = createWorker({});

  return server;
}

async function startWorkerServer() {
  // start  job repeaters
}

startWorkerServer();
