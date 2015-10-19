var $ = require('jquery')

var contacts = [
  { 
    name: 'Alice, Bob',
    phone: '508-555-1234',
    email: 'alice@bob.com'
  },
  {
    name: 'Person, Two',
    phone: '555-123-4567',
    email: 'person@gmail.com'
  }
];

var currentContact = 0;

var displayContacts = function () {
  for (currentContact; currentContact < contacts.length; currentContact++) {
    $('#contacts').append('<div class="contact">\
        <div class="name">\
          Name: ' + contacts[currentContact].name +  '\
        </div>\
        <div class="phone">\
          Phone: '+ contacts[currentContact].phone + ' \
        </div>\
        <div class="email">\
          E-Mail: <a href="mailto:'+ contacts[currentContact].email+'"> '+ contacts[currentContact].email +'</a>\
        </div>\
        <div class="delete">\
          <br><button class="delete" id="' + currentContact + '">Delete</button>\
        </div>\
      </div><br>');
  }
}

var deleteContact = function (index) {
  $('#contacts').html('');
  contacts.splice(index, 1);
  console.log('contact object 1st index', contacts[0]);
  currentContact = 0;
  displayContacts();
}

$(document).ready(function(){
  displayContacts();

  $('.contactForm').on('submit', function (event){
    event.preventDefault(); 
    var contact = {};
  
    contact.name = this.lastname.value + ', ' + this.firstname.value;
    contact.phone = this.phone.value;
    contact.email = this.email.value;
    contacts.push(contact);

    displayContacts();
  });

 $('.delete').click(function (){
    var index = $(this).attr('id');
    console.log("delete index", index);
    deleteContact(index);
  });
});
