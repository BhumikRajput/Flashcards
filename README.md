# Flashcards

A lightweight, offline-friendly web app for studying Japanese vocabulary (and any custom decks) with spaced-repetition-style review, plus tools for reading practice (Dokkai) and vocabulary browsing.

**Live demo:** [https://bhumikrajput.github.io/Flashcards/](https://bhumikrajput.github.io/Flashcards/)

---

## Description

Flashcards is a simple and fast web app designed for efficient vocabulary study, especially Japanese.

You can import your own custom decks in JSON format or use the built-in N4 and N5 vocabulary & kanji decks. The study system is deliberately lightweight:

- Flip the card with a tap or the Spacebar
- Swipe up (or press ↑) when you know the card — it gets removed from the current session
- Swipe down (or press ↓) when you don’t know it — the card will reappear after about 30 seconds for reinforcement

Progress is never lost: you can export the remaining cards at any time and continue later from exactly where you left off.

In addition to the flashcard mode, the project includes two companion tools:

- **Vocab** – A clean table view of any selected decks with direct links to Jisho and Takoboto
- **Dokkai** – Interactive reading practice with clickable vocabulary, furigana, sentence translations, and multiple-choice questions

The entire app runs in the browser with no build step or external dependencies.

---

## Features

### Flashcard Study Mode
- Import custom decks as JSON or load premade N4 / N5 vocabulary & kanji decks
- Bidirectional cards (front → back **and** back → front)
- Simple controls:
  - **Space / Tap** → Flip card
  - **↑ / Swipe up** → Mark as known (remove from session)
  - **↓ / Swipe down** → Mark as unknown (reappear after ~30 seconds)
- Visual feedback (green / red flash)
- Export remaining cards anytime to continue later
- Works on both desktop and mobile

### Extra Tools
- **Vocab** – Table view of selected decks with one-click dictionary lookup
- **Dokkai** – Interactive reading comprehension with:
  - Clickable vocabulary (romaji + meaning popup + Jisho link)
  - Toggleable sentence translations
  - Multiple-choice questions with revealable answers
  - Furigana support
  - Dark mode + adjustable font size, spacing, line height, and margins
- Help page with key bindings and logic explanation

---

## Quick Start

1. Clone the repository
   ```bash
   git clone https://github.com/BhumikRajput/Flashcards.git
   ```
2. Open `index.html` in any modern browser  
   (or deploy the folder to GitHub Pages / any static host)

No build step or dependencies required.

---

## How to Use

1. Click the menu button (☰)
2. Choose **Inbuilt** to select premade N4/N5 decks, or **Import** to load your own JSON
3. Study:
   - Tap / Space → reveal answer
   - Swipe up / ↑ → I know it
   - Swipe down / ↓ → I don’t know it (comes back later)
4. Use **Export** anytime to save the remaining cards as a new JSON file

---

## JSON Deck Format

```json
[
  {
    "front": "私",
    "back": "I / me",
    "chapter": "N5 C1"
  },
  {
    "front": "友達",
    "back": "friend",
    "chapter": "N5 C1"
  }
]
```

- `front` and `back` are required  
- `chapter` is optional (shown on the card)

The app automatically creates reverse cards (back → front).

---

## Project Structure

```
├── index.html              # Main flashcard app
├── script.js
├── style.css
├── assets/
│   ├── help.html           # Controls & logic explanation
│   ├── vocabByLink.html    # Vocabulary table + dictionary links
│   ├── dokkai.html         # Interactive reading practice
│   └── comprehensions/     # Dokkai JSON data
├── decks/                  # Premade N4 / N5 JSON decks
└── others/                 # Older versions & experiments
```

---

## Controls

| Action               | Desktop       | Mobile       |
|----------------------|---------------|--------------|
| Flip card            | Space / Click | Tap          |
| Know it (remove)     | ↑             | Swipe up     |
| Don’t know (requeue) | ↓             | Swipe down   |
| Open menu            | ☰ button      | ☰ button     |

---

## License

MIT License
