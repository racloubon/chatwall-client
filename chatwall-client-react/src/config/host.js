require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 3003;

const serverIp = process.env.SERVER_IP || '192.168.1.247';
// const serverIp = process.env.SERVER_IP || 'localhost';

const host = 'http://' + serverIp + ':' + serverPort;

console.log('------->>> config file to get host:',host);

export default host;
