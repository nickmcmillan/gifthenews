// do it using regex, not createElement (below), otherwise it renders dom elements and those can cause unwanted network requests
export default function stripHTML(html) {
  if (html) {
    return html.replace(/<(?:.|\n)*?>/gm, '').trim();
  }
}


//
// export default function stripHTML(html) {
//    var tmp = document.createElement("DIV");
//    tmp.innerHTML = html;
//    return tmp.textContent.trim() || tmp.innerText.trim() || "";
// }
