# QuickNotes

QuickNotes is a simple note-taking web app built with HTML, CSS and
JavaScript. It lets you write short notes, sort them into categories, search
through them and delete the ones you no longer need. Your notes are saved in
the browser, so they are still there when you refresh the page or come back
later.

## Features

- Add notes of up to 200 characters
- Choose a category for each note: Personal, Work or Study
- Colour-coded note cards for each category
- Each note shows its text, category and the date and time it was created
- Delete any note with its own Delete button
- Live search that filters notes as you type (not case-sensitive)
- Validation with clear error messages for empty or too-long notes
- Note count that shows the correct message for zero, one or many notes
- Notes saved in localStorage, so they survive a page refresh
- Responsive layout that works on laptops and phones

## How to run locally

1. Clone the repository:
git clone https://github.com/rozzie01/quicknotes-app.git
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**
   (or simply open `index.html` in your browser).

No installation or build step is needed.

## What I learned

- **The render pattern:** keep the data in one array, and every time it
  changes, update the array, save it, then redraw the list with `render()`.
  This keeps the screen and the data in sync.
- **Safe DOM updates:** building elements with `createElement` and
  `textContent` instead of `innerHTML` stops user-typed text from being run
  as code (XSS).
- **localStorage and JSON:** browser storage only holds strings, so the notes
  array has to be converted with `JSON.stringify` to save and `JSON.parse` to
  load.
- **Event handling:** listening for `submit` on the form means both the
  button and the Enter key work, and `preventDefault()` stops the page
  reloading.
- **Git workflow:** committing after each task made it easy to track my
  progress and see how the project grew.
  
  - "Clear all" button with a confirmation prompt to delete every note at once