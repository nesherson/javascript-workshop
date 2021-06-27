exports.get404 = (req, res) => {
  res.status(404).render('404.ejs', {
    pageTitle: 'Page not Found',
    path: '',
    isAuthenticated: req.session.isLoggedIn,
  });
};
