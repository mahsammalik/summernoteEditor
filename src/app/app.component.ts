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

  public EmailStages = [
    "Reservation",
    "Damage",
    "Return Reminder",
    "OverDue",
    "Return",
  ];



  ngOnInit() {

    var ParametrosButton = function (context) {
      var keywordMap = new Map([
        ['Firstname', '##FIRSTNAME##'],
        ['Lastname', '##LASTNAME##'],
        ['Filename', '##FILENAME##'],
        ['Keys', '##KEYS##'],
        ['Hubcode', '##HUBCODE##'],
        ['Hubname', '##HUBNAME##'],
        ['User ID', '##USERID##'],
        ['Full site signature', '##FS_SIGNATURE##'],
        ['Mobile site signature', '##MS_SIGNATURE##'],
        ['Full site link (displayed as \'click here\')',  '##PORTAL_LINK_FS##'],
        ['Mobile site link (displayed as \'click here\')',  '##PORTAL_LINK_MS##']
      ]);
    
      var list = Array.from(keywordMap.keys());
      var ui = $.summernote.ui;

      var button = ui.buttonGroup([
        ui.button({
          className: 'btn btn-secondary dropdown-toggle',
          // ui.dropdownButtonContents(ui.icon(options.icons.emailControls), options),
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

      return button.render();   // return button as jquery object 
    }



    $('#summernote').summernote({
      toolbar: [
        ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']],
        ['customButtons', ['testBtn']]
      ],
      buttons: {
        'testBtn': ParametrosButton,
      },

    });
  }

  // customButton() {
  //   return (context) => {
  //     const ui = $.summernote.ui;
  //     const button = ui.button({
  //       contents: 'Test btn',
  //       tooltip: 'Test',
  //       click: function () {
  //         $('#summernote').summernote("editor.insertText", "text");
  //       }
  //     });
  //     return button.render();
  //   }
  // }

  BindList() {
    return this.EmailStages;
  }

  customButton() {
    return (context) => {
      var ui = $.summernote.ui;
      var list = this.BindList();;

      var button = ui.buttonGroup([
        ui.button({
          className: 'dropdown-toggle',
          contents: '<span class="fa fa-smile-o"></span> <span class="caret"></span>',
          tooltip: "Insert Greetings",
          data: {
            toggle: 'dropdown'
          }
        }),
        ui.dropdown({
          className: 'dropdown-style emoji-list',
          contents: "<ul>" + list + "</ul>",
          callback: function ($dropdown) {
            $dropdown.find('i').each(function () {
              $(this).click(function () {
                $('#summernote').summernote("editor.insertText", "text");
              });
            });
          }
        })
      ]);

      return button.render();
    }
  }
}
