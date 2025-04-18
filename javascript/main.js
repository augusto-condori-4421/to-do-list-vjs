// Element
let newNote;

let cardList;
let titleNote;
let textNote;

let btnAdd;
let btnCerrar;
let btnDescartar

let btnView;
let btnEdit;
let btnDelete;

const actuElemets = () => {
    newNote = document.getElementById('newNote');

    cardList = document.getElementById('card-list');
    titleNote = document.getElementById('title');
    textNote = document.getElementById('textarea');
    
    btnCerrar = document.getElementById('btn-cerrar');
    btnDescartar = document.getElementById('btn-descartar');
    btnAdd = document.getElementById('addNote');

    btnView = document.querySelectorAll('.btnView');
    btnEdit = document.querySelectorAll('.btnEdit');
    btnDelete = document.querySelectorAll('.btnDelete');
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

const viewEditMode = (inputs = [textNote, titleNote], mode = 'view') => {
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
        viewEditMode([textNote, titleNote], 'edit');
    })
}

const addN = () => {
    btnAdd.addEventListener('click', () => {
        const title = titleNote.value;
        const text = textNote.value;
        
        const card = createCard(title, text);
        cardList.appendChild(card);
        
        titleNote.value = '';
        textNote.value = '';
        viewEditMode([textNote, titleNote], 'edit');
    });
}

const deleteN = () => {
    cardList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btnDelete')) {
            const card = e.target.closest('.container-card');
            if (card) {
                if (confirm("¿Estas seguro que desea eliminar la nota?")) card.remove()
            }
        }
    });
}

const view = () => {
    cardList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btnView')) {
            const card = e.target.closest('.container-card');
            const titleElement = card.querySelector('.title');
            const textElement = card.querySelector('.card-text');
            
            titleNote.value = titleElement.textContent;
            textNote.value = textElement.textContent;
            
            viewEditMode([textNote, titleNote], 'view');
        }
    });
}

// Configurar todos los event listeners
const setupEventListeners = () => {
    newNoteResetMode();
    addN();
    view();
    deleteN();
}

// Inicialización de la aplicacion
const initApp = () => {
    actuElemets();
    setupEventListeners();
    // Inicializar en modo edit por defecto
    viewEditMode([textNote, titleNote], 'edit');
}

// Iniciar la aplicación cuando el DOM este listo
document.addEventListener('DOMContentLoaded', initApp);