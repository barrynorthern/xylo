import { Express } from 'express';

// NOTE This is an example of how a supporting api might be implemented
interface Xylo {
  title: string;
}

const things: Xylo[] = [{ title: 'thing 1' }, { title: 'thing 2' }];

export function addXyloRoutes(app: Express) {

  app.get('/api/xylo', (req, resp) => {
    resp.send("ok");
  });

  app.post('/api/get/appointments', (req, resp) => {
    resp.send("ok");
  });
}