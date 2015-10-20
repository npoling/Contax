var $ = require('jquery');

var contacts = [];
var currentContact = 0;


var displayContacts = function (contacts) {
  if (contacts.length) {
    for (currentContact; currentContact < contacts.length; currentContact++) {
      $('#contacts').append('<div class="contact">\
            <h4>Name:</h4> ' + contacts[currentContact].name + '\
            <h4>Phone:</h4> <a href="tel:' + contacts[currentContact].phone +'">' + contacts[currentContact].phone + '</a>\
            <h4>E-Mail:</h4> <a href="mailto:'+ contacts[currentContact].email+'"> '+ contacts[currentContact].email +'</a>\
            <br><button class="delete" id="' + currentContact + '">Delete</button>\
        </div><br>');
    }
  }
};

var deleteContact = function (index) {
  $('#contacts').html('<h2>Your Contacts:</h2>');  
  var deleted = contacts.splice(index, 1);   
  
  if (contacts.length === 0) {
    contacts = [];
  }      
  currentContact = 0;

  var updatedContacts = JSON.stringify(contacts);
  updateContacts(updatedContacts);                       
  displayContacts(contacts);  
};

var archiveContacts = function (data) {
  contacts = [];
  contacts = data;
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
    success: function () {
      console.log('updateContacts received by server');
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

var addListener = function() {
  $('#contacts').on('click', 'button', function (event) {
    var index = $(this).attr('id');
    console.log("delete index", index);
    deleteContact(index);
  }); 
}

$(document).ready(function(){
  getContacts();
  displayContacts(contacts);


  $('.contactForm').on('submit', function (event){
    event.preventDefault(); 
    var contact = {};
  
    contact.name = this.lastname.value + ', ' + this.firstname.value;
    contact.phone = this.phone.value;
    contact.email = this.email.value;

    contact = JSON.stringify(contact);
    postContact(contact);
    getContacts();
    displayContacts(contacts);
  });

  addListener();
});




