const errorMessage = document.querySelector("#error-message");
const count = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

// ---------- 1. Select the elements we need ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

// Display names for each category value
const CATEGORY_LABELS = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

// ---------- 2. The data: an array of note objects ----------
// ---------- 2. The data: loaded from localStorage ----------
const STORAGE_KEY = "quicknotes";

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return []; // saved data was damaged: start fresh
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();
let searchTerm = ""; // what the user is currently searching for

// ---------- Validation ----------
const MAX_LENGTH = 200;

function getError(text) {
  if (text === "") {
    return "Please type a note first.";
  }
  if (text.length > MAX_LENGTH) {
    return "Notes must be 200 characters or fewer.";
  }
  return ""; // no error
}

// ---------- Count message ----------
function updateCount() {
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- 3. Draw the notes on the page ----------
function render() {
  list.replaceChildren();

  // Only the notes that match the current search
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  // Nothing matched: say so inside the list
  if (searchTerm !== "" && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.classList.add("empty-message");
    message.textContent = "No notes match your search.";
    list.appendChild(message);
  }

  visibleNotes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const body = document.createElement("div");
    body.classList.add("note-body");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.classList.add("note-meta");

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent = CATEGORY_LABELS[note.category];

    const date = document.createElement("span");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    const del = document.createElement("button");
    del.type = "button";
    del.classList.add("delete-btn");
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteNote(note.id));

    meta.appendChild(category);
    meta.appendChild(date);
    body.appendChild(text);
    body.appendChild(meta);
    li.appendChild(body);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ---------- 4. Add a note ----------
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  saveNotes();
  render();
    updateCount();
}

// ---------- Delete a note ----------
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
    updateCount();
}

// ---------- 5. Listen for the form ----------
// ---------- Listen for the form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const error = getError(text);

  if (error !== "") {
    errorMessage.textContent = error;
    input.focus();
    return; // stop here: do not add the note
  }

  errorMessage.textContent = ""; // clear any old error
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- Search as the user types ----------
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  render();
});

// ---------- 6. Draw once when the page first loads ----------
render();
  updateCount();

