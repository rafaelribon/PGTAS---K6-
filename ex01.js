import http from 'k6/http';
import { sleep, check } from 'k6';

import { numeroAleatorioMenorQue } from './utils/numeros.js';

export const options = {
    vus: 20,
  duration: '10s',
  thresholds: { 
    http_req_waiting: ['p(90) >= 10', 'p(90) <= 50', 'avg < 60' ]

  }
    

    // iterarions: 1,


};

export default function() {
  // Passo 1 : Acessa a página do k6
  http.get('https://test.k6.io');

  
  // Passo 2 : Espere uma quatidade de segungos menor que 20 
  // sleep(numeroAleatorioMenorQue(5)); // Sleep for a random number of seconds between 0 and 4
}
