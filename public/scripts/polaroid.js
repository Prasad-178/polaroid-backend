function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
      copy = node.cloneNode(deep);
      node.parentNode.insertBefore(copy, node);
    }
  }
  console.log(window.innerWidth)
  
  // multiplyNode(document.querySelector('.grid-img-container2'), 12, true);
  // multiplyNode(document.querySelector('.grid-img-container3'), 12, true);
  
  // multiplyNode(document.querySelector('.grid-img-container1'), 6, true);
  
  // multiplyNode(document.querySelector('.element-container'), 3, true);
  
  function changeGridLayout() {
    var items = document.getElementsByClassName('grid-container');
  
    for (let i = 0; i < items.length; i++) {
      if (window.innerWidth >= 1600)
        items[i].style.gridTemplateColumns = "repeat(12, 1fr)";
      else if (window.innerWidth >= 1100)
        items[i].style.gridTemplateColumns = "repeat(6, 1fr)";
      else if (window.innerWidth >= 600)
        items[i].style.gridTemplateColumns = "repeat(3, 1fr)";
      else
        items[i].style.gridTemplateColumns = "repeat(1, 1fr)";
    }
  
    if (window.innerWidth >= 1500)
      document.getElementById('header-list').style.gridTemplateColumns = "repeat(6, 1fr)";
    else if (window.innerWidth >= 600)
      document.getElementById('header-list').style.gridTemplateColumns = "repeat(3, 1fr)";
    else
      document.getElementById('header-list').style.gridTemplateColumns = "repeat(1, 1fr)";
  }
  
  
  window.addEventListener('resize', changeGridLayout);
  
  document.addEventListener("DOMContentLoaded", changeGridLayout);