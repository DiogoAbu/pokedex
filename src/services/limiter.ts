import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  maxConcurrent: 3,
});

export default limiter;
