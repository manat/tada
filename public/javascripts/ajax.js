$(document).ready(function() {
  ajax('GET');

  var form = $('#form');
  form.submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function (data) {
        console.log(data);
        var ul = $('ul#task_list').empty();
        $.each(data.tasks , function(id, task) {
          ul.append('<li>' + task.name + '</li>');
        })
      }
    });

    return false;
  });
});

function ajax(method, data) {

  $.ajax({
    type: method,
    url: '/tasks',
    dataType: 'json',
    data: {vow: data},
    cache: false,
    timeout: 5000,
    success: function(data) {
      $('#test').html(''); // reset

      if(data.db.length == 0) {
        $('#test').append('nothing yet, use the form.');
      }
      else {
        $.each(data.db, function(i, val) {
          var output = '<p>I vow to ' + val + '.</p>';
          $('#test').prepend(output);
        });
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('#test').append('error ' + textStatus + " " + errorThrown);
    }
  });
}