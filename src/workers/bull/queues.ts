import { EventEmitter } from 'events';

interface TypedQueues {}

// Normalize our (inconsistent) queue names to a set of JS compatible names
export const QUEUE_NAMES = {};

EventEmitter.defaultMaxListeners = (Object.keys(QUEUE_NAMES).length + EventEmitter.defaultMaxListeners) * 3;

const Queues: TypedQueues = {};

// Needs to be module.exports so import { sendEmailValidationEmailQueue } from 'queues' works
// it wouldn't work with export default queues and for some reason export { ...queues } doesn't either
export default Queues;
