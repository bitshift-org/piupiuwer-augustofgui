import express from 'express';
import routes from './shared/routes';

const app = express();

app.use(routes);

app.listen(3333, () => {
  console.log('🌋 Server started on port 3333!');
});