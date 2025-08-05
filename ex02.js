import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1,
  iterations: '1',
};

export default function() {
  const respontaHomePageLojinha = http.get('http://165.227.93.41/lojinha-web/v2/');
  
  // console.log(Object.keys(respontaHomePageLojinha)); //Obter os dados da resposta para verificar o status e outros detalhes
  // console.log(respontaHomePageLojinha.html().find('title').text()); //Exibir o status da resposta


  check(respontaHomePageLojinha, {
    'Checar se o Status Code e igual a 200': r => r.status === 200,
    'Checar que o titulo da pagina e Lojinha': r => r.html().find('title').text() === 'Lojinha',
  });  
  
  sleep(1);
}
