const places = document.querySelectorAll(".Place");

const inputNom = document.getElementById("reserver-nom");
const siege = document.getElementById("reserver-siege");
const btnreservation = document.getElementById("reservbtn");

const notification = document.getElementById("notification");

let reservations = [];
let timer;

for (let i = 0; i < places.length; i++) {
    const numero = places[i].querySelector(".numero").textContent;
    const nom = places[i].querySelector(".statut").textContent.trim();
    if (nom !== "Libre") {
        reservations.push({
            siege: numero.trim(),
            nom: nom
        });
    }
}

function afficherNotification(message, type) {
    clearTimeout(timer);
    notification.textContent = message;
    notification.classList.remove("hidden", "bg-green-100", "text-green-800", "bg-red-100", "text-red-800");
    if (type === "succes") {
        notification.classList.add("bg-green-100", "text-green-800");
    } else {
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
}

remplirSieges();

btnreservation.addEventListener("click", function () {
    const nomPassager = inputNom.value.trim();
    let numeroChoisi = siege.value;

    if (nomPassager === "") {
        alert("Entrez le nom du passager");
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
            alert("Le bus est complet");
            return;
        }
    }

    for (let i = 0; i < places.length; i++) {
        const numero = places[i].querySelector(".numero").textContent.trim();
        const statut = places[i].querySelector(".statut");

        if (numero === numeroChoisi) {
            if (statut.textContent.trim() !== "Libre") {
                alert("Ce siège est déjà réservé");
                return;
            }
            places[i].classList.remove("bg-white", "border-[#1D4BFF]", "text-[#1D4BFF]");
            places[i].classList.add("bg-[#1D4BFF]", "border-[#1D4BFF]", "text-white");

            statut.textContent = nomPassager;
            statut.classList.remove("text-gray-500", "text-[#1D4BFF]");
            statut.classList.add("truncate", "text-white");
            break;
        }
    }
    reservation.push({
        siege: numeroChoisi,
        nom: nomPassager
    })
    inputNom.value = "";
    remplirSieges();
});