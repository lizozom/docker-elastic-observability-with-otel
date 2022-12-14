import express from 'express';
import otel from "@opentelemetry/api";
import './otel';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log("CALLED")
  const myMeter = otel.metrics.getMeter(
    'my-service-meter'
  );
  const counter = myMeter.createCounter('home-route-counter', {
    description: 'Home run counter',
  });
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  counter.add(1, {
    'user.ip': ip,
  });
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  return console.log(`Express is listening at http://localhost:${port}`);
});