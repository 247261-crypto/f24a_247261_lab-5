const TOTAL = 8;
const seats = Array.from({ length: TOTAL }, () => null); // null = free, else name
const seatsEl = document.getElementById('seats');
const nameEl = document.getElementById('name');
const countEl = document.getElementById('count');
const freeEl = document.getElementById('free');
const msgEl = document.getElementById('message');

function render() {
  seatsEl.innerHTML = '';
  seats.forEach((owner, i) => {
    const b = document.createElement('button');
    b.className = 'seat' + (owner ? ' taken' : '');
    b.textContent = owner || String(i + 1);
    b.addEventListener('click', () => onSeat(i));
    seatsEl.appendChild(b);
  });
  freeEl.textContent = seats.filter(s => s === null).length;
}

function parseCount(text) {
  const t = text.trim();
  if (!/^\d+$/.test(t)) return null;
  const n = Number(t);
  return n >= 1 ? n : null;
}

function onSeat(i) {
  msgEl.textContent = '';
  const name = nameEl.value.trim();
  const n = parseCount(countEl.value);

  // Valid name and count: try to book n seats starting here.
  if (name && n !== null) {
    if (i + n > TOTAL) { msgEl.textContent = 'Not enough seats from here.'; return; }
    for (let k = i; k < i + n; k++) {
      if (seats[k] !== null) { msgEl.textContent = 'Those seats are taken.'; return; }
    }
    for (let k = i; k < i + n; k++) seats[k] = name;
    render();
    return;
  }

  // Invalid input: clicking a taken seat frees that one seat only.
  if (seats[i] !== null) { seats[i] = null; render(); return; }
  msgEl.textContent = 'Enter a name and a whole number of seats.';
}

render();
