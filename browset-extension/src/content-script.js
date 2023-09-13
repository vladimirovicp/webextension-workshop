//console.log('hello from extension')

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
        navigator.clipboard.writeText(codeEl.innerText).then(()=>{
            notify();
        });
    })
})

// chrome.runtime.onMessage.addListener((req, ...other) =>{
//     console.log(req, ...other);
// });
chrome.runtime.onMessage.addListener((req, info, cb) =>{
    if( req.action === "copy-all"){
        const allCode = getAllCode();

        navigator.clipboard.writeText(allCode).then(()=>{
            notify();
            cb(allCode);
        });

        return true;


    }
});

function getAllCode(){
    return [...preEls].map((preEl) => {
        return preEl.querySelector('code').innerText
    }).join("");
}

function notify(){
    const scriptEl = document.createElement("script");
    scriptEl.src = chrome.runtime.getURL('execute.js');
    document.body.appendChild(scriptEl);

    scriptEl.onload = () =>{
        scriptEl.remove();
    }
}
