var outputCreate, selectInvite, token, div, closeBtn, offsetLeft, offsetTop, 
html = `
    <div id="mainWindow">
        <div id="header">
            <div id="closeBtn" aria-label="Dismiss" role="button" tabindex="0">
                <svg aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                </svg>
            </div>
            discord friend link
        </div>
        <div class="toDisable">
            <div class="dividing">
                <p class="sectionTitle">
                    Create Invite
                </p>
                <button class="sectionButton" id="runCreate">Do It</button>
            </div>
        
            <div class="dividing">
                <p class="sectionTitle">
                    View Invite
                </p>
                <select name="Select Invite" id="selectInvite">
                </select>
                <button class="sectionButton" id="runInfo">View Info</button>
            </div>
        </div>
        <div onClick="this.select();" disabled type="text" class="textOutput" id="outputCreate">
            <b style="margin-top: 5px; margin-bottom:5px; display: block;">Welcome!</b>
        </div>
        <div class="toDisable" id="reappear">
            <button style="margin-left: 32%; margin-top: 10px;" class="sectionButton" id="runDelete">Delete All Invites</button>
        </div>
        <a href="https://github.com/robinhirst11/discordfriend" target="_blank">
        </a>
    </div>`,
css = `
    #mainWindow {
        position: absolute;
        z-index: 9;
        background-color:  #2F3136;
        border: 1px solid #3f4147;
        color: white;
        text-align: center;
        height: 270px;
        width: 400px;
        z-index: 1000;
        border-radius: 12px;
        font-family: var(--font-primary);
    }

    #reappear{
        display: none;
    }

    #closeBtn{
        width: 30px;
        cursor: pointer !important;
        float:right;
    }

    .toDisable{
        opacity:0.4;
        pointer-events: none;
    }

    #header {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #5865f2;
        color: #ffe8e9;
        user-select: none;
        font-weight: bold;
        border-top-left-radius:12px;
        border-top-right-radius: 12px;
    }
    
    .dividing {
        background-color: #2F3136;
        width: 100%;
        height: 50px;
        text-align: left;
        vertical-align: middle;
        white-space: nowrap;
        line-height: 50px;
    }
    
    .sectionTitle {
        vertical-align: middle;
        margin: 0px;
        font-size: 18px;
        margin-left: 15px;
    }
    
    .sectionButton {
        vertical-align: middle;
        margin-top: auto;
        margin-bottom: auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background: none;
        border: none;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        padding: 2px 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        transition: background-color 170ms ease,color 170ms ease;
        color: var(--white-500);
        background-color: var(--button-secondary-background);
        width: var(--custom-button-button-sm-width);
        height: var(--custom-button-button-sm-height);
        min-width: var(--custom-button-button-sm-width);
        min-height: var(--custom-button-button-sm-height);
        width: auto !important;
    }

    .sectionButton:hover{
        background-color: var(--button-secondary-background-hover);
        color: var(--white-500);
    }

    .dividing * {
        display: inline;
    }
    
    .textOutput {
        max-width: 93%;
        min-height: 16px;
        cursor: text;
        margin-left: 10px;
        user-select: all;
        padding: 3px;
        text-align: center;
        margin-left: 10px;
        background-color: #1e1f22;
    }`;

async function inject() {
  let e = document.createElement("div");
  e.innerHTML = html;
  e.innerHTML += `\n\n<style>${css}</style>`;
  document.body.appendChild(e);
  (div = document.getElementById("mainWindow")).style.top = "100px";
  div.style.left = "100px";
  window.addEventListener("mousemove", divMove, !0);
  document.getElementById("header").addEventListener("mousedown", mouseDown, !1);
  window.addEventListener("mouseup", mouseUp, !1);
  document.getElementById("runCreate").addEventListener("click", createElement);
  document.getElementById("runInfo").addEventListener("click", checkTheInfo);
  document.getElementById("runDelete").addEventListener("click", deleteInvites);
  closeBtn = document.getElementById("closeBtn");
  outputCreate = document.getElementById("outputCreate");
  selectInvite = document.getElementById("selectInvite");
  closeBtn.addEventListener("click", uninject);
  token = await getToken();
  console.log("Got token!");
  document.querySelector("#reappear").style = "display:block;";
  document.querySelectorAll(".toDisable").forEach((e) => {
    e.style.opacity = "1";
    e.style.pointerEvents = "auto";
  });
  outputCreate.innerHTML = '<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Welcome!</b>';
  fetchInvites(!1);
}

