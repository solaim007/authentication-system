const db = require('../connection/mysqlConnection');
const profileRoueController = (req, res) => {
    const userId = req.user.id;

    // Query the database to fetch user data based on the userId
    const query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = result[0];

        // Render the profile view and pass user data to it
        res.render('profile', { user });
    });
};
module.exports = profileRoueController;