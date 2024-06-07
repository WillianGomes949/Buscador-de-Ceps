const btn = document.getElementById('botao');
const resultadoBusca = document.getElementById('resultado');
const resultadosDaBuscarDiv = document.getElementById('resultados')
const btnAtualizar = document.getElementById('atualizar')
const btnMapa = document.getElementById('mapa')

async function buscadorDeCep(cep) {
    try {
        const conexao = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        const dadosCep = await conexao.json();
        
        resultadoBusca.innerHTML = `
            <p>CEP: ${dadosCep.cep}</p>
            <p>Logradouro: ${dadosCep.street}</p>
            <p>Bairro: ${dadosCep.neighborhood}</p>
            <p>Cidade: ${dadosCep.city}</p>
            <p>Estado: ${dadosCep.state}</p>
        `;
        return dadosCep

    } catch (erro) {
        console.error('Erro ao buscar o CEP:', erro);
        resultadoBusca.innerHTML = `<p>Erro ao buscar o CEP.</p>`;
    }
}

btn.addEventListener('click', async function(event) { 

    event.preventDefault();
    const cepBuscador = document.getElementById('cep').value;
    
    if (cepBuscador) {
        const dadosCep = await buscadorDeCep(cepBuscador); 

        if (dadosCep) { 
            resultadosDaBuscarDiv.style.display = 'flex';
            resultadoBusca.style.display = 'block';
            btnAtualizar.style.display = 'block';
            btnMapa.style.display = 'block';
            btnMapa.href = `https://www.google.com.br/maps/place/${dadosCep.street}+${dadosCep.neighborhood}`;
        }
    } else {
        resultadoBusca.innerHTML = `<p>Por favor, digite um CEP válido.</p>`;
    }
});

btnAtualizar.addEventListener('click', () => {
    window.location.reload()
})

btnMapa.addEventListener('click', (event) => {
    event.preventDefault();
    window.open(btnMapa.href, '_blank')
});


