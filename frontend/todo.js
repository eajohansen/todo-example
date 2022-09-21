const messages = document.getElementById('msg');
const showTodo = document.getElementById('todoList');
const form = document.getElementById('form');

//funksjonen som sender info fra frontend til backend, kan gjøres med form.
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const todoName = document.getElementById('todo').value;

  // selve sendingen
  const response = await fetch('http://127.0.0.1:5500/api/addtodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: todoName})
    },
  );

  // mottak av data fra backend og konvertering til lesbar tekst.
  const data = await response.text();

  // om responsen fra backend er OK (200), sendes data til funksjonen meldinger som endrer farge og tekst.
  if(response.status === 200) {
    meldinger(false, data)
    await refresh();

  } else {
    meldinger(data, false)
  }
})

// selve id'en til den todo'en blir sendt som parameter i funksjonen på knappen ved hver knapp. Kan også gjøres uten form
async function slett(slettmeg){
  event.preventDefault()
  // selve sendingen
 const response = await fetch('http://127.0.0.1:5500/api/deletetodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({todoId: slettmeg})
    },
  );

  // mottak av data fra backend og konvertering til lesbar tekst.
  const data = await response.text();

  // om responsen fra backend er OK (200), sendes data til funksjonen meldinger som endrer farge og tekst.
  if(response.status === 200) {
    await refresh();
    meldinger(false, data)
    // hente "frisk" informasjon
  } else {
    meldinger(data, false)
  }

}

// Henter info fra backend
async function refresh() {
  try {
    // Tømme todolist for gammelt
    todoList.innerHTML = '';

    // Hente "frisk" todolist
    const resp = await fetch('http://127.0.0.1:5500/api/gettodo', {
      method: 'GET',
    })
    const data = await resp.json()
    if(resp.status === 200) {
      data.forEach(item => {
        todoList.innerHTML += `<form><p>${item.todoName}</p> <button onclick="slett(${item.todoId})" class="delete-todo">X</button></form>`;
      })
    } else {
      meldinger('Noe gikk feil', false)
    }

  }
  catch (e) {
    console.log(e)
  }
}

// sender feilmeldinger og andre meldinger til frontend, som man får fra backend
function meldinger(error, success) {
  const changeColor = error ? 'red' : 'green';
  const changeText = error ? error : success;
  messages.innerHTML = `<p class='${changeColor}'>${changeText}</p>`
}

refresh()