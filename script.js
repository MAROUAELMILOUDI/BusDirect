const places = document.querySelectorAll(".Place");

const inputNom = document.getElementById("reserver-nom");
const siege = document.getElementById("reserver-siege");
const btnreservation = document.getElementById("reservbtn");

const deltReserve = document.getElementById("supprimer-reservation");
const deltbtn = document.getElementById("suppressionbtn");
 
const notification = document.getElementById('notification');


let reservations = [];
let timer;

for (let i = 0; i < places.length; i++) {
    const numero = places[i].querySelector(".numero").textContent.trim();
    const nom = places[i].querySelector(".statut").textContent.trim();
    if (nom !== "Libre") {
        reservations.push({
            siege: numero,
            nom: nom
        });
    }
}

function statistiques(){
    const placesDispo = document.getElementById('availableSeats');
    const prixTotal = document.getElementById('totalRevenue');
    let places = 20;
    let total = 0;
    for(let i=0; i < reservations.length; i++){
        places -= 1;
        total += 80;
    }
    placesDispo.textContent = places;
    prixTotal.textContent = total + 'DH'
}

function afficherNotification(message, type) { 
    clearTimeout('timer');
    notification.textContent = message;
    notification.classList.remove("hidden", "bg-green-100", "text-green-800", "bg-red-100", "text-red-800");
    if (type === "succes"){
        notification.classList.add("bg-green-100", "text-green-800");
    } else if (type === "erreur") {
        notification.classList.add("bg-red-100", "text-red-800");
    }
    timer = setTimeout(function () {
        notification.classList.add("hidden");
    }, 3000);
}

function remplirSieges() {
    siege.innerHTML = "<option value='auto'>Attribution automatique</option>";
    for (let i = 0; i < places.length; i++) {
        const numero = places[i].querySelector(".numero").textContent.trim();
        const etat = places[i].querySelector(".statut").textContent.trim();
        if (etat === "Libre") {
            siege.innerHTML += "<option value='" + numero + "'>Siège " + numero + "</option>";
        }
    }
    statistiques();
    sauvegarder();
}

remplirSieges();

btnreservation.addEventListener("click", function (event) {
    event.preventDefault()
    const nomValeur = inputNom.value.trim();
    let numeroChoisi = siege.value;
    if (nomValeur === "") {
        afficherNotification("Entrez le nom du passager", "erreur");
        return;
    }
    if (numeroChoisi === "auto") {
        let trouve = false;
        for (let i = 0; i < places.length; i++) {
            if (places[i].querySelector(".statut").textContent.trim() === "Libre") {
                numeroChoisi = places[i].querySelector(".numero").textContent.trim();
                trouve = true;
                break;
            }
        }
        if (!trouve) {
            afficherNotification("Le bus est complet", "erreur");
            return;
        }
    } 
    for (let i = 0; i < places.length; i++) {
        const numero = places[i].querySelector(".numero").textContent.trim();
        const statut = places[i].querySelector(".statut");

        if (numero === numeroChoisi) {
            if (statut.textContent.trim() !== "Libre") {
                afficherNotification("Ce siège est déjà réservé", "erreur");
                return;
            }
            places[i].classList.remove("bg-white", "border-[#1D4BFF]", "text-[#1D4BFF]");
            places[i].classList.add("bg-[#1D4BFF]", "border-[#1D4BFF]", "text-white");

            statut.textContent = nomValeur;
            statut.classList.remove("text-gray-500", "text-[#1D4BFF]");
            statut.classList.add("truncate", "text-white");
            reservations.push({
                siege: numeroChoisi,
                nom: nomValeur
            })
            afficherNotification("Siége " + numeroChoisi + " réservé pour " + nomValeur, "succes");
            break;
        }
    } 
    inputNom.value = "";
    remplirSieges();
});


function remplirSiegesOcuppe() {
    deltReserve.innerHTML = "<option value=''>Choisir un siège</option>";
    for (let i = 0; i < places.length; i++) {
        const numero = places[i].querySelector(".numero").textContent.trim();
        const etat = places[i].querySelector(".statut").textContent.trim();
        if (etat !== "Libre") {
            deltReserve.innerHTML += "<option value='" + numero + "'>Siège " + numero + " (" + etat + ")</option>";
        }
    }
    statistiques();
    sauvegarder();
}
remplirSiegesOcuppe()

deltbtn.addEventListener("click", function (event) {
    event.preventDefault()
    const numeroChoisi = deltReserve.value;
    if (numeroChoisi === "") {
        afficherNotification("choisisser un siège a supprimer", "erreur");
        return;
    }
    for(let i=0; i<places.length; i++){
        const numero = places[i].querySelector('.numero').textContent.trim();
        const etat = places[i].querySelector('.statut');
        if (numeroChoisi === numero){
            places[i].classList.remove("bg-[#1D4BFF]", "text-white");
            places[i].classList.add("bg-white", "border-[#1D4BFF]", "text-[#1D4BFF]");

            etat.textContent = "Libre";
            etat.classList.remove("truncate", "text-white");
            etat.classList.add('text-gray-500');
            for(let j=0; j<reservations.length; j++){
                if(reservations[j].siege === numeroChoisi){
                    reservations.splice(j, 1);
                    break;
                }
            }
            afficherNotification("Reservation du siège " + numeroChoisi + " supprimée", "succes");
            break;
        }
    }
    remplirSieges();
    remplirSiegesOcuppe();
});

function sauvegarder(){
    localStorage.setItem("reservations", JSON.stringify(reservations))
}