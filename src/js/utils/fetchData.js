function fetchData(api, successCb, failedCb = () => console.error(error.message)) {
  fetch(api).then((response) => response.json()).then(successCb).catch(failedCb);
}

export default fetchData;
