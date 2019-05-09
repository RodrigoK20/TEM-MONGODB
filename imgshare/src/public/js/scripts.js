//FUNCIONALIDAD DE LIKE, ELIMINAR, A TRAVES DE JQUERY

  // Boton Like
  $('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    console.log(imgId)

    //El servidor sabra a que imagen incrementara el like
    $.post('/images/' + imgId + '/like')
      .done(data => {
      console.log('back:', data)
        $('.likes-count').text(data.likes);
      });
  });

   // Delete
   $('#btn-delete').click(function (e) {
    e.preventDefault();
    let $this = $(this);

    //Almacenar respuesta
    const response = confirm('¿Esta seguro de eliminar la imagen?');
    if (response) {

        //Si es verdadera la respuesta, elimina la imagen, del servidor
      let imgId = $(this).data('id');
      $.ajax({
        url: '/images/' + imgId,
        type: 'DELETE'
      })
        .done(function(result) {
          $this.removeClass('btn-danger').addClass('btn-success');
          $this.find('i').removeClass('fa-times').addClass('fa-check');
          $this.append('<span>Eliminado!</span>');
        });
    }
  });

  $(function() {
    $('#post-comment').hide();
    $('#btn-toggle-comment').click(e=> {

    e.preventDefault();
    $('#post-comment').slideToggle();
  })
});


