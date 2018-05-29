/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />

$(document).ready(() => {

  let publicAddress: string;
  let tag: string;
  let crypto: any;

  const CRYPTO_MAP: any = {
    btc: {
      label: "Bitcoin (BTC)",
      symbol: "BTC",
      logo: "btc.png",
    },
    eth: {
      label: "Ethereum (ETH)",
      symbol: "ETH",
      logo: "eth.png",
    },
    ltc: {
      label: "Litecoin (LTC)",
      symbol: "LTC",
      logo: "ltc.png",
    },
    eos: {
      label: "EOS (EOS)",
      symbol: "EOS",
      logo: "eos.png",
    },
  };

  // Click on crypto buttons
  $(".crypto-buttons button").click((event) => {
    let selectedCrypto = event.target.getAttribute("name") || "";
    reinitCryptoButtons();
    event.target.classList.add("selected-crypto");
    crypto = CRYPTO_MAP[selectedCrypto];
    $("#typeaheadSearch").val("");
    $("#typeaheadSearch.error").removeClass("error");
    $("#go-to-address-step").removeAttr("disabled");
  });

  // Input address
  $("#public-address").keyup((event) => {
    publicAddress = $(event.target).val() as string;
    $("#public-address.error").removeClass("error");
    checkInputs();
  });

  // Input tag
  $("#address-tag").keyup((event) => {
    tag = $(event.target).val() as string;
    $("#address-tag.error").removeClass("error");
    checkInputs();
  });

  // Check if all inputs are not empty
  let checkInputs = function() {
    if (publicAddress && tag) {
      $("#go-to-last-step").removeAttr("disabled");
    } else {
      $("#go-to-last-step").attr("disabled", "disabled");
    }
  };

  // Click on slide 1 validation button
  $("#go-to-address-step").click(() => {
    setSelectedCryptoInformations()
    goToSlide(1);
  });

  let setSelectedCryptoInformations = () => {
    $(".selected-blockchain").text(crypto.label);
  }

  // Click on slide 2 validation button
  $("#go-to-last-step").click((event) => {
    setAddressInformations();
    goToSlide(2);
  });

  let setAddressInformations = () => {
    $(".selected-tag").text(tag.indexOf("#") === 0 ? tag : "#" + tag);
    $("#choosen-address").text(publicAddress);
    $(".crypto-symbol").text(crypto.symbol);
  }

  // Click on slide 3 validation button
  $("#activate-sonar").click(() => {
    goToSlide(3);
  });

  // On Typeahead item select
  $("#typeaheadSearch").change(function() {

    var current: any = $("#typeaheadSearch").val() !== ""  && $("#typeaheadSearch").typeahead("getActive");
    if (current) {
      crypto = {
        label: current.name,
        symbol: current.symbol,
        logo: "default.png",
      };
      $("#go-to-address-step").removeAttr("disabled");
      reinitCryptoButtons();
    }
  });

  $("#typeaheadSearch").keyup((event) => {
    let typeTyped = $(event.target).val() as string;
    if (typeTyped === "" && $(".crypto-buttons button.selected-crypto").length === 0) {
      crypto = null;
      event.stopPropagation();
    }
  });

  let reinitCryptoButtons = () => {
    $(".crypto-buttons button.selected-crypto").removeClass("selected-crypto");
    $(".crypto-buttons button.error").removeClass("error");
  };

  let goToSlide = (index: number) => {
    $('#carouselForm').carousel(index);
  };

  $(".carousel-indicators li").click((event: any) => {
    let slideNumber = parseInt($(event.target).attr("data-slide-to"), 10);
    switch (slideNumber) {
      case 2: {
        if (!publicAddress) {
          $("#public-address").addClass("error");
        }
        if (!tag) {
          $("#address-tag").addClass("error");
        }

        if (!publicAddress || !tag) {
          event.stopPropagation();
        } else {
          setAddressInformations();
        }
        break;
      }
      case 1: {
        if (crypto) {
          setSelectedCryptoInformations();
        } else {
          $(".crypto-buttons button").addClass("error");
          $("#typeaheadSearch").addClass("error");
          event.stopPropagation();
        }
      }
    }

  });

});
