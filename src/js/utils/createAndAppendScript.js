export default function createAndAppendScript(id, content) {
  const script = document.createElement('script');
  script.setAttribute('id', id);
  script.textContent = content;
  document.head.appendChild(script);
}
