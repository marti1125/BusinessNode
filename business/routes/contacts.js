
/*
 * GET contacts page.
 */

exports.contacts = function(req, res){
  res.render('contacts', { title: 'Contacts' });
};