const ResponseHandler = require(`../services/response_handler`);
const NewsModel = require(`../models/news_model`);
const AuthServices = require("../services/auth_services");

class NewsController {
    static async gettAllNews(req, res, next) {
        try {
            const allNews = await NewsModel.find().select('-_id -__v').lean();
            return ResponseHandler.send(res, {
              success: true,
              statusCode: 200,
              message: `Successfull`,
              data: allUsers,
            });
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                error: error.message,
                message: `Internal Server Error`, 
                statusCode: 500
            });
        }
    }

    static async getNews() {
        try {
            const { news_id } = req.body;
            const newsObj = await NewsModel.findOne({ news_id: news_id });
            if(!newsObj) {
                return ResponseHandler.send( res,{ 
                    success: true,
                    statusCode: 200,
                    error: `Invalid News Id.`,
                    message: `Error`
                });
            }
            return ResponseHandler.send( res,{ 
                success: true,
                statusCode: 200,
                message: `Successfull`,
                data: newsObj
              });
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false,
                statusCode: 500,
                error: error.message,
                message: `Internal server error`,
            });
        }
    }

    static async addNews(req, res, next) {
        try {
            // const {user_id, image, title, subtitle, body } = req.body;
            const newsID = AuthServices.generateUniqueID({ length: 10 });
            const newsObj = new NewsModel({
                newsID,
                ...req.body,
            });

            const saveNews = await newsObj.save();
            return ResponseHandler.send(res, {
                success: true,
                statusCode: 201,
                message: `Mines created successfully.`,
                data: saveNews,
            });
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                error: error.message,
                message: `Internal Server Error`, 
                statusCode: 500
            });
        }
    }

    static async updateNews (req, res, next) {
        try {
            const { user_id, news_id, image, title, subtitle, body, } = req.body;
            if (!user_id || !news_id) {
                return ResponseHandler.send(res, {
                    success: false,
                    statusCode: 400,
                    error: `User ID and News ID are required.`,
                    message: 'Failure',
                });
            }

            const reqObj = req.body;
            if(user_id) reqObj.user_id = user_id;
            if(image) reqObj.image = image;
            if(title) reqObj.title = title;
            if(subtitle) reqObj.subtitle = subtitle;
            if(body) reqObj.body = body;
            if (Object.keys(reqObj).length === 2) {
                return ResponseHandler.send(res, {
                    success: false,
                    statusCode: 400,
                    error: `Invalid field unable to update`,
                    message: `Failure`
                });
            }
            if(reqObj) reqObj.updated_at = Date.now;
            const updateNewsObj = await NewsModel.findOneAndUpdate({ news_id: news_id }, { $set: reqObj }, { new: true }).select('-_id -__v').lean();
            if (!updateNewsObj) {
                return ResponseHandler.send(res, {
                    success: false,
                    statusCode: 404,
                    error: `Invalid News ID. Please Try again`,
                    message: `Failue`,
                });
            }
            return ResponseHandler.send(res, {
                success: true,
                statusCode: 200,
                message: `Success`,
                data: {
                    news_id: updateNewsObj.news_id,
                    user_id: updateNewsObj.user_id,
                    image: updateNewsObj.image,
                    title: updateNewsObj.title,
                    subtitle: updateNewsObj.subtitle,
                    body: updateNewsObj.body,
                    created_at: updateNewsObj.updated_at,
                    updated_at: updateNewsObj.updated_at,
                    deleted_at: updateNewsObj.deleted_at,
                }
            });
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                error: error.message,
                message: `Internal Server Error`, 
                statusCode: 500
            });
        }
    }

    static async deleteNews(req, res, next) {
        try {
            const { news_id } = req.body;
            const newObj = await NewsModel.findOneAndDelete({ news_id: news_id });
            if (!newObj) {
              return  ResponseHandler.send(res, {
                    success: false, 
                    error: `Invalid News ID`,
                    message: `Error`, 
                    statusCode: 404
                }); 
            }
            return ResponseHandler.send(res, {
                success: true, 
                statusCode: 200,
                message: `Success`, 
                data: {
                    message: `News Delete Successfully.`
                }
            });
        } catch (error) {
            return ResponseHandler.send(res, {
                success: false, 
                error: error.message,
                message: `Internal Server Error`, 
                statusCode: 500
            });
        }
    }
}

module.exports = NewsController;