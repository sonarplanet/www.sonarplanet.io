$(document).ready(() => {
  let submitted = false;

  $("#emailForm").submit(function(event) {
    if (submitted) {
      return false;
    } else {
      submitted = true;
    }
  });

  $("#hidden_iframe").on("load",function() {
    if (submitted) {
      onFormSubmitResponse();
    }
  });

  function onFormSubmitResponse() {
    // TODO: inform user of the capture of its email
    alert('Thank you');
  }
});
