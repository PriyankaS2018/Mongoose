var app = require('./config/server.config');
var Register = require('./students/models/models.emp');

app.get('/', function(req, res) {
    // res.send('Welcome to Express!');
    res.render('login', { "title": "User Login" });
});

app.post('/', function(req, res) {
    let emp_name = req.body.emp_name;
    res.send(emp_name + ' Welcome to MCA Dept!');
});

app.post('/add', function(req, res) {
    let operand1 = req.body.operand1;
    let operand2 = req.body.operand2;
    let result = operand1 + operand2;
    res.send('Result of Addition is : ' + result);
});

app.post('/register', function(req, res, next) {
    var registerEmployee = new Register(req.body);
    registerEmployee.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(registerEmployee);
        }
    });
});


app.post('/update_Employee', function(req, res, next) {
    
    var email = req.body.email;
    var emp_name = req.body.emp_name;
    Register.updateOne({ "email": email }, { "emp_name": emp_name }, function(err, data) {
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});
app.post('/delete_Employee', function(req, res, next) {
    
    var email = req.body.email;
    var emp_name = req.body.emp_name;
    Register.deleteOne({ "email": email }, { "emp_name": emp_name }, function(err, data) {
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});