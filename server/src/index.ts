import './boot';
import config from 'config';
import app from './server';

const port = config.get('port');

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Express server started on port: ${port}`);
});
