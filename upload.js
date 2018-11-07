// https://codepen.io/ianaya89/pen/JoRNyK/
// https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename

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
// scene = document.getElementById('scene');
var scene;

function generatePDF(){

  var drawing = qrcode._oDrawing;
  var img = drawing._elImage;
  var imgData = drawing._elCanvas.toDataURL('image/jpeg');

  var doc = new jsPDF('l');

  if (scene) {
    // console.log(sceneData);
    doc.addImage(scene, 'JPEG', 15, 15, 265, 150);
    doc.addPage();
  }

  doc.addImage(imgData, 'JPEG', 20, 20, 50, 50);
  doc.save('sketchbook.pdf');

}

function encodeImageFileAsURL(cb) {
    return function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            cb(reader.result);
            image = document.getElementById("scene");
            image.src = reader.result;
            var myCanvas = convertImageToCanvas(image);
            scene = myCanvas.toDataURL("image/jpeg");
        }
        reader.readAsDataURL(file);
    }
}

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  return canvas;
}

$('#inputFileToLoad').change(encodeImageFileAsURL(function(base64Img) {
  $('#scene')
    .find('img')
      .attr('src', base64Img);
}));

button.addEventListener('click', generatePDF);
