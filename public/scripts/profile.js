function changeGridLayout() {
  var elements = document.getElementsByClassName('grid-container');
  console.log(elements);
  for (var i = 0; i < elements.length; i++) {
    if (window.innerWidth >= 1860)
      elements[i].style.gridTemplateColumns = "repeat(7, 1fr)";
    else if (window.innerWidth >= 1596)
      elements[i].style.gridTemplateColumns = "repeat(6, 1fr)";
    else if (window.innerWidth >= 1330)
      elements[i].style.gridTemplateColumns = "repeat(5, 1fr)";
    else if (window.innerWidth >= 1550)
      elements[i].style.gridTemplateColumns = "repeat(4, 1fr)";
    else if (window.innerWidth >= 790)
      elements[i].style.gridTemplateColumns = "repeat(3, 1fr)";
    else if (window.innerWidth >= 518)
      elements[i].style.gridTemplateColumns = "repeat(2, 1fr)";
    else
      elements[i].style.gridTemplateColumns = "repeat(1, 1fr)";
  }
}

window.addEventListener('resize', changeGridLayout);

document.addEventListener("DOMContentLoaded", changeGridLayout);
