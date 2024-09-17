# Flashcard App 

## Description
This web-based flashcard application provides an intuitive interface for efficient and personalized learning. Users can import their custom flashcards in JSON format or use the provided premade Japanese vocabulary cards. The app supports flexible interaction: tap or press the spacebar to reveal answers, swipe up (or press the Up key) to remove a card if you’ve mastered it, and swipe down (or press the Down key) to revisit the card after 30 seconds for reinforcement.

The app tracks your progress, allowing you to export remaining flashcards for continued study later. This feature makes it perfect for learners who prefer to break down their learning into manageable sessions.

## Features

- **Import JSON Flashcards**: Load custom flashcards by importing a JSON file with your questions and answers.
- **Premade Cards**: Includes premade Japanese vocabulary cards for language learners.
- **Interactive Controls**: 
  - Tap or press the `Space` key to check answers.
  - Swipe up (or press `Up` arrow key) to remove cards you know.
  - Swipe down (or press `Down` arrow key) to revisit cards after 30 seconds.
- **Progress Export**: Export remaining flashcards for future study sessions, allowing you to pick up right where you left off.

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/BhumikRajput/Flashcards.git
```
2. Open the index.html file in your browser or deploy it on a server.

## Usage

1. Import flashcards from a JSON file. 
2. Use tap or key-based controls to navigate through the flashcards.    
3. Export your progress to continue learning later.    
    
## JSON Flashcard Format

The app comes with a set of premade Japanese vocabulary flashcards to get you started.

Flashcards should be formatted in the following JSON structure:

**Example of premade Japanese flashcards**

```json
[
    {"front": "Watashi","back": "I","chapter": 1},
    {"front": "Des","back": "is, am, are","chapter": 1},
    {"front": "Indo","back": "India","chapter": 1}
    {"front": "Tomodachi","back": "Friend","chapter": 1},
    {"front": "hai","back": "Yes","chapter": 1},
    {"front": "iie","back": "No","chapter": 1}
]
```

## Live Version

You can check out the Flashcard App at:

https://bhumikrajput.github.io/Flashcards/

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
Feel free to fork this repository and contribute! Please open a pull request with any improvements or new features you'd like to add.

Contact
For questions or feedback, reach out to me at bhumikrohilla@gmail.com.
