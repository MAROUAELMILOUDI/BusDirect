const places = document.querySelectorAll(".Place");
const inputNom = document.getElementById("reserver-nom");
const siege = document.getElementById("reserver-siege");
const btnreservation = document.getElementById("reservbtn");

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
            places[i].classList.remove("bg-white", "border-blue-500", "text-blue-600");
            places[i].classList.add("bg-blue-600", "border-blue-600", "text-white");

            statut.textContent = nomPassager;
            statut.classList.remove("text-gray-500", "text-blue-600");
            statut.classList.add("truncate", "text-white");
            break;
        }
    }

    inputNom.value = "";
    remplirSieges();
});