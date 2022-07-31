const myImg = document.getElementById("photo")
const inputSubmit = document.getElementById("put")

myImg.onchange = function(event) {
    var target = event.target;

    if (!FileReader) {
        alert('FileReader не поддерживается — облом');
        return;
    }

    if (!target.files.length) {
        alert('Ничего не загружено');
        return;
    }

    var fileReader = new FileReader();
    fileReader.onload = function() {
        img1.src = fileReader.result;
    }

    fileReader.readAsDataURL(target.files[0]);


}

function fileCreate(){

    $.ajax({
        method: 'POST',
        url: 'http://localhost:5001/drive/createFile',
        crossDomain: true,
        success: (response) =>{
            $("#img1").attr("src",`${response}`);
        },
        error: (response) => {
           alert(response.responseJSON.error)
        }
    })
}

inputSubmit.addEventListener("click",fileCreate,false)
