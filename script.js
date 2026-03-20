let missingDogProfiles = [];
let foundDogProfiles = [];

/* NAVIGATION */
function hideAllPages() {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
}

function showPage(id) {
    hideAllPages();
    document.getElementById(id).style.display = "flex";
}

function goHome() {
    showPage("home-page");
}

window.onload = () => showPage("home-page");

/* IMAGE HELPER */
function getImageURL(file) {
    return file ? URL.createObjectURL(file) : "https://via.placeholder.com/300";
}

let allAnimals = [];

function submitAdoptionAnimalProfile(event) {
    event.preventDefault();

    const name = document.getElementById("animal-name").value;
    const type = document.getElementById("animal-type").value;

    allAnimals.push({ name, type });

    alert("Animal profile created!");
}

function searchAnimals() {
    const name = document.getElementById("search-name").value.toLowerCase();
    const type = document.getElementById("search-type").value;

    const results = allAnimals.filter(animal =>
        (!name || animal.name.toLowerCase().includes(name)) &&
        (!type || animal.type === type)
    );

    const container = document.getElementById("search-results");
    container.innerHTML = "";

    results.forEach(animal => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${animal.name}</strong> (${animal.type})`;
        container.appendChild(div);
    });
}

function submitOwnerProfile(e){
    e.preventDefault();
    showPage("results-page");
}

function submitMissingDogProfile(e){
    e.preventDefault();

    missingDogProfiles.push({
        name: document.getElementById("missing-dog-name").value,
        color: document.getElementById("missing-dog-color").value,
        size: document.getElementById("missing-dog-size").value,
        breed: document.getElementById("missing-dog-breed").value,
        image: document.getElementById("missing-dog-picture").files[0]
    });

    showMatches();
}

function submitFoundDogProfile(e){
    e.preventDefault();

    foundDogProfiles.push({
        color: document.getElementById("found-dog-color").value,
        size: document.getElementById("found-dog-size").value,
        breed: document.getElementById("found-dog-breed").value,
        image: document.getElementById("found-dog-picture").files[0]
    });

    showMatches();
}

/* MATCH DISPLAY */
function showMatches(){
    const grid = document.getElementById("results-grid");
    grid.innerHTML = "";

    missingDogProfiles.forEach(m => {
        foundDogProfiles.forEach(f => {

            let score = 0;
            if(m.color === f.color) score++;
            if(m.size === f.size) score++;

            if(score > 0){
                grid.innerHTML += `
                    <div class="match-card">
                        <img src="${getImageURL(f.image)}">
                        <div class="match-card-content">
                            <h3>${m.name}</h3>
                            <p>${f.color} • ${f.size}</p>
                        </div>
                    </div>
                `;
            }
        });
    });

    showPage("results-page");
}
