import e, { Request, Response } from 'express';

const app = e();

app.use('/', (request: Request, response: Response) => {
  response.send('hello');
});

export default app;
