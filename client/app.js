var $ = require('jquery');

var contacts = [];
var currentContact = 0;


var displayContacts = function () {

  if (contacts.length) {
    var loopLength = contacts.length 
  } else {
    loopLength = 1;
  }

  for (currentContact; currentContact < loopLength; currentContact++) {
    $('#contacts').append('<div class="contact">\
        <div class="name">\
          <h4>Name:</h4> ' + contacts[currentContact].name +  '\
        </div>\
        <div class="phone">\
          <h4>Phone:</h4> '+ contacts[currentContact].phone + ' \
        </div>\
        <div class="email">\
          <h4>E-Mail:</h4> <a href="mailto:'+ contacts[currentContact].email+'"> '+ contacts[currentContact].email +'</a>\
        </div>\
        <div class="delete">\
          <br><button class="delete" id="' + currentContact + '">Delete</button>\
        </div>\
      </div><br>');
  }
}

var deleteContact = function (index) {
  $('#contacts').html('<h2>Your Contacts:</h2>');
  var deleted = contacts.splice(index, 1);
  console.log("deleted items", deleted);
  console.log('contact object', contacts);
  currentContact = 0;
  displayContacts();
}

var addListener = function () {
  $('.delete').on('click',function () {
    var index = $(this).attr('id');
    deleteContact(index);
    addListener();
  });
}

if (contacts.length === 0) {
  addListener();
}

$(document).ready(function(){

  if (contacts.length) {
    displayContacts();
  }

  $('.contactForm').on('submit', function (event){
    event.preventDefault(); 
    var contact = {};
    console.log('click')
  
    contact.name = this.lastname.value + ', ' + this.firstname.value;
    contact.phone = this.phone.value;
    contact.email = this.email.value;
    contacts.push(contact);
      console.log(contacts[0]);

    displayContacts();
  });

  $('.delete').on('click',function () {
    var index = $(this).attr('id');
    console.log("delete index", index);
    deleteContact(index);
    addListener();
  });
});

