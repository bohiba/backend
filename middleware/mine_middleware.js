
class MineMiddleware {
  static async validateMineData(req, res, next) {
    const requiredFields = [
        'mine_name', 'mine_code', 'category', 'status', 'mineral', 
        'mine_area', 'mine_address', 'owner_name', 'owner_address', 
        'contact_details', 'valid_from', 'valid_till', 'added_by'
    ];
    
    // Check for missing or empty fields
    const missingOrEmptyFields = requiredFields.filter(
        field => !req.body[field] || req.body[field].toString().trim() === ''
    );
    
    if (missingOrEmptyFields.length > 0) {
        return res.status(400).json({ 
            message: `Missing or empty required fields: ${missingOrEmptyFields.join(', ')}` 
        });
    }    
    next();
}
}

module.exports = MineMiddleware;