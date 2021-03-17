export function checkForName (formText) {
  const res = formText.match
  function checkForName (inputText) {
    console.log('::: Running checkForName :::', inputText)
    let names = ['Picard', 'Janeway', 'Kirk', 'Archer', 'Georgiou']

    if (names.includes(inputText)) {
      alert('Welcome, Captain!')
    }
  }
}
