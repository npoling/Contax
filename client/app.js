var $ = require('jquery');

var contacts = [];
var currentContact = 0;


var displayContacts = function (contacts) {
  if (contacts.length) {
    var loopLength = contacts.length 
  } else {
    loopLength = 1;
  }

  for (currentContact; currentContact < loopLength; currentContact++) {
    $('#contacts').append('<div class="contact">\
          <h4>Name:</h4> ' + contacts[currentContact].name + '\
          <h4>Phone:</h4> <a href="tel:' + contacts[currentContact].phone +'">' + contacts[currentContact].phone + '</a>\
          <h4>E-Mail:</h4> <a href="mailto:'+ contacts[currentContact].email+'"> '+ contacts[currentContact].email +'</a>\
          <br><button class="delete" id="' + currentContact + '">Delete</button>\
      </div><br>');
  }
};

var deleteContact = function (index) {
  $('#contacts').html('<h2>Your Contacts:</h2>');  
  var deleted = contacts.splice(index, 1);         
  currentContact = 0;
  displayContacts(contacts);  
    console.log("called updateContact from delete contacks")

  var updatedContacts = JSON.stringify(contacts);
  updateContacts(updatedContacts);                       
};

var archiveContacts = function (data) {
  contacts = [];
  contacts = data;
  console.log("archieved contacts called, data object is:", contacts);
  return contacts;
}

var postContact = function (contact) {
  $.ajax({
    url:'addContact',
    type: 'POST',
    data: contact,
    contentType: 'application/json',
    success: function (contact) {
      console.log('contact received', contact);
      contacts.push(contact);
    },
    error: function (){
      console.error('Post error', error);
    }
  });
};

var updateContacts = function (contacts) {
  $.ajax({
    url:'updateContacts',
    type: 'POST',
    data: contacts,
    contentType: 'application/json',
    success: function (contacts) {
      console.log('contacts updates on server');
    },
    error: function (){
      console.error('Post error', error);
    }
  });
};

var getContacts = function () {
  $.ajax({
    url:'getContacts',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('get request worked, data object is', data, data.length);
      archiveContacts(data);
      displayContacts(contacts);
    },
    error: function (){
      console.error('Get contacts error', error);
    }
  });
}






$(document).ready(function(){
  getContacts();
  if (contacts.length) {
    displayContacts(contacts);
  }

  $('.contactForm').on('submit', function (event){
    event.preventDefault(); 
    var contact = {};
  
    contact.name = this.lastname.value + ', ' + this.firstname.value;
    contact.phone = this.phone.value;
    contact.email = this.email.value;
    //contacts.push(contact);
    contact = JSON.stringify(contact);
    postContact(contact);
    getContacts();
    displayContacts(contacts);

  });

  $('#contacts').on('click', 'button', function (event) {
    var index = $(this).attr('id');
    console.log("delete index", index);
    deleteContact(index);
  });
});




