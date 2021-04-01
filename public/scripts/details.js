// details controls
var title = document.getElementById("title");
var image = document.getElementById("image");
var desc = document.getElementById("description");
var time = document.getElementById("spanTime");

// edit form controls
var editBtn = document.getElementById("editBtn");
var editScreen = document.getElementById("editScreen");
var closeEditScreen = document.getElementById("closeEditScreen");
var form = document.getElementById("formcreate");
var editTitle = document.getElementById("editTitle");
var editDesctiption = document.getElementById("editDesctiption");

var id = location.href.split("allimages/")[1];
var imageData;

// getting data from api with id
window.onload = () => {
  fetch(`/api/v1/allimages/${id}`)
    .then((response) => response.json())
    .then((data) => {
      showInPage(data[0]);
      imageData = data[0];
    });
};

// showing details on page
function showInPage(data) {
  var date = new Date(data.time);

  title.textContent = data.title;
  image.src = data.path;
  desc.textContent = data.description;
  var monthString = date.toLocaleString("default", {
    month: "short",
  });
  time.textContent = `${monthString} ${date.getDate()}, ${date.getUTCFullYear()}`;
  form.action = `/allimages/${data.id}`;
}

// form open close buttons
editBtn.onclick = () => {
  editScreen.style.display = "block";
  editTitle.value = imageData.title;
  editDesctiption.value = imageData.description;
};

closeEditScreen.onclick = () => {
  editScreen.style.display = "none";
};
