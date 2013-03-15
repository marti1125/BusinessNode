
/*
 * GET services page.
 */

exports.services = function(req, res){
  res.render('services', { title: 'Services' });
};