async function createElement() {
  outputCreate.innerHTML = '<b style="margin-top: 5px;display: block;">Loading . . .</b>';
  let e = await fetch("https://discord.com/api/v9/users/@me/invites", {
    credentials: "include",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0",
      Accept: "*/*",
      "Accept-Language": "en,sk;q=0.8,cs;q=0.5,en-US;q=0.3",
      "Content-Type": "application/json",
      Authorization: token,
      "X-Discord-Locale": "en-US",
      "X-Debug-Options": "bugReporterEnabled",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "Sec-GPC": "1",
    },
    referrer: "https://discord.com/channels/@me",
    body: "{}",
    method: "POST",
    mode: "cors",
  }),
  t = await e.json();
  console.log(t);
  outputCreate.innerHTML = `<b style="margin-top: 5px; margin-bottom: 5px; display: block;">https://discord.gg/${t.code}</b>`;
  if ("No Invites" == selectInvite.firstChild.innerText) {
    selectInvite.innerHTML = "";
  }
  let n = document.createElement("option");
  n.value = t.code;
  n.innerText = `discord.gg/${t.code}`;
  selectInvite.appendChild(n);
}

async function fetchInvites(e) {
  let t = await fetch("https://discord.com/api/v9/users/@me/invites", {
    credentials: "include",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0",
      Accept: "*/*",
      "Accept-Language": "en,sk;q=0.8,cs;q=0.5,en-US;q=0.3",
      "Content-Type": "application/json",
      Authorization: token,
      "X-Discord-Locale": "en-US",
      "X-Debug-Options": "bugReporterEnabled",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "Sec-GPC": "1",
    },
    referrer: "https://discord.com/channels/@me",
    method: "GET",
    mode: "cors",
  }),
  n = await t.json();
  if (selectInvite.innerHTML = "", 0 == n.length) {
    let e = document.createElement("option");
    return e.value = "none", e.innerText = "No Invites", selectInvite.appendChild(e), n;
  }
  for (let e = 0; e < n.length; e++) {
    let t = document.createElement("option");
    t.value = n[e].code;
    t.innerText = `discord.gg/${n[e].code}`;
    selectInvite.appendChild(t);
  }
  if (1 == e) return n;
}

async function checkTheInfo() {
  let e = selectInvite.value;
  outputCreate.innerHTML = '<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Loading . . .</b>';
  let t,
  n = await fetchInvites(!0);
  for (let o = 0; o < n.length; o++) n[o].code == e && (t = n[o]);
  outputCreate.innerHTML = t
    ? `<b>Uses:</b> ${t.uses}/${t.max_uses}, <b>Expires in:</b> ${Math.round(
        t.max_age / 60 / 60
      )} hours,</br> <i>https://discord.gg/${t.code}</i>`
    : "Invite not found!";
}

async function deleteInvites() {
  await fetch("https://discord.com/api/v9/users/@me/invites", {
    credentials: "include",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0",
      Accept: "*/*",
      "Accept-Language": "en,sk;q=0.8,cs;q=0.5,en-US;q=0.3",
      "Content-Type": "application/json",
      Authorization: token,
      "X-Discord-Locale": "en-US",
      "X-Debug-Options": "bugReporterEnabled",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "Sec-GPC": "1",
    },
    referrer: "https://discord.com/channels/@me",
    method: "DELETE",
    mode: "cors",
  });
  selectInvite.innerHTML = "";
  let e = document.createElement("option");
  e.value = "none";
  e.innerText = "No Invites";
  selectInvite.appendChild(e);
  outputCreate.innerHTML = '<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Invites deleted</b>';
}

"complete" === document.readyState && inject();
var clicked = !1;
async function mouseUp() {
  clicked = !1;
}
async function mouseDown(e) {
  clicked = !0;
  offsetLeft = div.offsetLeft - e.clientX;
  offsetTop = div.offsetTop - e.clientY;
}
function divMove(e) {
  clicked &&
    ((div.style.position = "absolute"),
    (div.style.top = e.clientY + offsetTop + "px"),
    (div.style.left = e.clientX + offsetLeft + "px"));
}
async function getToken() {
  return new Promise((function (e) {
    outputCreate.innerHTML =
      '<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Getting token...</b><p>Please, switch to a random channel on Discord to obtain token!</p>';
    outputCreate.innerHTML =
      '<div style="margin-top: 10px; margin-bottom: 10px;"><b>Getting token...</b></br> <i>Please, switch to a random channel on Discord to obtain token!</i></div>';
    window.__request = window.XMLHttpRequest;
    window.XMLHttpRequest = class extends window.__request {
      constructor() {
        super(...arguments);
        this._reqHead = this.setRequestHeader;
        this.setRequestHeader = function (t, n) {
          this._reqHead(t, n);
          "Authorization" === t && (window.XMLHttpRequest = window.__request, e(n));
        }.bind(this);
      }
    };
  }));
}
async function uninject() {
  window.XMLHttpRequest = window.__request;
  window.removeEventListener("mousemove");
  document.getElementById("header").removeEventListener("mousedown");
  window.removeEventListener("mouseup");
  document.getElementById("mainWindow").remove();
  inject = null;
  createElement = null;
  inject = null;
  fetchInvites = null;
  checkTheInfo = null;
  deleteInvites = null;
  removeEventListener("mouseMove", window);
  console.log("Goodbye!");
}
console.log("Hello!");
