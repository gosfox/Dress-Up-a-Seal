// =================== VVV BOCZNY VVV ===================
function toggleSekcja(formId, index, nazwa) {
    const form = document.getElementById(formId);
    const h3 = document.getElementsByTagName("h3")[index];

    form.hidden = !form.hidden;
    h3.innerHTML = `${nazwa} ${form.hidden ? '&#8964;' : '&#8963;'}`;
}
// ======================================================



// =================== VVV TOGGLE VVV ===================
// V BAZA V
function bazaUstaw(n){
    const pliki = [
        "Img/Baza/biala.png",
        "Img/Baza/szara.png",
        "Img/Baza/ciemnoszara.png",
        "Img/Baza/czarna.png"
    ];

    document.getElementById("baza").src = pliki[n];
}


// V RESZTA V
function initToggle(name, type, className = null, extra = null){
    const inputs = document.querySelectorAll(`input[name='${name}']`);

    inputs.forEach(input => {
        input.addEventListener("change", function(){

            //CHECKBOX
            if(type === "checkbox"){
                const img = document.getElementById(this.value);
                if(img) img.hidden = !this.checked;
            }

            //RADIO
            if(type === "radio"){
                document.querySelectorAll(`.${className}`)
                    .forEach(img => img.hidden = true);

                if(this.value !== "brak"){
                    const img = document.getElementById(this.value);
                    if(img) img.hidden = false;
                }
            }

            //DYMEK
            if(extra === "dymek"){
                const inputBox = document.getElementById("tekstInput");
                const dymek = document.getElementById("dymek");

                inputBox.hidden = dymek.hidden;

            }

        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    initToggle("akcesOpt", "checkbox");
    initToggle("efektOpt", "checkbox", null, "dymek");
    initToggle("czapkaOpt", "radio", "czapka");
    initToggle("czapka2Opt", "radio", "czapka2");
    initToggle("lewaPlOpt", "radio", "pletwal");
    initToggle("prawaPlOpt", "radio", "pletwap");

});
// ======================================================



// ==================== VVV MAIL VVV ====================
// V USUNIĘCIE POLSKICH ZNAKÓW V
function toASCII(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .replace(/[^\x00-\x7F]/g, "");
}

// V POBIERANIE V

function wyslij(){
  console.log("klik działa");

  document.getElementById("tekstRender").hidden = false;

  const input = document.getElementById("tekstInput");
  const render = document.getElementById("tekstRender");

  input.style.display = "none";
  render.style.display = "block";

  render.innerText = input.value;

  const email = document.getElementById("email").value;
  const foczka = document.getElementById("foczka");
  let imie = document.getElementById("imie").value.trim();
  imie = toASCII(imie);
  if (!imie) imie = "foczka";

  html2canvas(foczka, {
    backgroundColor: null,
    scale: 2
  }).then(canvas => {

    const base64 = canvas.toDataURL("image/png", 0.75)
    const link = document.createElement("a");
    link.download = `${imie}_${email}.png`;
    link.href = base64;
    link.click();

    input.style.display = "block";
    render.style.display = "none";
    document.getElementById("tekstRender").hidden = true;

    //reload
    location.reload();

  });
}
// ======================================================



// ================== VVV ODŚWIEŻ VVV ==================
window.onload = function() {
    document.querySelectorAll("form").forEach(form => form.reset());
    document.getElementById("tekstInput").value = "";
    this.document.querySelectorAll("input[class='checked']").forEach(input => input.checked = true);
    document.getElementById("tekstRender").hidden = true;
};
// =====================================================
