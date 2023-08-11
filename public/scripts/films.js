function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
      copy = node.cloneNode(deep);
      node.parentNode.insertBefore(copy, node);
    }
  }
  
  // multiplyNode(document.querySelector('.grid-img-container'), 84, true);
  
  
  function changeGridLayout() {
    var checkbox = document.getElementById('grid-checkbox');
    console.log(checkbox);
    if (checkbox.checked == true) {
      if (window.innerWidth >= 1600)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(10, 1fr)";
      else if (window.innerWidth >= 1350)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(8, 1fr)";
      else if (window.innerWidth >= 1100)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(6, 1fr)";
      else if (window.innerWidth >= 850)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(4, 1fr)";
      else if (window.innerWidth >= 600)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(2, 1fr)";
      else
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(1, 1fr)";
    }
    else {
      if (window.innerWidth >= 1600)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(12, 1fr)";
      else if (window.innerWidth >= 1350)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(10, 1fr)";
      else if (window.innerWidth >= 1100)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(8, 1fr)";
      else if (window.innerWidth >= 850)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(6, 1fr)";
      else if (window.innerWidth >= 600)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(4, 1fr)";
      else if (window.innerWidth >= 450)
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(2, 1fr)";
      else
        document.getElementById('grid-container').style.gridTemplateColumns = "repeat(1, 1fr)";
    }
  }
  
  window.addEventListener('resize', changeGridLayout);
  
  document.addEventListener("DOMContentLoaded", changeGridLayout);