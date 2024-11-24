const formsNote = () => {
  const input = document.querySelector("#title"),
    createBtn = document.querySelector("#create"),
    listItem = document.querySelector(".list-group");

  const notes = [
    {
      title: "сделать блокнот на JavaScript",
      complited: false,
    },
    {
      title: "Поиграть в сталкер 2",
      complited: true,
    },
  ];

  function clearInput() {
    input.value = "";
  }

  function noteList() {
    listItem.innerHTML = ''

    if (notes.length === 0) {
      listItem.innerHTML = '<p class="list-group-item d-flex justify-content-between align-items-center">Нет Заметок!</p>'
    }

    for (let [index, note] of notes.entries()) {
      listItem.insertAdjacentHTML("beforeend", renderNotes(note, index));
    }
  }

  function renderNotes(input, index) {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="${
              input.complited ? "text-decoration-line-through" : ""
            }">${input.title}</span>
            <span>
              <span class="btn btn-small btn-${
                input.complited ? "warning" : "success"
              }" data-index="${index}" data-type="toggle">&check;</span>
              <span class="btn btn-small btn-danger" data-index="${index}" data-type="danger">&times;</span>
            </span>
        </li>
    `;
  }

  listItem.addEventListener('click', (e) => {
    console.log(e.target.dataset)
    if (e.target.dataset.index) {
      const index = Number(e.target.dataset.index)
      const type = e.target.dataset.type

      if (type === 'toggle') {
        notes[index].complited = !notes[index].complited
      } else {
        notes.splice(index, 1)
      }

      noteList() 
    }
  })

  createBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (input.value.length === 0) {
      return;
    }

    const newArray = {
      title: input.value,
      complited: false,
    };
    
    notes.push(newArray);
    noteList();
    clearInput();
  });

  noteList();
};

document.addEventListener("DOMContentLoaded", formsNote);
