function multiplyNode(node) {
  copy = node.cloneNode(true);
  return copy;
}

function createList() {
  generateList();
}

function generateList() {
  var list_template = document.querySelector('.element-container');
  var new_list = multiplyNode(list_template);

  var new_list_name = document.getElementById('new-list-name').value;
  var new_list_desc = document.getElementById('new-list-description').value;

  // console.log(new_list_name);
  // console.log(new_list_desc);

  new_list.querySelector('.mylist-name').innerHTML = new_list_name;
  new_list.querySelector('.list-desc').innerHTML = new_list_desc;
  new_list.querySelector('.list-date').innerHTML = setDate();



  list_template.parentNode.insertBefore(new_list, list_template);
}

function setDate() {
  var now = new Date()

  var year = now.getFullYear();
  var month = now.getMonth() + 1;   // As months start with 0
  var date = now.getDate();

  if (month < 10)
    month = '0' + month;

  if (date < 10)
    date = '0' + date;

  var formattedNow = date + '-' + month + '-' + year;

  return formattedNow;
}
