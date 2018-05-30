$(document).ready(() => {
  let newsletter_submitted = false;
  let slack_submitted = false;

  $("#emailForm").submit(function(event) {
    if (newsletter_submitted) {
      return false;
    } else {
      newsletter_submitted = true;
    }
  });

  $("#hidden_iframe").on("load",function() {
    if (newsletter_submitted) {
      onFormSubmitResponse();
    }
  });

  function onFormSubmitResponse() {
    // TODO: inform user of the capture of its email
    alert('Thank you');
  }

  $("#slackForm").submit(function(event) {
    if (slack_submitted) {
      return false;
    } else {
      slack_submitted = true;
    }
  });

  $("#hidden_iframe_slack").on("load",function() {
    if (slack_submitted) {
      onFormSubmitResponse();
    }
  });

});
