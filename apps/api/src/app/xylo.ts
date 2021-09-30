import { Express } from 'express';

interface Xylo {
  title: string;
}

const things: Xylo[] = [{ title: 'thing 1' }, { title: 'thing 2' }];

export function addXyloRoutes(app: Express) {
  app.get('/api/xylo', (req, resp) => resp.send(things));
  app.post('/api/addThing', (req, resp) => {
    const newThing = {
      title: `New thing ${Math.floor(Math.random() * 1000)}`,
    };
    things.push(newThing);
    resp.send(newThing);
  });
}