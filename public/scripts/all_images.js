var container = document.getElementById("tablecontainer");

window.onload = () => {
  fetch("/api/v1/allimages")
    .then((response) => response.json())
    .then((data) => populate(data));
};

function populate(data) {
  data.map((one) => {
    var newNode = document.createElement("li");
    newNode.className = "image";
    var title = document.createElement("a");
    title.href = `/allimages/${one.id}`;
    title.className = "title";
    title.textContent = one.title;

    var del = document.createElement("a");
    del.classList.add("delBtn");
    del.href = `/allimages/${one.id}/delete`;
    var delBtn = document.createElement("i");
    delBtn.classList.add("far", "fa-trash-alt");
    del.appendChild(delBtn);

    newNode.appendChild(title);
    newNode.appendChild(del);

    container.appendChild(newNode);
  });
}
