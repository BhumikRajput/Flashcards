var org_list = null;
let fl_list = [];
let x_list = [];
let left = 0;
var currentCard = null;
var flashcards = null;

var cardFront = document.querySelector("#flash-page #cardFront");
var cardBack = document.querySelector("#flash-page #cardBack");
var card = document.querySelector("#flash-page #card");
var leftElement = document.querySelector("#flash-page .left");
var chapter = document.querySelector("#flash-page .chapter");
var menuButton = document.querySelector("#flash-page #menuButton");
var inbuiltButton = document.querySelector("#menu-page #inbuiltButton");
var importButton = document.querySelector("#menu-page #importButton");
var exportButton = document.querySelector("#menu-page #exportButton");

var filenameInput = document.querySelector("#input-page #filenameInput");
var src_list = null;
var menuPage = document.querySelector("#menu-page");
var inputPage = document.querySelector("#input-page");
var flashPage = document.querySelector("#flash-page");
var inbuiltPage = document.querySelector("#inbuilt-page");
var inputOKButton = document.querySelector("#input-page #okButton");
var inputCancelButton = document.querySelector("#input-page #cancelButton");
var inbuiltImportButton = document.querySelector("#inbuilt-page .importButton");
var inbuiltCancelButton = document.querySelector("#inbuilt-page .cancelButton");
var menuCloseButton = document.querySelector("#menu-close-button");



function triggerFileInput() {
    document.querySelector('#flash-page #hiddenFileInput').click();
    hideAllPages();
    showFlashPage();
}

async function getDeckOnline() {
    // 🧾 Manual list
    function namesAsManual() {
        return [
            ...[...Array(32)].map((_, i) => `N4 C${i + 1}`),
            ...[...Array(20)].map((_, i) => `N4 K${i + 1}`),
            ...[...Array(24)].map((_, i) => `N5 C${i + 1}`),
            ...[...Array(11)].map((_, i) => `N5 K${i + 1}`),
            "temp",
            "test"
        ];
    }

    // 🌐 API list
    async function namesByAPI() {
        const response = await fetch('https://api.github.com/repos/BhumikRajput/Flashcards/contents/decks');
        const files = await response.json();
        const jsonFiles = files.filter(file => file.name.endsWith('.json'));

        // Natural sorting
        jsonFiles.sort((a, b) => {
            const re = /(\d+|\D+)/g;
            const aParts = a.name.match(re);
            const bParts = b.name.match(re);
            for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const aPart = aParts[i] || '';
                const bPart = bParts[i] || '';
                const isANum = !isNaN(aPart), isBNum = !isNaN(bPart);
                if (isANum && isBNum) {
                    if (+aPart !== +bPart) return +aPart - +bPart;
                } else if (aPart !== bPart) {
                    return aPart.localeCompare(bPart);
                }
            }
            return 0;
        });

        return jsonFiles.map(file => file.name.replace('.json', ''));
    }

    // const filesName = await namesByAPI();
    const filesName = namesAsManual();

    // 🧩 Display
    const fileListContainer = document.querySelector("#inbuilt-page .file-list");
    fileListContainer.innerHTML = ''; // Clear previous list

    filesName.forEach(name => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = name;
        checkbox.value = name + '.json';

        const label = document.createElement('label');
        label.htmlFor = name;
        label.innerText = name;

        label.prepend(checkbox);
        fileListContainer.appendChild(label);
    });
}


