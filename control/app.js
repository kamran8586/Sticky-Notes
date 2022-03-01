const addNotes = document.querySelector(".add-notes");
const modalContainer = document.querySelector(".modal-container");
const modalBody = document.querySelector(".modal-body");
const save = document.querySelector(".save");
const userNotesTextArea = document.querySelector(".user-notes");
const notesTitle = document.querySelector(".notes-title");
const container = document.querySelector(".container");
let deleteNotesButtons;
let editnotesButtons;
let totalBoxes;
let storage = localStorage;
let saveNotesTextArea;
addNotes.addEventListener("click", showModal);

save.addEventListener("click", () => {
	if (userNotesTextArea.value.length > 0 && notesTitle.value.length > 0) {
		storage.setItem(notesTitle.value, notesBox(userNotesTextArea.value));
		hideModal();
		insertNotes();
		renderNotes();
		initializeDeleteButton();
	}
});
modalContainer.addEventListener("click", function (e) {
	if (e.target !== this) return;
	hideModal();
});
/**
 * This funciton show the modal box. In this funciton the code write for show the modal box. When the funciton call it will show the modal box.
 */
function showModal() {
	modalBody.classList.add("block");
	modalBody.classList.remove("hidden");
	modalContainer.classList.add("active");
	modalContainer.classList.remove("event-none");
}
/**
 * This funciton hide the modal box. In this funciton the code write for hide the modal box. When the funciton call it will hide the modal box.
 */
function hideModal() {
	modalBody.classList.add("hidden");
	modalContainer.classList.remove("active");
	modalContainer.classList.add("event-none");
}

// Create a box to display notes
const notesBox = (noteText) => {
	const text = `
			<div class="box my-20  h-90 p-2 rounded-md shadow-xl border-1">
				<textarea
					name="text"
					id="textarea"
					class="saveNotesTextArea w-full h-5/6 rounded focus:outline-4 focus:outline-blue-500 focus:outline ring-1 transition-all p-2 text-black cursor-text"
					value=""
					disabled
				>${noteText}
				</textarea>
				<div class="buttons space-x-2">
					<button class="edit btn bg-secondary hover:bg-secondaryHover text-white inline-block">
						Edit
					</button>
					<button class="delete btn bg-secondary hover:bg-secondaryHover text-white inline-block">
						Delete
					</button>
				</div>
			</div>`;
	return text;
};

/**
 * This is funciton insert the html tht contianer the notes.
 */
const insertNotes = () => {
	container.insertAdjacentHTML("beforeend", storage[notesTitle.value]);
};

function renderNotes() {
	const notes = Object.keys(storage);
	container.innerHTML = "";
	notes.forEach((note, index) => {
		container.insertAdjacentHTML("beforeend", storage[note]);
	});
}
renderNotes();

function initializeDeleteButton() {
	if (document.querySelectorAll(".delete") !== null) {
		deleteNotesButtons = document.querySelectorAll(".delete");
		totalBoxes = document.querySelectorAll(".box");
		editnotesButtons = document.querySelectorAll(".edit");
		saveNotesTextArea = document.querySelectorAll(".saveNotesTextArea");
		clickButtonsOperation(deleteNotesButtons, editnotesButtons);
	}
}

function clickButtonsOperation(deleteNotesButtons, editnotesButtons) {
	deleteNotesButtons.forEach((deleteNote, index) => {
		deleteNote.addEventListener("click", () => deleteNotes(index));
	});
	editnotesButtons.forEach((editNote, index) => {
		editNote.addEventListener("click", () => editNotes(index));
	});
}

initializeDeleteButton();
function deleteNotes(index) {
	const currentHtml = totalBoxes[index];
	currentHtml.remove();
	let storageKeys = Object.keys(storage);
	storage.removeItem(storageKeys[index]);
}

function editNotes(index) {
	const currentHtml = saveNotesTextArea[index];
	let storageKeys = Object.keys(storage);
	storage.setItem(storageKeys[index], notesBox(currentHtml.value));
	if (currentHtml.disabled) {
		currentHtml.removeAttribute("disabled");
		return;
	}
	currentHtml.setAttribute("disabled", "true");
}
