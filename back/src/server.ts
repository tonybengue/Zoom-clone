import express, { Request, Response, ErrorRequestHandler } from 'express';
import { configuration, IConfig } from "./config";

import morgan from "morgan";
import helmet from "helmet";

export function createExpressApp(config: IConfig): express.Express {
  const { express_debug } = config;

  const app = express();
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(express.json());
  app.use(((err, _req, res, _next) => {
    console.error(err.stack);
    res.status?.(500).send(!express_debug ? 'Oups' : err);
  }) as ErrorRequestHandler);

  app.get('/', (req: Request, res: Response) => { res.send('This is the boilerplate for the app') });

  return app;
}

const config = configuration();
const { PORT } = config;
const app = createExpressApp(config);
app.listen(PORT, () => console.log(`Flint messenger listening at http://127.0.0.1:${PORT}`));