export class UserController {

    static async getProfile (req, res) {
        try {
            const user = req.user
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user: user })
        } catch (err) {
            throw err;
        }
    }

    static async logout (req, res) {
        res.clearCookie("jwt");
        res.end();
    }
}