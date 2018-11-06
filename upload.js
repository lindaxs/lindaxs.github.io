// https://codepen.io/ianaya89/pen/JoRNyK/

// const url = 'process.php';
// const form = document.querySelector('form');

// form.addEventListener('submit', e => {
//     e.preventDefault();

//     const files = document.querySelector('[type=file]').files;
//     const formData = new FormData();

//     for (let i = 0; i < files.length; i++) {
//         let file = files[i];

//         formData.append('files[]', file);
//     }

//     fetch(url, {
//         method: 'POST',
//         body: formData
//     }).then(response => {
//         console.log(response);
//     });
// });
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 200,
    height : 200
  });

  function makeCode () {    
    var elText = document.getElementById("text");
    
    if (!elText.value) {
      alert("Input a text");
      elText.focus();
      return;
    }
    
    qrcode.makeCode(elText.value);
  }

  makeCode();

  $("#text").
    on("blur", function () {
      makeCode();
    }).
    on("keydown", function (e) {
      if (e.keyCode == 13) {
        makeCode();
      }
    });

button = document.getElementById('btnDownload');

function generatePDF(){

  var drawing = qrcode._oDrawing;
  var img = drawing._elImage;
  var imgData = drawing._elCanvas.toDataURL('image/jpeg');

  var doc = new jsPDF('l');

  doc.setFontSize(14);
  doc.text(20, 20, 'content.value');
  doc.addImage(imgData, 'JPEG', 15, 15, 50, 50);
  doc.save('sketchbook.pdf');
}

button.addEventListener('click', generatePDF);
