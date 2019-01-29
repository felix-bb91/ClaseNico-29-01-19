$(document).ready(function(){
        
    const $inputsConFondo = $('#name, #msg, #mail, #password');
    $inputsConFondo.addClass('focusDisabled');
    
    const $submit = $('input[type="submit"]');
    $submit.attr('disabled','disabled').addClass("disabled");
    
    const $fetch = $('#fetch');
    
    $submit.click(function(e){
      e.preventDefault();
      
      const inputData = {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      cars: {
        company: $('#company').val(),
        quantity: parseInt($('input[name=cantidad]:checked').val())
      },
      message: $('#msg').val()
    }
      $.ajax({
          url: 'https://ejemplo-codespace.firebaseio.com/autos-por-persona/.json',
          type: "POST",
          data: JSON.stringify(inputData),
          success: function (data) {
          console.log(data);
          alert('Su formulario ha sido enviado');
          },
          error: function(error) {
          console.log(error);
          }
      });
  });
  $fetch.click(function() {
      $('#fetch').hide();
    $.ajax({
          url: 'https://ejemplo-codespace.firebaseio.com/autos-por-persona/.json',
          type: "GET",
          success: function (data) {
              $('#formulario').hide();
              $('#responsesContainer').append('<h1>Responses from all car owners:</h1>');
              Object.values(data).map(function(response) {
                $('#responsesContainer')
                .append(`<h3>${response.name}</h3>`)
                .append(`<li>Compañía: ${response.cars.company}</li>`)
                .append(`<li>Cantidad: ${response.cars.quantity}</li>`);
              });
              const fiatUsers = Object.values(data).filter(function(response) {
                return response.cars.company == 'fiat';
              });
              if (fiatUsers.length > 0) {
                $('#fiatUsers').append('<h1>Los siguientes usuarios poseen Fiat:</h1>')
                    fiatUsers.map(function(user) {
                    $('#fiatUsers')
                    .append(`<h3>${user.name}</h3>`)
                    .append(`<li>Cantidad: ${user.cars.quantity}<h2>`);
                  });
                  
                  function getSumOfCars(total, response) {
                    return total + response.cars.quantity;
                  }
                  const amountOfFiatUsers = fiatUsers.reduce(getSumOfCars, 0);
                  $('#fiatUsers').append(`<p>Total amount of Fiat Cars: ${amountOfFiatUsers}</p>`);
                              
              }
          },
          error: function(error) {
          console.log(error);
          }
      });
  })
    const $reset = $('input[type="reset"]');
    $reset.click(function(){
      $submit.attr('disabled','disabled').addClass("disabled");
      $inputsConFondo.removeClass('focusValidado').addClass('focusDisabled');
  });
    let $name, $message, $email, $password;
    const regexFilterForEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    $('#name').keyup(function() {
      if ($.trim($('#name').val()) !=='') {
          $('#name').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#name').hasClass('focusValidado')) {
              $('#name').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('#msg').keyup(function() {
      if ($.trim($('#msg').val()) !=='') {
          $('#msg').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#msg').hasClass('focusValidado')) {
              $('#msg').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('#password').keyup(function() {
      if ($.trim($('#password').val().length) > 7) {
          $('#password').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#password').hasClass('focusValidado')) {
              $('#password').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('#mail').keyup(function() {
      if (regexFilterForEmail.test($.trim($('#mail').val()))) {
          $('#mail').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#mail').hasClass('focusValidado')) {
              $('#mail').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('form').keyup(function() {
      let $name =  $.trim($('#name').val());
      let $message = $.trim($('#msg').val());
      let $email = $.trim($('#mail').val());
      let $password = $.trim($('#password').val());
      if ($name != '' && $message != "" && $password.length > 7 && regexFilterForEmail.test($email) ) {
        $submit.removeAttr("disabled").removeClass("disabled");
      } else {
          if (!$submit.hasClass('disabled')) {
              $submit.addClass("disabled").attr('disabled','disabled');
          }
      }
    })
  });