$(document).ready(() => {
  const DATA_TEXT = [
    'waiting confirmation of your transactions.',
    'waiting execution of your transactions',
    'tracking changes on your balance of your public keys.',
    'looking for your crypto'];

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
