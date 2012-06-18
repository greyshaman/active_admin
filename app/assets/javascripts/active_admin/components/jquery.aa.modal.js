/*
 * Modal-Window for use with active_admin
 * based on http://www.ppc.bz/fbmodal/ (github.com/tekmonk/bz-FB-Modal)
*/
(function($) {
  $.fbmodal = function(config) {
    var defaults, options, fbmodal, popup, header, close, content, footer, overlay, buttons, closeit;
    var table, rowBot, rowTop, rowMid, loadgif, buttoncolor;  // more var settings, formatting
      defaults = {
        type: 'info'    //  info, warning  
        , method: 'text'  // text, ajax
        , href:  '' // the URL for ajax method
        , loaddata: '' // the POST parameters to pass
        , title: 'My Title' 
        , text: 'Default Text' 
        , loading : "Loading..."  // text or html image 
        , width: 500
        , callback: function () {}
        , closeTrigger: true
        , escClose: true
        , overlay: true
        , overlayClose: true
        , modaltop  : "30%"
        , buttons: [{
          'text': 'Ok'
          , 'class': 'dark'
          , 'callback': function () {
            $.fbmodal.close ();  
            options.callback (); 
          }
        }]
      };
    
    options = $.extend(defaults, config);
    
    // if a modal is already open, close it
    // you should be able to comment out this bit if you want many fbmodal windows
    if($('.aa_modal_popup').length){
      $.fbmodal.close (); 
      }
    
    
    fbmodal = $('<div>', { 
      'class' : 'aa_modal',      
    }).css({'top':options.modaltop}).appendTo ('body');
    

    popup = $('<div>', { 
      'class' : 'aa_modal_popup' 
    }).appendTo(fbmodal);
    
    contents = $('<div/>',{})
    if(options.title != ''){
      header = $('<div/>', { 
        'class' : 'title', 'html': options.title
      })
      if(options.closeTrigger) {
        closeit = $('<a>', { 
          'href': 'javascript:;'
          , 'class': 'aa_modal_popup_close'
          , 'click': close
        }).appendTo(header);  
      }  
      header.appendTo(contents);
    }
    
    if(options.method == 'text'){
      content = $('<div/>', {'class': 'modal_content', 'html': options.text}).appendTo(contents);
    }
    else if(options.method == 'partial'){
      content = $('#'+options.id+'_body').clone().appendTo(contents);
    }
    else if(options.method == 'ajax'){
      content = $('<div/>', {'class': 'modal_content', 'html': options.loading}).wrapInner('<div class="modal_loading" />').appendTo(contents);
    }
    
  
    footer = $('<div/>', { 
      'class': 'footer' 
    });      
    

    if (options.type == 'warning') {
      options.buttons = [{ 
        'text': 'Yes'
        , 'class': 'dark'
        , 'callback': function () { 
          options.callback (); 
          $.fbmodal.close (); 
        } 
      }, { 
        'text': 'No'
        , 'class': 'light'
        , 'callback': function () { $.fbmodal.close (); }  
      }, {
        'text': 'Cancel'
        , 'class': 'light'
        , 'callback': function () { $.fbmodal.close ();  }  
      }];    
    }

    buttons = $('<div/>', { 
      'class': 'right' 
    });  
    
    if (options.buttons.length > 0) {
      for (key in options.buttons) {
        // apply correct classes based on color option
        $('<div>', { 'text': options.buttons[key].text, 'class': 'button_'+options.buttons[key].class })
          .bind ('click', options.buttons[key].callback)
          .appendTo (buttons);
      }
    }
    
    buttons.appendTo(footer);
    footer.appendTo(contents);


    rowMid = '<div id="modal_body"></div>';
    table = $(rowMid);
    table.css({'width':options.width}).appendTo(popup);
    
    popup.find('#modal_body').append(contents);
    
    // Do later for an X close checkbox
/*    if (options.closeTrigger) {
      close = $('<a>', { 
        'href': 'javascript:;'
        , 'class': 'msgAlert_close'
        , 'click': close
      }).appendTo (header);  
    }    */
    
    fbmodal.appendTo ('body');
    fbWidth();
    
    if(options.method == 'ajax'){
      $.ajax({
        type  : "POST",
        url    : options.href,
        data  : options.loaddata,
        success  : function(getdata){
          $('.modal_content').html(getdata);
        },
        error  : function(){
          $('.modal_content').html("Failed to Load Content");
        }
      });  
    }
  

    if (options.overlay) {
      overlay = $('<div/>', {
        'class': 'aa_modal_overlay'
      }).appendTo ('body');
      
      if (options.overlay && options.overlayClose) {
        overlay.bind ('click', close);
      }
    }

    if (options.escClose) {
      $(document).bind ('keyup.aa_modal', function (e) { 
        if (e.keyCode == 27) { 
          $.fbmodal.close (); 
        } 
      });
    }
    
    $(window).bind("resize", function(){
      fbWidth();
    });
    
    function fbWidth(){ 
      var windowWidth=$(window).width();
      var fbmodalWidth=$(".aa_modal").width();
      var fbWidth=windowWidth / 2 - fbmodalWidth / 2;
      $(".aa_modal").css("left",fbWidth);
      }
    
    function close (e)
    {
      e.preventDefault ();
      $.fbmodal.close ();
    }
  };

  $.fbmodal.close = function () {
    //$('.fbmodal_overlay').fadeOut ('fast', function () { $(this).remove (); });
    $('.aa_modal').fadeOut('fast', function () {
      $(this).remove (); 
      $('.aa_modal_overlay').remove();
    });
    //$(document).unbind ('keyup.msgAlert');
  }
})(jQuery);