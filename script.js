const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");


const STORAGE_KEY = "quicknotes_app_data";

let notes = loadNotes();

function loadNotes() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Error loading notes from localStorage:", error);
        return [];
    }
}

function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render() {
    notesList.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(searchTerm));

    if (filteredNotes.length === 0 && searchTerm !== "") {
        const emptyLi = document.createElement("li");
        emptyLi.textContent = "No notes match your search. Please refine your search and try again.";
        emptyLi.classList.add("empty-message");
        notesList.appendChild(emptyLi);
    } else {
        filteredNotes.forEach((note) => {
            const li = document.createElement("li");
            li.classList.add("note-card", `category-${note.category.toLowerCase()}`);

            const contentDiv = document.createElement("div");
            contentDiv.classList.add("note-content");
            const textP = document.createElement("p");
            textP.classList.add("note-text");
            textP.textContent = note.text;

            const metaDiv = document.createElement("div");
            metaDiv.classList.add("note-meta");

            const badge = document.createElement("span");
            badge.classList.add("note-badge");
            badge.textContent = note.category;

            const dateSpan = document.createElement("span");
            dateSpan.textContent = note.createdAt;

            metaDiv.appendChild(badge);
            metaDiv.appendChild(dateSpan);
            contentDiv.appendChild(textP);
            contentDiv.appendChild(metaDiv);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => deleteNote(note.id));

            li.appendChild(contentDiv);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);

        });
    }
    updateCount();
}

function updateCount() {
    const count = notes.length;
    if (count === 0) {
      noteCount.textContent = "You have no notes yet.";
      clearAllBtn.style.display = "none";
    } else if (count === 1) {
      noteCount.textContent = "You have 1 note.";
      clearAllBtn.style.display = "inline-block";
    } else {
      noteCount.textContent = `You have ${count} notes.`;
      clearAllBtn.style.display = "inline-block";
    }
  }

  function addNote(text, category) {
    const newNote = {
      id: Date.now(),
      text: text,
      category: category,
      createdAt: new Date().toLocaleString()
    };
  
    notes.push(newNote);
    saveNotes();
    render();
  }

  function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    render();
  }
  

  
  
  noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = noteInput.value.trim();
    const category = noteCategory.value;
  
    if (text === "") {
      errorMessage.textContent = "Please type a note first.";
      return;
    }
  
    if (text.length > 200) {
      errorMessage.textContent = "Notes must be 200 characters or fewer.";
      return;
    }
  
    errorMessage.textContent = "";
    addNote(text, category);
    noteInput.value = "";
    noteInput.focus();
  });
  
  searchInput.addEventListener("input", () => {
    render();
  });
  
  clearAllBtn.addEventListener("click", () => {
    if (confirm("Delete all notes?")) {
      notes = [];
      saveNotes();
      render();
    }
  });
  
  // Initial Render
  render();