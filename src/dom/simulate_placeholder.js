/**
 * Simulate HTML5 placeholder attribute
 *
 * Needed since
 *    - div[contentEditable] elements don't support it
 *    - older browsers (such as IE8 and Firefox 3.6) don't support it at all
 *
 * @param {Object} parent Instance of main wysihtml5.Editor class
 * @param {Element} view Instance of wysihtml5.views.* class
 * @param {String} placeholderText
 *
 * @example
 *    wysihtml.dom.simulatePlaceholder(this, composer, "Foobar");
 */
(function(dom) {
  dom.simulatePlaceholder = function(editor, view, placeholderText) {
    var unset = function() {
          if (view.hasPlaceholderSet()) {
            view.clear();
          }
          dom.removeClass(view.element, wysihtml5.PLACEHOLDER_CLASS_NAME);
        },
        set = function() {
          if (view.isEmpty()) {
	    view.element.setAttribute("contenteditable", "false"); //Prevents focus from returning to contentediable when content is changed on blur.
	    view.clear();
            //editor.composer.selection.insertHTML(placeholderText); //DOM error 9  
	    editor.composer.selection.insertNode(document.createTextNode(placeholderText));

	    view.element.setAttribute("contenteditable", "true");
            dom.addClass(view.element, wysihtml5.PLACEHOLDER_CLASS_NAME);
          }
        };

    editor
      .observe("set_placeholder", set)
      .observe("unset_placeholder", unset)
      .observe("focus:composer", unset)
      .observe("paste:composer", unset)
      .observe("blur:composer", set);

    set();
  };
})(wysihtml5.dom);