// Function to import flashcards from a JSON file
function importJSON() {
    const fileInput = document.querySelector('#flash-page #hiddenFileInput');
    const file = fileInput.files[0];

    // Reset the file input value
    fileInput.value = '';

    if (!file) {
        alert('Please select a file first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            flashcards = JSON.parse(event.target.result);
            if (Array.isArray(flashcards)) {
                convertFlashcards();
            } else {
                alert('Invalid flashcard format. Please check the file.');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            alert('Failed to parse JSON file. Please ensure it is correctly formatted.');
        }
    };
    reader.readAsText(file);
}

async function importJSONsOnline() {
    const checkboxes = document.querySelectorAll('#inbuilt-page .file-list input[type="checkbox"]:checked');
    const fetchPromises = [];

    combinedData = []; // Reset combined data

    // Fetch data for all selected JSON files
    for (const checkbox of checkboxes) {
        const fileName = checkbox.value;
        const url = `https://raw.githubusercontent.com/BhumikRajput/Flashcards/main/decks/${fileName}`;
        fetchPromises.push(fetch(url).then(res => res.json()).then(data => {
            // Append each JSON file's data into the combined data list
            combinedData = combinedData.concat(data); // Combine all data into a single list
        }));
    }

    // Wait for all fetch promises to resolve
    await Promise.all(fetchPromises);
    flashcards = combinedData;
}

// Function to fetch flashcards from JSON file
async function convertFlashcards() {
    try {
        org_list = flashcards.flatMap(item => [
            [item.front, item.back, item.chapter],
            [item.back, item.front, item.chapter]
        ]);
        fl_list = org_list;
        x_list = []

        left = fl_list.length - 1;
        leftElement.textContent = `Left: ${left}`;

        updateCardContent();
    } catch (error) {
        console.error('Error fetching flashcards:', error);
    }
    if (card.classList.contains("flipped")) {
        let temp = cardBack.textContent;
        cardBack.textContent = "";
        card.classList.remove("flipped");
        setTimeout(() => {
            cardBack.textContent = temp;
        }, 600);
    }
}

function updateCardContent() {
    if ((x_list.length > 0)) {
        // if ((fl_list.length < 0) || (Date.now() - x_list[0][3] > 30000)) {
        if ((fl_list.length === 0) || (Date.now() - x_list[0][3] > 30000)) {
            currentCard = [x_list[0][0], x_list[0][1], x_list[0][2]];
            cardFront.innerText = currentCard[0] || "No front text";
            cardBack.innerText = currentCard[1] || "No back text";
            // translation.textContent = `Translation: ${currentCard[2]}`;
            chapter.textContent = `Chapter: ${currentCard[2]}`;
            x_list.shift();
        }
        else {
            currentCard = fl_list[Math.floor(Math.random() * fl_list.length)];
            cardFront.innerText = currentCard[0] || "No front text";
            cardBack.innerText = currentCard[1] || "No back text";
            // translation.textContent = `Translation: ${currentCard[2]}`;
            chapter.textContent = `Chapter: ${currentCard[2]}`;
            fl_list = fl_list.filter(item => item !== currentCard);
        }
    } else if (fl_list.length > 0) {
        currentCard = fl_list[Math.floor(Math.random() * fl_list.length)];
        cardFront.innerText = currentCard[0] || "No front text";
        cardBack.innerText = currentCard[1] || "No back text";
        // translation.textContent = `Translation: ${currentCard[2]}`;
        chapter.textContent = `Chapter: ${currentCard[2]}`;
        fl_list = fl_list.filter(item => item !== currentCard);
    } else {
        cardFront.innerText = "OVER";
        cardBack.innerText = "OVER";
        chapter.textContent = "";
    }
}

// Function to show the input-page
function showInputPage() {
    inputPage.style.display = 'flex';
    filenameInput.focus();
}

// Function to hide the input-page
function hideInputPage() {
    inputPage.style.display = 'none';
}

function showFlashPage() {
    flashPage.style.display = 'flex';
}

function hideFlashPage() {
    flashPage.style.display = 'none';
}

function showInbuiltPage() {
    inbuiltPage.style.display = "block"; // Show the inbuilt-page
}

function hideInbuiltPage() {
    inbuiltPage.style.display = "none"; // Hide the inbuilt-page
}

function showMenuPage() {
    menuPage.style.display = "flex";
}

function hideMenuPage() {
    menuPage.style.display = "none";
}

function hideAllPages() {
    hideInputPage();
    hideFlashPage();
    hideInbuiltPage();
    hideMenuPage();
}

// Function to export flashcards as JSON
function exportFlashcards() {
    hideMenuPage();
    showInputPage();
}

function colorEffect(type) {
    const body = document.body;
    const colorDuration = 250; // Color stays for only 0.25 seconds

    if (type === 'Up') {
        // Change to a bright and vibrant green
        body.style.backgroundColor = "rgba(0, 50, 0, 0.9)"; // Bright green
        setTimeout(() => {
            body.style.backgroundColor = '#121212'; // Back to white
        }, colorDuration);
    } else if (type === 'Down') {
        // Change to a bright and vibrant red
        body.style.backgroundColor = "rgba(50, 0, 0, 0.9)"; // Bright red
        setTimeout(() => {
            body.style.backgroundColor = '#121212'; // Back to white
        }, colorDuration);
    }
}

function create_src() {
    // Step 1: Create a temporary array with original versions
    let temp = null;
    temp = x_list.map(subarray => subarray.slice(0, -1));
    temp = temp.concat(fl_list);

    // Step 2: Filter names that are in `org` and sort based on their index in `org`
    temp = temp
        .filter(name => org_list.includes(name)) // Filter names that are in `org`
        .sort((a, b) => org_list.indexOf(a) - org_list.indexOf(b)); // Sort based on their index in `org`

    // Step 3: Map to original object structure
    temp = temp.map(([front, back, chapter]) => ({
        front,
        back,
        chapter
    }));

    // Step 4: Remove reverse counterparts
    const uniqueCards = new Set();
    temp = temp.filter(({ front, back }) => {
        const isReversed = uniqueCards.has(`${back}-${front}`); // Check if reversed exists
        uniqueCards.add(`${front}-${back}`); // Add original version to the set
        return !isReversed; // Only keep if reversed is not found
    });

    return temp;
}

function myBinds(type) {
    if (type === 'flip') {
        if (cardFront.textContent != "Empty" && chapter.textContent != "") {
            card.classList.toggle("flipped");
        } else if (chapter.textContent == "" && card.classList.contains("flipped")) {
            card.classList.remove("flipped");
        }
    } else if (type === 'up') {
        if (card.classList.contains("flipped")) {
            colorEffect("Up");
            updateCardContent();
            if (fl_list.length >= 0) {
                if (chapter.textContent != "") {
                    let temp = cardBack.innerText;
                    cardBack.textContent = "";
                    card.classList.remove("flipped");
                    setTimeout(() => {
                        cardBack.innerText = temp;
                    }, 600);

                    if (left > 0) {
                        left--;
                        leftElement.textContent = `Left: ${left}`;
                    }
                }
                else if (chapter.textContent == "" && card.classList.contains("flipped")) {
                    card.classList.remove("flipped");
                }
            }
        }
    } else if (type === 'down') {
        if (card.classList.contains("flipped")) {
            colorEffect("Down");
            currentCard.push(Date.now());
            x_list.push(currentCard);
            updateCardContent();
            if (fl_list.length >= 0) {
                let temp = cardBack.innerText;
                cardBack.textContent = "";
                card.classList.remove("flipped");
                setTimeout(() => {
                    cardBack.innerText = temp;
                }, 600);
            }
        }
    }
}

// Event listeners

// desktop exclusive 
document.addEventListener("keydown", event => {
    if (inputPage.style.display === 'flex' || inbuiltPage.style.display !== 'none') {
        return; // Don't handle keydown if input page is visible
    }

    // Prevent default action for space key
    if (event.code === "Space") {
        event.preventDefault();
    }

    switch (event.code) {
        case "KeyQ":
            console.log("IN Q");
            console.log("flashcards", flashcards);
            console.log("fl_list", fl_list);
            console.log("currentCard", currentCard);
            console.log("x_list", x_list);
            console.log("src_list", src_list);
            break;
        case "Space":
            myBinds('flip');
            break;
        case "ArrowUp":
            myBinds('up');
            break;
        case "ArrowDown":
            myBinds('down');

            break;
    }
});

// Phone Exclusive
// Utility function to detect swipe direction
let startX, startY, endX, endY;
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
});

