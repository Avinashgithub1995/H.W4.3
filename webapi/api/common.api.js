const db = require("../db/db");
const Post = db.Posts;
const AppConstants = require("../constants/AppConstants");
function CommonControllerApi() {}


CommonControllerApi.prototype.handleUserData =  (req, res) => {
    var action = req.query.action;
    switch (action) {
      case "createPost":
        new CommonControllerApi().createPost(req, res);
        break;
      case "getallPost":
        new CommonControllerApi().getAllPost(req, res);
        break;
        case "savecomment":
          new CommonControllerApi().updatePostComments(req, res);
          break;
          case "filterinfomation":
            new CommonControllerApi().filterInfomation(req, res);
            break;
            case "deletepost":
              new CommonControllerApi().deletePostRecord(req, res);
              break;
              case "statusupdate":
                new CommonControllerApi().statusupdate(req, res);
                break;
                case "updateAllInfo":
                  new CommonControllerApi().updateAllInfo(req, res);
                  break;
                  case "getbyid":
                    new CommonControllerApi().getbyid(req, res);
                    break;


      default:
        res.send("Called api route is incorrect!");
    }
  };
  
  CommonControllerApi.prototype.getbyid =async(req ,res ,next)=>{
    await Post.findOne({_id: req.query.id} , function (err ,result){
      if(!err){
        res.status(200).json(result);
      }else{
        res.status(200).json(err);
      }  
    }).clone()
    .catch(function (err) {
      console.log(err);
    });
  }

  CommonControllerApi.prototype.updateAllInfo =async(req ,res ,next)=>{
    await Post.updateOne({_id: req.query.id, $set:req.body} , function (err ,result){
      if(!err){
        res.status(200).json(result);
      }else{
        res.status(200).json(err);
      }  
    }).clone()
    .catch(function (err) {
      console.log(err);
    });
  }

  CommonControllerApi.prototype.statusupdate =async(req ,res ,next)=>{
    console.log(req.body)
    const _query ={_id:req.body._id , $set:{status:!req.body.status}}
      try{
        await Post.updateOne(_query,function(err ,result){
          if(!err){
            res.status(200).json(result);
          }else{
            res.status(200).json(err);
          }  
        }).clone()
        .catch(function (err) {
          console.log(err);
        });
      }catch(e){
        throw e
      }
  }

  CommonControllerApi.prototype.deletePostRecord = async(req ,res ,next)=>{
    console.log(req.query.id)
    const _query ={"_id":req.query.id}
      try{
        await Post.deleteOne(_query,function(err ,result){
          if(!err){
            res.status(200).json(result);
          }else{
            res.status(200).json(err);
          }  
        }).clone()
        .catch(function (err) {
          console.log(err);
        });
      }catch(e){
        throw e
      }
  }
  CommonControllerApi.prototype.filterInfomation = async(req ,res ,next)=>{
    const _query = (req.query.id == '')?{}:{"title": { $regex: "^" + req.query.id }}
      try{
        await Post.find(_query,function(err ,result){
          if(!err){
            res.status(200).json(result);
          }else{
            res.status(200).json(err);
          }  
        }).clone()
        .catch(function (err) {
          console.log(err);
        });
      }catch(e){
        throw e
      }
  }

  CommonControllerApi.prototype.updatePostComments = async (req ,res ,next)=>{
    const _reqObj = req.body;
    console.log('ds')
    try{
        await Post.updateOne({_id:req.body.id , $set:{comment:req.body.comment}})
    }catch(e){
      throw e 
    }
}   


  CommonControllerApi.prototype.createPost = async (req ,res ,next)=>{
    const _reqObj = req.body;
    try{
      console.log(_reqObj)
      const post = new Post(_reqObj);
      if (await post.save()) {
        res.status(200).json(AppConstants.SAVE_MESSAGE);
      }
    }catch(e){
      throw e 
    }
}   



CommonControllerApi.prototype.getAllPost = async (req ,res ,next)=>{
      try{
        await Post.find({} , function (err , result){
          if(!err){
            res.status(200).json(result);
          }else{
            res.status(200).json(err);
          }
        })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
      }catch(e){
        throw e 
      }
}

module.exports = new CommonControllerApi();