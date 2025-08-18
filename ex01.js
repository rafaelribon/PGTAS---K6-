import http from 'k6/http';
import { sleep } from 'k6';

import { numeroAleatorioMenorQue } from './utils/numeros.js'

// k6 run ex01.js --vus 4 --duration 30s
export const options = {
  vus: 20,
  duration: '10s',
  thresholds: {
    http_req_waiting: [ 'p(90) >= 10', 'p(90) <= 50', 'avg < 60' ]
  },
  cloud: {
    name: 'Exercício 01',
    projectID: 0
  }
}

export default function() { 
  // Passo 1: Acesse a página do K6
  http.get('https://test.k6.io');

  // Passo 2: Espere uma quantidade de segundos menor que 20
  sleep(numeroAleatorioMenorQue(20)); // User Think Time!
}