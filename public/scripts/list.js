function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}

// var elements = document.querySelectorAll('.list-card');
// for (var i = 0; i < elements.length; i++){
// 	multiplyNode(elements[i], 12, true);
// }

function changeCardLayout() {
    var elements = document.getElementsByClassName("list-card-group");
    for (var i = 0; i < elements.length; i++) {
        if (window.innerWidth >= 1600)
            elements[i].style.gridTemplateColumns = "repeat(6, 1fr)";
        else if (window.innerWidth >= 1350)
            elements[i].style.gridTemplateColumns = "repeat(4, 1fr)";
        else if (window.innerWidth >= 1050)
            elements[i].style.gridTemplateColumns = "repeat(3, 1fr)";
        else if (window.innerWidth >= 850)
            elements[i].style.gridTemplateColumns = "repeat(2, 1fr)";
        else if (window.innerWidth >= 640)
            elements[i].style.gridTemplateColumns = "repeat(2, 1fr)";
        else
            elements[i].style.gridTemplateColumns = "repeat(1, 1fr)";
    }
}

window.addEventListener('resize', changeCardLayout);
document.addEventListener("DOMContentLoaded", changeCardLayout);
