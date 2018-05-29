$(document).ready(() => {
  let submitted = false;

  $("#slackForm").submit(function(event) {
    if (submitted) {
      return false;
    } else {
      submitted = true;
    }
  });

  $("#hidden_iframe_slack").on("load",function() {
    if (submitted) {
      onFormSubmitResponse();
    }
  });

  function onFormSubmitResponse() {
    // TODO: inform user of the capture of its email
    alert('Thank you');
  }
});
