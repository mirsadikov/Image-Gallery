var title = document.getElementById("title");
var image = document.getElementById("image");
var desc = document.getElementById("description");
var time = document.getElementById("spanTime");

var editBtn = document.getElementById("editBtn");
var editScreen = document.getElementById("editScreen");
var closeEditScreen = document.getElementById("closeEditScreen");

var id = location.href.split("allimages/")[1];

window.onload = () => {
  fetch(`/api/v1/allimages/${id}`)
    .then((response) => response.json())
    .then((data) => showInPage(data[0]));
};

function showInPage(data) {
  var date = new Date(data.time);

  title.textContent = data.title;
  image.src = data.path;
  desc.textContent = data.description;
  time.textContent = `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getDate()}, ${date.getUTCFullYear()}`;
}

editBtn.onclick = () => {
  editScreen.style.display = "block";
};

closeEditScreen.onclick = () => {
  editScreen.style.display = "none";
};
