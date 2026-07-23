

\#I have chosen Whack-a-Mole Project



\## Project Overview



git commit -m "css and JavScript improvisation"

1 Commits on Jul 23, 2026

&#x09;test passed updated code adding

Commits on Jul 23, 2026
updated README file

2 Commits on Jul 20, 2026

&#x09;css and JavScript improvisation

&#x09;css and JavScript improvisation

·

4 Commits on Jul 19, 2026

&#x09;css and JS updated commit

&#x09;First commit

&#x09;CSS updated

&#x09;CSS updated

&#x09;first commit





This project is a browser-based Whack-a-Mole game built with HTML, CSS, and JavaScript. The game was created to meet the Chegg Skills grading rubric for the final capstone submission.



The application includes:

\- A title, start button, score counter, and timer display.

\- Nine holes and moles with random popup behavior.

\- Score updates when the player clicks a mole.

\- A working game countdown and game over behavior.

\- JavaScript functions that support automated grading and test coverage.

\- written code to show final score in popup window after game over



\## Game Features



\- `US-01`: Basic game structure with title, start controls, score, timer, and nine hole/mole elements.

\- `US-02`: Randomness utilities using `randomInteger()`, `setDelay()`, and `chooseHole()`.

\- `US-03`: Game flow functions such as `toggleVisibility()`, `showAndHide()`, `showUp()`, `startGame()`, and `gameOver()`.

\- `US-04`: Score management and mole hit logic with `updateScore()`, `clearScore()`, and `whack()`.

\- `US-05`: Timer logic with `startTimer()` and `updateTimer()`.

\- `US-06`: Original game styling and theme customization.

\- `US-07`: Instructions for GitHub deployment.



\## Installation



1\. Cloned the repository using GitBash

&#x20;  git clone <your-repo-url> - Whack-a-Mole Project cloned project from github

&#x20;  cd Whack

&#x20;  ```

2\. Install dependencies:

&#x20;  ```bash

&#x20;  npm install  - installed

&#x20;  ```

3\. Run the development server:

&#x20;  ```bash

&#x20;  npm start  - ran the server

&#x20;  ```

4\. Open the game in your browser at `http://localhost:3000`.



\## Testing    - tried on my local system and game is working as expected - http://127.0.0.1:5503/index.html



Run the automated tests with:



```bash

npm test  - **test passed**

```



The project uses Jest and Puppeteer for the acceptance tests in `test/solution.test.js`.



\## How to Play



1\. Open the game in your browser.

2\. Click the `start` button.

3\. Moles will randomly appear in the nine holes.

4\. Click the mole to score points.

5\. The timer counts down while the game runs.

6\. The game ends when the timer reaches zero.

7\. Final score will appear in popup window after game over



\## Project Structure



\- `index.html` — HTML structure and game layout.

\- `src/styles.css` — CSS styling and animation.

\- `src/index.js` — Game logic.

\- `test/solution.test.js` — Automated grading tests.



\## Grading Checklist



Before submitting, confirm the following:



\- \[✓ ] The game works as specified in the user stories.

\- \[✓ ] The game includes originality and creativity.

\- \[✓ ] The game can be deployed to GitHub Pages.

\- \[✓ ] Git commit history is present and shows meaningful progress.

\- \[✓ ] Screenshots of the working project environment are included with submission.

\- \[ ✓] The README includes installation, usage, testing, and grading information.



\## Deployment



✓   This project is intended to be deployed as a static site, for example via GitHub Pages.



\### Example deployment steps



1\. Push the final code to GitHub.  - done

2\. In repository settings, enable GitHub Pages. - done

3\. Choose the publishing branch (`main` or `gh-pages`).  - main

4\. Add the deployment URL to your final submission.   - done



\## Notes for Review



This README was created to align with the Chegg Skills grading rubric. It includes:

\- A clear project overview.

\- Setup instructions.

\- Testing and gameplay details.

\- A checklist for submission readiness.



\## Commit History and Documentation



Make sure your submission includes:

\- A clean Git commit history with incremental progress commits.

\- Notes on when major functionality was added.

\- Replit or deployment screenshots showing the running game.



