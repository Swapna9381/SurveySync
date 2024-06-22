const passport = require('passport');

module.exports = app => {

app.get('/auth/google', passport.authenticate('google',{
    scope:['profile','email']
})
); // routing with express.js and specifically stating that we are using google strategy
 
app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});
app.get('/api/current_user',(req, res) => {
    res.send(req.user);
    });
};