const domainName = 'http://localhost:3000/sort';

const form = document.querySelector('form');

async function formSubmitHandler(event) {
    event.preventDefault();
    const source = form.children[0].value;
    const destination = form.children[1].value;
    const template = form.children[2];
    if (source && destination) {
        const url = `${domainName}/${source}/${destination}`;
        const response = await sendRequest(url);
        if (!response.error) return template.innerHTML = `Total Files: ${response.totalFiles}, Copied Files: ${response.copiedFiles}`;
        template.innerHTML = response.error;
    }
}

async function sendRequest(url) {
    const response = await fetch(url);
    return await response.json();
}

form.addEventListener('submit', formSubmitHandler);