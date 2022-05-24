//////////// MEU CODIGO APARTIR DAQUI////////////////////////

const baseUrl = "https://el-geladon-backend-by-ip.herokuapp.com/paletas";
let paletas;

async function findAllPaletas() {
  const lista_Paletas = await fetch(`${baseUrl}/find-paletas`);
  console.log(`"Paletas:" ${lista_Paletas}`);

  const paletas = await lista_Paletas.json();
  console.log("Paletas:", paletas);
  paletas.map((paleta) => {
    return document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `
    <div class="PaletaListaItem">
         <div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$${paleta.preco},00</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
        </div>
      <img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de ${paleta.sabor}" />
    </div>

    `
    );
  });
}

findAllPaletas();

// const id = "6286439844c92afd9bbb7cc8"

async function fetchOnePaleta(id) {
  const resposta = await fetch(`${baseUrl}/find-paleta/${id}`);
  const paleta = await resposta.json();
  console.log("paletaID:", paleta);

  return paleta;
}

async function findAllPaleta() {
  const inputConsulta = document.getElementById("idPaleta");
  console.log("input é :", inputConsulta);
  const id = inputConsulta.value;
  console.log("input é :", id);

  const resposta = await fetch(`${baseUrl}/find-paleta/${id}`);

  const paleta = await resposta.json();
  console.log("paletaID:", paleta);

  const divEscolha = document.querySelector("#escolha");
  console.log("A div que pegue foi:", escolha);

  divEscolha.innerHTML = `

  <div class="PaletaListaItem">
  <div>
     <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
     <div class="PaletaListaItem__preco">R$${paleta.preco},00</div>
     <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
 </div>
<img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de ${paleta.sabor}" />
</div>
    
  `;
}

// findAllPaleta()
const modalElement = document.getElementById("overlay");

function abrirModalCadastro() {
  modalElement.style.display = "flex";
}

function fecharModalCadastro() {
  modalElement.style.display = "none";
}

async function createPaleta() {
  const sabor = document.getElementById("sabor").value;
  const preco = document.getElementById("preco").value;
  const descricao = document.getElementById("descricao").value;
  const foto = document.getElementById("foto").value;

  const paleta = { sabor, preco, descricao, foto };

  console.log("Paleta criada agorinha...:", paleta);

  // paleta = {
  //   sabor: "Maracuja",
  //   descricao:
  //     "Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
  //   foto: "./assets/images/maracuja.png",
  //   preco: 4,
  // };

  const lista_Paletas = await fetch(`${baseUrl}/create-paleta`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novaPaleta = await lista_Paletas.json();
  console.log("novaPaleta:", novaPaleta);
  fecharModalCadastro();
  findAllPaletas();
}

async function updatePaleta() {
  const id = "6286439844c92afd9bbb7cc8";

  const paletaAntesDAAtualizacao = await fetchOnePaleta(id);

  // const paleta = {sabor : "Açai", preco : 99, descricao:"Nova Descrição", foto: "6286439844c92afd9bbb7cc7"}
  console.log("Paleta dentro do Update:", paletaAntesDAAtualizacao);
  const paleta = { ...paletaAntesDAAtualizacao, sabor: "Morango" };

  const lista_Paletas = await fetch(`${baseUrl}/update/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const paletaAntesAtualizada = await lista_Paletas.json();
  console.log("Paleta atualizada:", paletaAntesAtualizada);
}

updatePaleta();

// createPaleta();

async function deleteOnePaleta() {
  const id = "6286439844c92afd9bbb7cc8";

  const lista_Paletas = await fetch(`${baseUrl}/delete/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });
  const deleteResponde = await lista_Paletas.json();
  console.log("Paleta atualizada:", deleteResponde);
}

// deleteOnePaleta()
