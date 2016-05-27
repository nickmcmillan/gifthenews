
export default function stripHTML(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent.trim() || tmp.innerText.trim() || "";
}
