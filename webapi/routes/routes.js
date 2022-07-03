const express=require('express');
const router=express.Router();
const CommonControllerApi = require('../api/common.api');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Backend server"
    });
});

//posts
router.route('/post-api').get(CommonControllerApi.handleUserData);
router.route('/post-api').post(CommonControllerApi.handleUserData);
router.route('/post-api').patch(CommonControllerApi.handleUserData);
router.route('/post-api').delete(CommonControllerApi.handleUserData);
router.route('/post-api').put(CommonControllerApi.handleUserData);
//authentication api


module.exports=router;