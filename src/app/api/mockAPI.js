import { sampleData } from './sampleData';
import { delay } from '../common/util/util';

export const fetchSampleData = async () => {
  await delay(1000);
  return Promise.resolve(sampleData);
};
