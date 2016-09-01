$(document).ready(function() {
  $('.todo-form').submit(function(e) {
    e.preventDefault();
    var itemVal = $('#item').val();
    var userId = $('#todo-list').attr('user-id');

    $.ajax({
      url:'/todo',
      type: 'POST',
      dataType: 'JSON',
      data: {
        userId: userId,
        item: itemVal
      }
    }).done(function(item) {
      console.log(item);
      $('#todo-list').prepend(`<li userId="${item._id}">${item.item}</li>`);
    })
    $('#item').val('');
  });

  function getItems() {
    var userId = $('#todo-list').attr('user-id');
    var todoList = $('#todo-list')

    $.ajax({
      url: `/todo/${userId}`,
      type: 'GET',
      dataType: 'JSON',
    }).done(function(items) {
      items.reverse().map(item => {
        $('#todo-list').append(`<li userId="${item._id}">${item.item}</li>`)
      })
      console.log(items);
    })
  }

  getItems();

})
