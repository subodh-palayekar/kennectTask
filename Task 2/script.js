function isPrime(number) {
  if (number < 2) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

function generatePrimesInRange(start, end) {
  const primes = [];
  for (let i = start; i <= end; i++) {
    const startTime = performance.now();
    if (isPrime(i)) {
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      primes.push({num:i,isPrime:true,timeTaken});
    } else {
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      primes.push({num:i,isPrime:false,timeTaken});
    }
  }
  return primes;
}


function addRow(number, isPrime, timeTaken) {
  const tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  const newRow = tableBody.insertRow();

  const numberCell = newRow.insertCell(0);
  const isPrimeCell = newRow.insertCell(1);
  const timeTakenCell = newRow.insertCell(2);

  numberCell.textContent = number;
  isPrimeCell.textContent = isPrime ? 'Prime' : 'Normal';
  timeTakenCell.textContent = timeTaken.toFixed(4) + "ms";
}
function addRow2(number, isPrime, timeTaken) {
  const tableBody = document.getElementById('pop-up-table1').getElementsByTagName('tbody')[0];
  const newRow = tableBody.insertRow();

  const numberCell = newRow.insertCell(0);
  const isPrimeCell = newRow.insertCell(1);
  const timeTakenCell = newRow.insertCell(2);

  numberCell.textContent = number;
  isPrimeCell.textContent = isPrime ? 'Prime' : 'Normal';
  timeTakenCell.textContent = timeTaken.toFixed(4) + "ms";
}
function addRow3(number, timeTaken) {
  const tableBody = document.getElementById('pop-up-table2').getElementsByTagName('tbody')[0];
  const newRow = tableBody.insertRow();

  const numberCell = newRow.insertCell(0);
  const timeTakenCell = newRow.insertCell(1);

  numberCell.textContent = number;
  timeTakenCell.textContent = timeTaken.toFixed(4) + "ms";
}




  function calculatePrime(){

    let primesInRange =[]
    const start = parseInt(document.getElementById('start').value);
    const end = parseInt(document.getElementById('end').value);
  
  
    primesInRange = generatePrimesInRange(start, end);
     // time Complexity  m = end-start O(m*sqrt(end))
     // space Complexity O(p) p = length of primes array 

     primesInRange.forEach(entry => {
      addRow(entry.num, entry.isPrime, entry.timeTaken);
    });
     primesInRange.forEach(entry => {
      addRow2(entry.num, entry.isPrime, entry.timeTaken);
    });
     primesInRange.filter((pr)=> pr.isPrime ).forEach(entry => {
      addRow3(entry.num, entry.timeTaken);
    });
  
    console.log(primesInRange);
    primesInRange = []
  }

  document.getElementById('showDetails').addEventListener('click', function() {
    document.getElementById('popup-container').style.display = 'flex';
  });

  document.getElementById('close-popup-btn').addEventListener('click', function() {
    document.getElementById('popup-container').style.display = 'none';
  });



  