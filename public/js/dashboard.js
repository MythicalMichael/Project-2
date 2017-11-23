$(".checkbox").on('click', function() {
  var self = this;
  var isDone = $(this).is(":checked");
  var taskId = $(this).val();
  $.post('http://localhost:3000/task/' + taskId + '/update',
  {
   isDone: isDone
  },
  function(data, status) {
      $(self).attr('checked', isDone);
  });
});