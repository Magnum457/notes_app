const addBtnEl = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
  notes.forEach(note => {
    addNewNote(note);
  })
}

addBtnEl.addEventListener('click', () => {
  addNewNote();
});

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
  <div class="notes">
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? '' : 'hidden'}">
    </div>
    <textarea class="main ${text ? 'hidden' : ''}"></textarea>
  </div>
  `;

  const editBtnEl = note.querySelector('.edit');
  const deleteBtnEl = note.querySelector('.delete');

  const mainEl = note.querySelector('.main');
  const textAreaEl = note.querySelector('textarea')

  textAreaEl.value = text;
  mainEl.innerHTML = marked.parse(text);

  editBtnEl.addEventListener('click', () => {
    mainEl.classList.toggle("hidden");
    textAreaEl.classList.toggle("hidden");
  });

  deleteBtnEl.addEventListener('click', () => {
    note.remove();

    updateLocalStorage();
  });

  textAreaEl.addEventListener('input', (e) => {
    const { value } = e.target;
  
    mainEl.innerHTML = marked.parse(value);

    updateLocalStorage();
  });

  document.body.appendChild(note);
}

function updateLocalStorage() {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach(note => {
    notes.push(note.value);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}
