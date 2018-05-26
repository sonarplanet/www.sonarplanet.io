$(document).ready(() => {
  const DATA_TEXT = ['confirmations of your transaction.', 'execution of your...', 'changing balance'];

  let typeWriter = (text: string, i: number, fnCallback: Function) => {
    if (i < text.length) {
      document.getElementById('typewriter').innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else {
      if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 700);
      }
    }
  };

  let startTextAnimation = (index: number) => {
    if (typeof DATA_TEXT[index] === 'undefined') {
      setTimeout(function() {
        startTextAnimation(0);
      }, 2000);
    }

    if (DATA_TEXT[index] && index < DATA_TEXT[index].length) {
      typeWriter(DATA_TEXT[index], 0, function() {
        startTextAnimation(index + 1);
      });
    }
  };
  startTextAnimation(0);

});

$(".typeahead.dropdown-menu .dropdown-item").on("click", () => {
  console.log("clickkkkkkkkkkkk");
})
