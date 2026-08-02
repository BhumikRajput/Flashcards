# Flashcards

A lightweight, offline-friendly web app for studying Japanese vocabulary (and any custom decks) with spaced-repetition-style review, plus tools for reading practice (Dokkai) and vocabulary browsing.

**Live demo:** [https://bhumikrajput.github.io/Flashcards/](https://bhumikrajput.github.io/Flashcards/)

---

## Features

### Flashcard Study Mode
- Import custom decks as JSON or load premade N4 / N5 vocabulary & kanji decks
- Bidirectional cards (front → back **and** back → front)
- Simple, fast controls:
  - **Space / Tap** → Flip card
  - **↑ / Swipe up** → Mark as known (remove from session)
  - **↓ / Swipe down** → Mark as unknown (reappear after ~30 seconds)
- Visual feedback (green / red flash)
- Export remaining cards anytime to continue later
- Works great on both desktop and mobile

### Extra Tools
- **Vocab** – Table view of selected decks with one-click lookup on Jisho / Takoboto
- **Dokkai** – Interactive reading comprehension practice with:
  - Clickable vocabulary (romaji + meaning popup + Jisho link)
  - Toggleable sentence translations
  - Multiple-choice questions with revealable answers
  - Furigana support
  - Dark mode + adjustable font size, letter/word spacing, line height, margins
- Help page with key bindings and logic explanation

---

## Quick Start

1. Clone the repo
   ```bash
   git clone https://github.com/BhumikRajput/Flashcards.git
   ```
2. Open `index.html` in any modern browser  
   (or deploy the whole folder to GitHub Pages / any static host)

No build step or dependencies required.

---

## How to Use the Flashcard App

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

## Controls Summary

| Action               | Desktop       | Mobile       |
|----------------------|---------------|--------------|
| Flip card            | Space / Click | Tap          |
| Know it (remove)     | ↑             | Swipe up     |
| Don’t know (requeue) | ↓             | Swipe down   |
| Open menu            | ☰ button      | ☰ button     |

---

## License

MIT License – feel free to use, modify, and share.

---

## Author

**Bhumik Rajput**  
[bhumikrohilla@gmail.com](mailto:bhumikrohilla@gmail.com)

---

Happy studying! 🇯🇵
