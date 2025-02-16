Hangman Game (Redux + Next.js)  

This is a **Hangman** game built with **Next.js** and **Redux Toolkit**. The words used in the game are loaded from an `.env` file, and the game supports different difficulty levels.

---

## Technologies Used  

- **Next.js** (React Framework)  
- **Redux Toolkit** (State Management)  
- **TypeScript**  
- **Node.js v22.2.0**  

---

## Installation  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/dbatonyi/hangman.git
cd hangman-game
```

### 2️⃣ Install Dependencies  

```sh
npm install
```

### 3️⃣ Create and Configure the `.env` File  

You need to create a `.env` file in the root of the project and define the words for the game.  

#### Example `.env` file:  

```env
NEXT_PUBLIC_WORDS=programming,typescript,redux,javascript,hangman,test,example
```

> Words should be comma-separated.  

### 4️⃣ Run the Development Server  

```sh
npm run dev
```

or for production

```sh
npm run build
npm run start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## How to Play  

1. Click **Start Game** to begin.  
2. A random word will be selected based on the chosen difficulty level:  
   - **Easy:** 6-8 letters  
   - **Medium:** 9-12 letters  
   - **Hard:** 13-14 letters  
3. Guess a letter by clicking or typing it.  
4. You have **6 attempts** to guess the word before you lose!  

---

## Features  

✅ Words are loaded dynamically from an `.env` file.  
✅ Three difficulty levels (Easy, Medium, Hard).  
✅ Saves game state to `localStorage` to prevent progress loss.  
✅ Built with **Redux Toolkit** for efficient state management.  