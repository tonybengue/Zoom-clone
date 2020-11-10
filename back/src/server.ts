import express, { Request, Response, ErrorRequestHandler } from 'express';
import morgan from "morgan";
import helmet from "helmet";
import { configuration, IConfig } from "./config";

import generalRouter from './routes/router';
import { connect } from './database';

export function createExpressApp(config: IConfig): express.Express {
  const { express_debug } = config;

  const app = express();

  // Middlewares
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(express.json());

  app.use(((err, req, res, next) => {
    console.error(err.stack);
    res.status?.(500).send(!express_debug ? 'Oups' : err);
  }) as ErrorRequestHandler);

  app.get('/', (req: Request, res: Response) => { res.send('This is the boilerplate for Flint Messenger app') });

  app.use('/api', generalRouter);

  return app;
}

const config = configuration();
const { PORT } = config;
const app = createExpressApp(config);

// app.listen(PORT, () => console.log(`Flint messenger listening at http://127.0.0.1:${PORT}`));
connect(config).then(
  () => app.listen(PORT, () => 
    console.log(`Flint messenger listening at http://127.0.0.1:${PORT}`))
)