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

// V ID V
//public EZAqV4CqWc-LL8P3J
//service_id service_pguo61h
//template_id template_qxn2anj

// V POBIERANIE V
//emailjs.init("EZAqV4CqWc-LL8P3J");

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

/*
function wyslij() {
  console.log("klik działa");

  const email = document.getElementById("email").value;
  const foczka = document.getElementById("foczka");
  let imie = document.getElementById("imie").value.trim();
  imie = toASCII(imie);
  if (!imie) imie = "foczka";

  html2canvas(foczka, {
    backgroundColor: "#d9f2ff",
  }).then(canvas => {

    const cropped = cropCanvas(canvas);
    const base64 = cropped.toDataURL("image/jpeg", 0.75);

    //1. Zapis na komputer
    const link = document.createElement("a");
    link.download = `foczka_${imie}.png`;
    link.href = base64;
    link.click();

    //2. Wysyłanie maila
    emailjs.send("service_pguo61h", "template_qxn2anj", {
      image: base64,
      name: imie,
      email: email
    })
    .then(() => {
      alert("Wysłano foczkę!");
      
    })
    .catch(err => {
      console.error("EMAIL ERROR:", err);
      alert("Błąd wysyłania");
    });

  });
}
*/

/*
function wyslij() {
  const file = document.getElementsByName("screen")[0].files[0];

  const reader = new FileReader();

  reader.onload = function () {
    const base64 = reader.result;

    emailjs.send("service_pguo61h", "template_qxn2anj", {
      image: base64,
      name: imie
    })
    .then(() => {
      alert(`Wysłano!`);
    })
    .catch(err => {
      console.error(err);
    });
  };

  reader.readAsDataURL(file);
}
*/
// ======================================================



// ================== VVV ODŚWIEŻ VVV ==================
window.onload = function() {
    document.querySelectorAll("form").forEach(form => form.reset());
    document.getElementById("tekstInput").value = "";
    this.document.querySelectorAll("input[class='checked']").forEach(input => input.checked = true);
    document.getElementById("tekstRender").hidden = true;
};
// =====================================================