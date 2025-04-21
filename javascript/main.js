// Element
let newNote;

let cardList;
let titleNote;
let textNote;

let btnAdd;
let btnCerrar;
let btnDescartar

let currentCard = null;

const actuElemets = () => {
    newNote = document.getElementById('newNote');

    cardList = document.getElementById('card-list');
    titleNote = document.getElementById('title');
    textNote = document.getElementById('textarea');
    
    btnCerrar = document.getElementById('btn-cerrar');
    btnDescartar = document.getElementById('btn-descartar');
    btnAdd = document.getElementById('addNote');
}

const createCard = (title, text) => {
    const container = document.createElement('div');
    container.className = 'col-12 col-md-6 col-lg-4 min-w-25 container-card';

    container.innerHTML = `
        <li class="card text-center p-0">
            <div class="card-header">
                <h3 class="title text-truncate">${title}</h3>
            </div>
            <div class="card-body">
                <p class="card-text text-truncate">${text}</p>
            </div>
            <div class="card-footer text-body-secondary d-flex flex-column flex-sm-row justify-content-evenly align-content-around align-items-center gap-1">
                <button class="btn btn-success px-3 w-50 w-sm-auto btnView" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ver</button>
                <button class="btn btn-info my-1 w-50 w-sm-auto btnEdit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Editar</button>
                <button class="btn btn-danger w-50 w-sm-auto btnDelete">Eliminar</button>
            </div>
        </li>
    `;
    return container;
}

// Cambia entre el modo ver y modo editar del modal
const viewEditMode = (mode) => {
    const inputs = [textNote, titleNote];
    inputs.forEach(input => {
        if (mode === 'view') {
            input.setAttribute('readonly', true);
        } else {
            input.removeAttribute('readonly');
        }
    });

    if (mode === 'view') {
        // En modo view, mostrar solo el botón Cerrar
        btnCerrar.classList.remove('d-none');
        btnDescartar.classList.add('d-none');
        btnAdd.classList.add('d-none');
    } else {
        // En modo edit, mostrar Añadir y Descartar
        btnCerrar.classList.add('d-none');
        btnDescartar.classList.remove('d-none');
        btnAdd.classList.remove('d-none');
    }
}

const newNoteResetMode = () => {
    newNote.addEventListener('click', () => {
        titleNote.value = '';
        textNote.value = '';
        viewEditMode('edit');
    })
}

const addN = () => {
    btnAdd.addEventListener('click', () => {
        let title = titleNote.value;
        const text = textNote.value;
        
        if (text.trim() !== "") {
            // nombre por defecto si no hay titulo
            if (title.trim() === "") {
                title = `Nota de texto - ${new Date().toLocaleDateString()}`;
            }
            
            if (currentCard) {
                // Si estamos editando, actualizar la card existente
                const titleElement = currentCard.querySelector('.title');
                const textElement = currentCard.querySelector('.card-text');
                
                titleElement.textContent = title;
                textElement.textContent = text;
                
                currentCard = null;
            } else {
                // Si no estamos editando, crear una nueva card
                const card = createCard(title, text);
                cardList.appendChild(card);
            }
            
            titleNote.value = '';
            textNote.value = '';
            viewEditMode('edit');
        } else {
            alert('El texto no puede estar vacio');
        }
    });
}

// Carga los datos de la card en el modal
const cardDataInModal = (card) => {
    const titleElement = card.querySelector('.title');
    const textElement = card.querySelector('.card-text');
    titleNote.value = titleElement.textContent;
    textNote.value = textElement.textContent;
}

const editN = () => {
    cardList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btnEdit')) {
            // le da valor a currentCard
            currentCard = e.target.closest('.container-card');
            cardDataInModal(currentCard);
            viewEditMode('edit');
        }
    });
}

const deleteN = () => {
    cardList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btnDelete')) {
            const card = e.target.closest('.container-card');
            if (confirm("¿Estas seguro que desea eliminar la nota?")) card.remove()
        }
    });
}

const view = () => {
    cardList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btnView')) {
            const card = e.target.closest('.container-card');
            cardDataInModal(card);
            viewEditMode('view');
        }
    });
}

// Configurar todos los event listeners
const setupEventListeners = () => {
    newNoteResetMode();
    addN();
    view();
    editN();
    deleteN();
}

// Inicialización de la aplicacion
const initApp = () => {
    actuElemets();
    setupEventListeners();
    // Inicializar en modo edit por defecto
    viewEditMode('edit');
}

// Iniciar la aplicacion cuando el DOM este listo
document.addEventListener('DOMContentLoaded', initApp);