const mqtt = require('mqtt');

const dotenv = require('dotenv')
const env = dotenv.config().parsed

const brokerHost = env.MQTT_IP
const brokerPort = env.MQTT_PORT
const username = env.MQTT_USERNAME
const password = env.MQTT_PASSWORD

const client = mqtt.connect(`mqtt://${brokerHost}:${brokerPort}`, {
  username: username,
  password: password,
  clientId: "VSCODE"
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  client.subscribe('test/mqtt');
  client.publish('test/mqtt', 'Client has been connected');
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic: ${topic}, message: ${message.toString()}`);
});

client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

client.on('error', (error) => {
  console.error('MQTT Error:', error);
});

process.on('exit', () => {
  client.end();
});