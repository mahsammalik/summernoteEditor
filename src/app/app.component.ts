import { Component, OnInit } from '@angular/core';
import { Options } from 'selenium-webdriver/opera';
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit {
  title = 'summernote';


  ngOnInit() {
    $('#summernote').summernote({
      toolbar: [
        ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']],
        ['customButtons', ['tokenBtn']]
      ],
      buttons: {
        'tokenBtn': this.customButton(),
      },

    });
  }

  customButton() {
    return (context) => {
      var keywordMap = new Map([
        ['Firstname', '{FIRSTNAME}'],
        ['Lastname', '{LASTNAME}'],
        ['Filename', '{FILENAME}'],
        ['Hubname', '{HUBNAME}'],
        ['User ID', '{USERID}']
      ]);
    
      var list = Array.from(keywordMap.keys());
      var ui = $.summernote.ui;

      var button = ui.buttonGroup([
        ui.button({
          className: 'btn btn-secondary dropdown-toggle',
          contents: '<span class="fa fa-database"></span> Tokens <span class="caret"></span>',
          tooltip: "Parámetros disponibles",
          data: {
            toggle: 'dropdown'
          }
        }),
        ui.dropdown({
          items: list,
          className: 'dropdown-menu',
          click: function (event) {
            var $button = $(event.target);
            var value = $button.data('value');
            $('#summernote').summernote('editor.insertText', keywordMap.get(value));
          }
        })
      ]);

      return button.render();
  }
}

}