console.log('hello from extension')

const preEls = document.querySelectorAll('pre');

[...preEls].forEach(preEl =>{

    const root = document.createElement('div')
    const shadowRoot = root.attachShadow({mode: 'open'});

    const cssUrl = chrome.runtime.getURL('content-script.css');

    shadowRoot.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>`

    root.style.position = "relative";

    const button = document.createElement('button');
    button.innerText = "Copy";
    button.type = "button";

    shadowRoot.prepend(button);
    // preEl.prepend(button);

    preEl.prepend(root);

    const codeEl = preEl.querySelector("code");

    button.addEventListener('click', ()=>{
        //codeEl.innerText
        navigator.clipboard.writeText(codeEl.innerText);
    })
})
