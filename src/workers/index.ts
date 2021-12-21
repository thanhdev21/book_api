require('module-alias/register');
import '../env';
import '../firebase';
import '../i18n';
import './cron';

import * as QueueNames from '@workers/bull/names';
import debug from '@utils/debug';

import createWorker from '@workers/bull/creates/worker';

import { connect as MongoDbConnect } from '@database/mongodb';

MongoDbConnect().then(() => true);

const PORT = process.env.WORKERS_PORT || 32002;

const server: any = createWorker({});

server.listen(PORT, '0.0.0.0', () => {
  debug.workers(`Health check server running at 0.0.0.0:${server.address().port}`);
});
