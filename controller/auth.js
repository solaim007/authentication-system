const db = require('../connection/mysqlConnection');
const toast = require('react-hot-toast');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerController = async (req, res) => {
    // Checking if the user already exists
    const emailCheckQuery = `SELECT * FROM users WHERE email = ?`;
    db.query(emailCheckQuery, [req.body.email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const { username, email, password } = req.body;
        
        const insertUserQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        const values = [username, email, password];
        
        db.query(insertUserQuery, values, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    // Duplicate entry error (username or email already exists)
                    return res.status(400).json({ error: 'Username or email already exists' });
                }
                // Other database error
                return res.status(500).json({ error: 'Database error' });
            }
            // Redirect to login page with success notification
            res.redirect('/login?success=true');
        });
    });
}


const loginController = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query,[email],async(err,result)=>{
        if(err){
            return res.status(500).json({error:'database error'});
        }
        if(result.length===0){
            return res.status(400).json({error:'Email does not exist'});
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:'Invalid Password'});
        }
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'},(err,token)=>{
            if(err){
                return res.status(500).json({error:'jwt error'});
            }

            res.status(200).cookie('token',token).render('profile',{user:user});
        })
    })  
}
module.exports = {registerController,loginController};