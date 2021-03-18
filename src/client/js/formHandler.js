const { response } = require('express')

async function handleSubmit (event) {
  event.preventDefault()

  let formUrl = document.getElementById('urlInput').value

  const errorMessage = document.getElementById('errorMessage')

  // check what text was put into the form field
  if (checkForUrl(formUrl)) {
    //POST request to server using fetch() method

    fetch('http://localhost:8081/article', {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ formUrl })
    })
      //Converting to JSON
      .then(res => res.json())

      //Updating UI  and displaying results to console
      .then(res => {
        updateUI(res)
      })
  } else {
    alert('The URL you have entered is invalid. Please enter a valid URL.')
  }
  console.log('::: Form Submitted :::')
}

//GET function - get data required from result given by MeaningCloud API
async function updateUI (res) {
  document.querySelector('#subjectivity').innerText =
    'Subjectivity ' + res.subjectivity

  document.querySelector('#confidence').innerText =
    'Confidence' + res.confidence + '%'

  document.querySelector(
    '#polarity'
  ).innerText = `Polarity: ${PolarityCheckerResults(res.score_tag)}`
}

//API  response output (https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response)
export const PolarityCheckerReults = score_tag => {
  if (score_tag === 'P+' || score_tag === 'P') {
    return 'Positive'
  } else if (score_tag === 'N+' || score_tag === 'N') {
    return 'Negative'
  } else if (score_tag === 'NEU') {
    return 'Neutral'
  } else {
    return 'No sentiment expressed.'
  }
}

export { handleSubmit }
