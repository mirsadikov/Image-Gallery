var container = document.getElementById("tablecontainer");

// get data from api on window load
window.onload = () => {
  fetch("/api/v1/allimages")
    .then((response) => response.json())
    .then((data) => populate(data));
};

// show data in table list
function populate(data) {
  data.map((one) => {
    //     +----------------------------------------------+
    //     |    image   |  title               |  delete  |
    //     +----------------------------------------------+
    var newNode = document.createElement("li");
    newNode.className = "image";
    var titleContainer = document.createElement("a");
    titleContainer.href = `/allimages/${one.id}`;
    var titleImage = document.createElement("img");
    titleImage.src = one.path;
    titleImage.id = "titleImage";
    var title = document.createElement("p");
    title.id = "title";
    title.textContent = one.title;
    titleContainer.appendChild(titleImage);
    titleContainer.appendChild(title);

    var del = document.createElement("a");
    del.classList.add("delBtn");
    del.href = `/allimages/${one.id}/delete`;
    var delBtn = document.createElement("i");
    delBtn.classList.add("far", "fa-trash-alt");
    del.appendChild(delBtn);

    newNode.appendChild(titleContainer);
    newNode.appendChild(del);

    container.appendChild(newNode);
  });
}
