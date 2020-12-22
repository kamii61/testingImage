
const pool= require("./db");
exports.index = function(req, res,next){
    message = '';
   if(req.method == "POST"){
      var {first_name,last_name,mob_no,user_name, password}=req.body;
      var {id}=req.params;
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		var file = req.files.uploaded_image;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, async(error)=>{
               
                    try {
                     var sql = await pool.query("INSERT INTO users_image(first_name,last_name,mob_no,user_name, password ,image) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *"
                     ,[first_name,last_name,mob_no,user_name, password 
                        ,img_name]).then((results)=>{
                     
                     var newestId=results.rows[0].id;
                  
                     res.redirect("/profile/"+newestId)
    next
                   
                     
                     });
                    } catch (error) {
                    console.error(message.error);
                    }         
	             
                  });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }

   } else {
      res.render('index');
   }

};
exports.profile = async(req, res,results)=>{
   try {
      var message = ''; 
      var id = req.params.id;
       var sql=await pool.query("SELECT * FROM users_image WHERE id=$1",[id]);
       console.log(results.rows);
       if(results.length <= 0)
       message = "Profile not found!";
       
        res.render('profile.ejs',{data:results, message: message})
   } catch (error) {
      console.error(message.error);
   }
  
 
  
};