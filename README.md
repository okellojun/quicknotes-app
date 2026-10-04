# QuickNotes
Stay organized with QuickNotes—a lightweight web application that lets you easily manage, categorize, and filter your personal notes.

# Features
- **Categorization**: Tag notes as Personal, Work, or Study with visual color-coded badges.
- **Search**: Filter through your existing notes in real time.
- **Form Validation**: Protects against empty input and enforces a 200-character limit.
- **Local Persistence**: Notes are automatically saved in the browser via `localStorage`.
- **Responsive Layout**: Seamlessly transitions from desktop to single-column mobile views.
- **Clear All Option**: Delete all stored notes at once with confirmation.

## How to Run Locally
1. Clone or download this repository to your local machine.
2. Open the project folder (`quicknotes-app`).
3. Open `index.html` directly in any standard browser (e.g., Chrome, Firefox, Safari).

## What I Learned
1. **DOM Manipulations & Security**: Safer rendering techniques using `textContent` instead of `innerHTML` to avoid XSS vulnerabilities.
2. **State & LocalStorage Sync**: Managing JavaScript array state and keeping it in sync with `localStorage` using `JSON.stringify` and `JSON.parse`.
3. **Responsive Web Design**: Structuring layout components using Flexbox and adapting UI controls for mobile screens with CSS `@media` queries.