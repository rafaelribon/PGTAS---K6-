import http, { head } from 'k6/http';
import { sleep, check } from 'k6';


export default function () {

    const endpointRequestLogin = 'http://165.227.93.41/lojinha/v2/login'

    const bodyRequestLogin = JSON.stringify({
        usuarioLogin: 'cgts',
        usuarioSenha: '123456'
    })

    const optionsRequestLogin = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respostaLogin = http.post(endpointRequestLogin, bodyRequestLogin, optionsRequestLogin)
    check(respostaLogin, {
        'Status Code é  igual  a 200': r => r.status === 200,
        'A mensagem de sucesso ao realizar o login foi apresentada': r => r.json().message === 'Sucesso ao realizar o login',
        'A mensagem de sucesso ao realizar o login foi apresentada': r => r.json('message') === 'Sucesso ao realizar o login'
    });

    //Extraiam o token da resposta usando GJson
    const token = respostaLogin.json('data.token');


    //Cadastrem um produto
    const endpointCadastroProduto = 'http://165.227.93.41/lojinha/v2/produtos'
 

    const bodyCadastroProduto = JSON.stringify({
        "produtoNome": "Teste Abacate ",
        "produtoValor": 50,
        "produtoCores": ["amarelo", "verde"]
    })

     const optionsCadastroProduto = {
        headers: {
            'Content-Type': 'application/json',
            token: token
        }
    }
       const respostaCadastroProduto = http.post(endpointCadastroProduto, bodyCadastroProduto, optionsCadastroProduto )

       //Checks
       //- Status Code 
       //- Mensagem 
       // - Segunda Cor do Produto 

       check(respostaCadastroProduto, {
        'Status Code é igual a 201': r => r.status === 201,
        'Mensagem é produto adicionado com sucesso': r => r.json('message') === 'Produto adicionado com sucesso',
        'Segunda cor do produto é verde': r => r.json('data.produtoCores.1')=== 'verde',
        'Segunda cor do produto é verde (Sem GJSON)': r => r.json().data.produtoCores[1] === 'verde'


       })



    sleep(1) // Entenda o comportamento e quem  e seu usuário 

}



