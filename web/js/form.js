$.fn.extend({
  
  dmWidgetContentGalleryForm: function(widget)
  {
    var self = this,
		
		formName = self.metadata().form_name,
		
		$form = self.find('form:first')
		  .append('<input type="hidden" name="'+formName+'[widget_width]" value="'+widget.element.width()+'" />')
		,
		
		$tabs = $form.find('div.dm_tabbed_form')
		  .dmCoreTabForm()
		,
		
		$medias = $form.find('.medias_list'),
  
	  deleteMessage = $medias.metadata().delete_message,
		    
    createMediaElement = function(media)
    {
			media = $.extend({
				position: 0,
				link: '',
				alt: ''
			}, media);
			
			var $li = $('<li class="media_element">')
      .html(' \
<input class="id" type="hidden" name="'+formName+'[media_id][]" value="'+media.id+'" /> \
<input class="position" type="hidden" name="'+formName+'[media_position][]" value="'+media.position+'" /> \
<div class="wrap alt_wrap clearfix"> \
  <label>Alt:</label> \
	<input class="alt" name="'+formName+'[media_alt][]" value="'+media.alt+'" /> \
</div> \
<div class="wrap link_wrap clearfix"> \
  <label>Link:</label> \
  <input class="link dm_link_droppable page_only" name="'+formName+'[media_link][]" value="'+media.link+'" /> \
</div> \
<img src="'+$.dm.ctrl.options.dm_core_asset_root+'images/cross-small.png" class="delete_media_element" title="'+deleteMessage+'" />'
      )
      .block();
			
      $medias.append($li);
			  
      $.ajax({
        url:     $.dm.ctrl.getHref('+/dmCore/thumbnail'),
				cache:   true,
        data:    {
          source:   'media:'+media.id,
          width:    100,
          height:   40,
          quality:  90
        },
        success: function(html) {
          $li.unblock().prepend(html);
					     
		      $li.find('img.delete_media_element')
		      .css('left', ($li.width()-7)+'px')
		      .bind('click', function() {
		        if (confirm(deleteMessage+' ?'))
		        {
		          $li.remove();
		        }
		      });

          $li.find('input.dm_link_droppable').dmDroppableInput();
        },
        error:   function() {
          $li.unblock().remove();
        }
      });
      
      self.dmFrontForm('linkDroppable');
      if ($medias.hasClass('ui-sortable')) 
      {
        $medias.sortable('refresh').trigger('resort');
      }
    };
		
		$.each($medias.metadata().medias, function() {
			createMediaElement(this);
		});
		
		$medias.droppable({
      accept:       '#dm_media_bar li.file.image',
      activeClass:  'droppable_active',
      hoverClass:   'droppable_hover',
      tolerance:    'touch',
      drop:         function(event, ui)
			{
				createMediaElement({id : ui.draggable.attr('id').replace(/dmm/, '')});
				
				$medias.attr('scrollTop', 999999);
      }
    }).sortable({
      opacity:                0.5,
      distance:               5,
      revert:                 false,
      scroll:                 true,
      tolerance:              'pointer',
      stop:                   function(e, ui) {
				$(this).trigger('resort');
      }
		}).bind('resort', function() {
      $('li.media_element', $medias).each(function(index) {
        $('input.position', $(this)).val(index);
      });
		});
  }
});