// Replace checkForName with a function that checks the URL
import { checkValidUrl } from './urlChecker';
const serverURL = 'http://localhost:8085/add-url';

function handleSubmitAction(event) {
  event.preventDefault();
  // Get the URL from the input field
  const urlInput = document.getElementById('url').value;
  // Check if the URL is valid
  if (checkValidUrl(urlInput)) {
    getArticleInforData(serverURL, urlInput)
    .then((response) => {
      updateDynamicUI(response)
    })
  } else {
    showError('Please enter valid url!')
  }
}

const showError = (errorMessage = '') => {
  const errorElement = document.getElementById('error');
  var text = errorMessage !== '' ? document.createTextNode(errorMessage) : document.createTextNode('');
  errorElement.appendChild(text);
}

const getArticleInforData = async (serverURL = '', urlInput = '') => {
  const bodyParam = {
    urlInput: urlInput
  }
  const parameter = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyParam)
  };
  
  const resData = await fetch(serverURL, parameter)
  try {
    const articleInforData = await resData.json();
    console.log('Data received:', articleInforData)
    return articleInforData;
  } catch (error) {
    console.log('error', error);
    showError(error)
  }
}

const updateDynamicUI = async (response = {}) => {
  document.getElementById('score-tag').innerHTML = `Score Tag: ${response.score_tag}`;
  document.getElementById('agreement').innerHTML = `Agreement: ${response.agreement}`;
  document.getElementById('subjectivity').innerHTML = `Subjectivity: ${response.subjectivity}`;
  document.getElementById('confidence').innerHTML = `Confidence: ${response.confidence}`;
  document.getElementById('irony').innerHTML = `Irony: ${response.irony}`;
};
// Export the handleSubmit function
export { handleSubmitAction };

