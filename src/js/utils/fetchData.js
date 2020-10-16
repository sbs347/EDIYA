function fetchData(
  api,
  successCb,
  failedCb = () => console.error(error.message),
  methodType = 'json'
) {
  fetch(api).then((response) => response[methodType]()).then(successCb).catch(failedCb);
}

export function fetchDataText(api, successCb, failedCb) {
  fetchData(api, successCb, failedCb, 'text');
}

export default fetchData;
