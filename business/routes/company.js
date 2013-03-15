
/*
 * GET company page.
 */

exports.company = function(req, res){
  res.render('company', { title: 'Company' });
};