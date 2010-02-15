<?php

echo

$form->renderGlobalErrors(),

_open('div.dm_tabbed_form'),

_tag('ul.tabs',
  _tag('li', _link('#'.$baseTabId.'_medias')->text(__('Medias'))).
  _tag('li', _link('#'.$baseTabId.'_thumbnails')->text(__('Thumbnails'))).
  _tag('li', _link('#'.$baseTabId.'_effects')->text(__('Effects'))).
  _tag('li', _link('#'.$baseTabId.'_advanced')->text(__('Advanced')))
),

_tag('div#'.$baseTabId.'_medias.drop_zone',
  _tag('ol.medias_list', array('json' => array(
    'medias' => $medias,
    'delete_message' => __('Remove this media')
  )), '').
  _tag('div.dm_help.no_margin', __('Drag & drop images here from the right MEDIA panel'))
),

_tag('div#'.$baseTabId.'_thumbnails',
  _tag('ul',
    _tag('li.dm_form_element.multi_inputs.thumbnail.clearfix',
      $form['width']->renderError().
      $form['height']->renderError().
      _tag('label', __('Dimensions')).
      $form['width']->render().
      'x'.
      $form['height']->render().
      $form['method']->label(null, array('class' => 'ml10 mr10 fnone'))->field('.dm_media_method')->error()
    ).
    _tag('li.dm_form_element.multi_inputs.background.clearfix.none',
      $form['width']->renderError().
      $form['background']->label()->field()->error()
    ).
    _tag('li.dm_form_element.quality.clearfix',
      $form['quality']->label(__('JPG quality'))->field()->error().
      _tag('p.dm_help', __('Leave empty to use default quality'))
    )
  ).
  _tag('div.dm_help.no_margin', '<hr />'.__('These settings will apply on all images'))
),

_tag('div#'.$baseTabId.'_effects',
  _tag('ul',
    _tag('li.dm_form_element.animation.clearfix',
      $form['animation']->label(__('Animation'))->field()->error().
      _tag('p.dm_help', __('Set to custom to write your own animation'))
    ).
    _tag('li.dm_form_element.delay.clearfix',
      $form['delay']->label(__('Delay'))->field()->error().
      _tag('p.dm_help', __('Delay in seconds between transitions')).
      _tag('p.dm_help', __('Leave empty to disable transitions'))
    )
  )
),

_tag('div#'.$baseTabId.'_advanced',
  _tag('ul.dm_form_elements',
    $form['cssClass']->renderRow()
  )
),

_close('div'); //div.dm_tabbed_form