// swipes
document.addEventListener('touchend', (e) => {
    if (inputPage.style.display === 'flex') {
        return; // Don't handle keydown if inputPage is visible
    }

    const touch = e.changedTouches[0];
    endX = touch.pageX;
    endY = touch.pageY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 30) {
            // Swipe right
            console.log("Swipe Right");
        } else if (diffX < -30) {
            // Swipe left
            console.log("Swipe Left");
        }
    } else {
        if (diffY > 30) {
            // Swipe down
            myBinds('down');

        } else if (diffY < -30) {
            // Swipe up
            myBinds('up');
        }
    }
});

document.addEventListener("click", () => {
    if (inputPage.style.display === 'flex' || inbuiltPage.style.display !== 'none') {
        return; // Don't handle keydown if inputPage is visible
    }
    else {
        myBinds('flip');
    }
});

// for-all
menuButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from reaching the body

    showMenuPage();

});
menuCloseButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from reaching the body
    hideMenuPage();
});
inbuiltButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from reaching the body
    getDeckOnline();
    hideAllPages();
    showInbuiltPage();
});
importButton.addEventListener("click", triggerFileInput);
exportButton.addEventListener("click", exportFlashcards);
inputOKButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from reaching the body
    const filename = filenameInput.value.trim();

    src_list = create_src();
    console.log("src", src_list);

    if (filename) {
        const json = JSON.stringify(src_list, null, 4);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
        hideInputPage();
        // showFlashPage();
    } else {
        alert('Filename cannot be empty.');
    }
    src_list = null;
});
inputCancelButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from reaching the body
    hideInputPage();
    // showFlashPage();
});

inbuiltImportButton.addEventListener("click", async (event) => {
    event.stopPropagation(); // Prevent click event from reaching the body
    try {
        await importJSONsOnline();  // Wait for the data to be fetched
        await convertFlashcards();   // Then convert the flashcards
        hideInbuiltPage();
        showFlashPage(); // Show the flash page
    } catch (error) {
        console.error('Error loading flashcards:', error);
    }
});

inbuiltCancelButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from reaching the body
    document.querySelector("#inbuilt-page").style.display = "none"; // Hide the inbuilt-page
    showFlashPage();
});