
const db = require('../config/db');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const newsSchema = new Schema({ 
    news_id: {
        type: String,
        required: false,
    },
    user_id: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    subtitle: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: false,
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: false,
    },
    delete_at: {
        type: Date,
        required: false,
    },
 });

 const NewsModel = db.collection(`news`, newsSchema);
 module.exports = NewsModel;