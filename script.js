window.onload = function() {
    if(localStorage.getItem('cours')) {
        document.getElementById('liste-cours').innerHTML = localStorage.getItem('cours');
        ajouterClickSuppressionCours();
    }
    if(localStorage.getItem('devoirs')) {
        document.getElementById('liste-devoirs').innerHTML = localStorage.getItem('devoirs');
        ajouterInteractionsDevoirs();
    }
}

function ajouterCours() {
    const input = document.getElementById('nouveau-cours');
    const valeur = input.value.trim();
    if(valeur) {
        const li = document.createElement('li');
        li.textContent = valeur;

        const btn = document.createElement('button');
        btn.textContent = 'Supprimer';
        btn.classList.add('delete-btn');
        btn.onclick = function() { li.remove(); sauvegarderCours(); };
        li.appendChild(btn);

        document.getElementById('liste-cours').appendChild(li);
        input.value = '';
        sauvegarderCours();
    }
}

function ajouterClickSuppressionCours() {
    const items = document.querySelectorAll('#liste-cours li');
    items.forEach(li => {
        const btn = li.querySelector('.delete-btn');
        if(btn) btn.onclick = function() { li.remove(); sauvegarderCours(); };
    });
}

function ajouterDevoir() {
    const texte = document.getElementById('nouveau-devoir').value.trim();
    const matiere = document.getElementById('matiere-devoir').value;
    const dateLimite = document.getElementById('date-devoir').value;
    const datePrevue = document.getElementById('date-prevue').value;

    if(texte) {
        const li = document.createElement('li');

        if(matiere) li.classList.add(matiere);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = function() {
            li.classList.toggle('completed');
            sauvegarderDevoirs();
        };

        const spanTexte = document.createElement('span');
        let description = texte;
        if(matiere) description += ` [${matiere}]`;
        if(dateLimite) description += ` (limite: ${dateLimite})`;
        if(datePrevue) description += ` - prévu: ${datePrevue}`;
        spanTexte.textContent = description;

        const btnSupprimer = document.createElement('button');
        btnSupprimer.textContent = 'Supprimer';
        btnSupprimer.classList.add('delete-btn');
        btnSupprimer.onclick = function() { li.remove(); sauvegarderDevoirs(); };

        li.appendChild(checkbox);
        li.appendChild(spanTexte);
        li.appendChild(btnSupprimer);

        document.getElementById('liste-devoirs').appendChild(li);

        document.getElementById('nouveau-devoir').value = '';
        document.getElementById('matiere-devoir').value = '';
        document.getElementById('date-devoir').value = '';
        document.getElementById('date-prevue').value = '';

        sauvegarderDevoirs();
    }
}

function ajouterInteractionsDevoirs() {
    const items = document.querySelectorAll('#liste-devoirs li');
    items.forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        if(li.classList.contains('completed') && checkbox) checkbox.checked = true;

        if(checkbox) checkbox.onclick = function() {
            li.classList.toggle('completed');
            sauvegarderDevoirs();
        };

        const btnSupprimer = li.querySelector('.delete-btn');
        if(btnSupprimer) btnSupprimer.onclick = function() {
            li.remove();
            sauvegarderDevoirs();
        };
    });
}

function toutSupprimer() {
    if(confirm("Voulez-vous vraiment tout supprimer ?")) {
        localStorage.removeItem('cours');
        localStorage.removeItem('devoirs');
        document.getElementById('liste-cours').innerHTML = '';
        document.getElementById('liste-devoirs').innerHTML = '';
    }
}

function sauvegarderCours() {
    localStorage.setItem('cours', document.getElementById('liste-cours').innerHTML);
}

function sauvegarderDevoirs() {
    localStorage.setItem('devoirs', document.getElementById('liste-devoirs').innerHTML);
}
