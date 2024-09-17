var org_list = null;
let fl_list = [];
let x_list = [];
let left = 0;
var currentCard = null;
var flashcards = null;
var cardFront = document.querySelector("#cardFront");
var cardBack = document.querySelector("#cardBack");
var card = document.querySelector("#card");
var leftElement = document.querySelector(".left");
// var translation = document.querySelector(".translate");
var chapter = document.querySelector(".chapter");
var exportButton = document.querySelector("#exportButton");
var importButton = document.querySelector("#importButton");
var modal = document.querySelector("#modal");
var filenameInput = document.querySelector("#filenameInput");
var okButton = document.querySelector("#okButton");
var cancelButton = document.querySelector("#cancelButton");
var src_list = null;


function triggerFileInput() {
    document.getElementById('hiddenFileInput').click();
}

// Function to import flashcards from a JSON file
function importJSON() {
    const fileInput = document.getElementById('hiddenFileInput');
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
                fetchFlashcards();
            } else {
                alert('Invalid flashcard format. Please check the file.');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            alert('Failed to parse JSON file. Please ensure it is correctly formatted.');
        }
    };
    reader.readAsText(file);
    console.log(flashcards);
}

// Function to fetch flashcards from JSON file
async function fetchFlashcards() {
    try {
        org_list = flashcards.flatMap(item => [
            [item.front, item.back, item.chapter],
            [item.back, item.front, item.chapter]
        ]);
        fl_list = org_list;

        left = fl_list.length - 1;
        leftElement.textContent = `Left: ${left}`;

        updateCardContent();
    } catch (error) {
        console.error('Error fetching flashcards:', error);
    }
}

function updateCardContent() {
    if ((x_list.length > 0)) {
        if ((fl_list.length < 0) || (Date.now() - x_list[0][3] > 30000)) {
            currentCard = [x_list[0][0], x_list[0][1], x_list[0][2]];
            cardFront.innerHTML = currentCard[0] || "No front text";
            cardBack.innerHTML = currentCard[1] || "No back text";
            // translation.textContent = `Translation: ${currentCard[2]}`;
            chapter.textContent = `Chapter: ${currentCard[2]}`;
            x_list.shift();
        }
        else {
            currentCard = fl_list[Math.floor(Math.random() * fl_list.length)];
            cardFront.innerHTML = currentCard[0] || "No front text";
            cardBack.innerHTML = currentCard[1] || "No back text";
            // translation.textContent = `Translation: ${currentCard[2]}`;
            chapter.textContent = `Chapter: ${currentCard[2]}`;
            fl_list = fl_list.filter(item => item !== currentCard);
        }
    } else if (fl_list.length > 0) {
        currentCard = fl_list[Math.floor(Math.random() * fl_list.length)];
        cardFront.innerHTML = currentCard[0] || "No front text";
        cardBack.innerHTML = currentCard[1] || "No back text";
        // translation.textContent = `Translation: ${currentCard[2]}`;
        chapter.textContent = `Chapter: ${currentCard[2]}`;
        fl_list = fl_list.filter(item => item !== currentCard);
    } else {
        cardFront.textContent = "OVER";
        cardBack.textContent = "OVER";
        // translation.textContent = "";
        chapter.textContent = "";
    }
    console.log(`fl-length: ${fl_list.length}`);
}

// Function to show the modal
function showModal() {
    modal.style.display = 'flex';
    filenameInput.focus();
}

// Function to hide the modal
function hideModal() {
    modal.style.display = 'none';
}

// Function to export flashcards as JSON
function exportFlashcards() {
    showModal();
}

function create_src() {
    let temp = null;

    temp = x_list.map(subarray => subarray.slice(0, -1));
    temp = temp.concat(fl_list);
    temp = temp
        .filter(name => org_list.includes(name)) // Filter names that are in `org`
        .sort((a, b) => org_list.indexOf(a) - org_list.indexOf(b)); // Sort based on their index in `org`
    temp = temp.map(([front, back, chapter]) => ({
        front,
        back,
        chapter
    }));

    return temp;
}

// Event listeners

// desktop exclusive 
document.addEventListener("keydown", event => {
    if (modal.style.display === 'flex') {
        return; // Don't handle keydown if modal is visible
    }

    // Prevent default action for space key
    if (event.code === "Space") {
        event.preventDefault();
    }

    switch (event.code) {
        case "KeyQ":
            console.log("x_list", x_list);
            console.log("fl_list", fl_list);
            console.log("src_list", src_list);
            break;
        case "Space":
            if (chapter.textContent != "") {
                card.classList.toggle("flipped");
            }
            else if (chapter.textContent == "" && card.classList.contains("flipped")) {
                card.classList.remove("flipped");
            }
            break;
        case "ArrowUp":
            if (card.classList.contains("flipped")) {
                updateCardContent();
                if (fl_list.length >= 0) {
                    if (chapter.textContent != "") {
                        let temp = cardBack.textContent;
                        cardBack.textContent = "";
                        card.classList.remove("flipped");
                        setTimeout(() => {
                            cardBack.textContent = temp;
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
            break;
        case "ArrowDown":
            if (card.classList.contains("flipped")) {
                currentCard.push(Date.now());
                x_list.push(currentCard);
                updateCardContent();
                if (fl_list.length >= 0) {
                    let temp = cardBack.textContent;
                    cardBack.textContent = "";
                    card.classList.remove("flipped");
                    setTimeout(() => {
                        cardBack.textContent = temp;
                    }, 600);
                }
            }
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
    if (modal.style.display === 'flex') {
        return; // Don't handle keydown if modal is visible
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
            if (card.classList.contains("flipped")) {
                currentCard.push(Date.now());
                x_list.push(currentCard);
                updateCardContent();
                if (fl_list.length >= 0) {
                    let temp = cardBack.textContent;
                    cardBack.textContent = "";
                    card.classList.remove("flipped");
                    setTimeout(() => {
                        cardBack.textContent = temp;
                    }, 600);
                }
            }
        } else if (diffY < -30) {
            // Swipe up
            if (card.classList.contains("flipped")) {
                updateCardContent();
                if (fl_list.length >= 0) {
                    if (chapter.textContent != "") {
                        let temp = cardBack.textContent;
                        cardBack.textContent = "";
                        card.classList.remove("flipped");
                        setTimeout(() => {
                            cardBack.textContent = temp;
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
        }
    }
});

document.addEventListener("click", () => {
    if (modal.style.display === 'flex') {
        return; // Don't handle keydown if modal is visible
    }
    if (chapter.textContent != "") {
        card.classList.toggle("flipped");
    }
    else if (chapter.textContent == "" && card.classList.contains("flipped")) {
        card.classList.remove("flipped");
    }
});

// for-all
importButton.addEventListener("click", triggerFileInput);
exportButton.addEventListener("click", exportFlashcards);
okButton.addEventListener("click", () => {
    const filename = filenameInput.value.trim();

    src_list = create_src();

    if (filename) {
        const json = JSON.stringify(src_list, null, 4);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
        hideModal();
    } else {
        alert('Filename cannot be empty.');
    }
    src_list = null;
});
cancelButton.addEventListener("click", hideModal);
