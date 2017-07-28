var express = require('express'),
    morgan = require('morgan'),
    fs = require("fs"),
    bodyParser = require('body-parser'),
    iconv = require('iconv-lite');
var app = express();


app.use(express.static("."));
app.use(morgan('dev'));
app.use(morgan('short'));
app.listen(23333);


var mysql = require('mysql');
var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "bh7z7h4t",
    port : "3306",
    database : "tsingbbs",
});

//创建一个connection
connection.connect(function(err){
    if(err){
          console.log('[query] - :'+err);
        return;
    }
      console.log('[connection connect]  succeed!');
});

//执行SQL语句,判断是否连接成功
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
     console.log('The solution is: ', rows[0].solution);  
});


//app.all("*",function(req,res,next){
//    res.header("Access-Control-Allow-Origin","*");
//    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
//    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//    next();
//});

app.use(bodyParser.urlencoded({extended:true}));

//1.根据昵称和密码查询用户，若查到返回 状态码M500、用户id、用户类型、用户学校，若没有则返回状态码M404
app.post('/userlogin',function(req,res){
    let sql = 'select user_id,user_type,user_school from tsingbbs.user where user_name = \"' + req.body.name + '\" and user_password = \"'
    + req.body.password + '";';

    connection.query(sql,function (err, result) {
        if(err){
            res.json({
                code:"M404",
                data:null
            })
        }
        else{
            if (result.length > 0){
                res.json({
                    code:"M200",
                    data:result[0]
                });
            }
            else {
                res.json({
                    code:"M404",
                    data:null
                });
            }
        }
    });
});

//2.根据ID查询用户的信息
app.post('/userinfo',function(req,res){
    let data = req.body;
    let sql = 'select user_name,user_type,user_school from tsingbbs.user where user_id = "' + data.user_id + '";';
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        if (result.length === 0)
        {
            res.json({
                code:"M404"
            })
        }
        else{
            res.json({
                code:"M200",
                data:result
            });
        }
    });
});


//3.给定用户id，返回他的通知表
app.post('/userinform',function(req,res){
    let user_id = req.body.user_id;
    console.log(req.body.user_id);
    var sql = "select * from tsingbbs.user_message where user_id = \"" + user_id + "\";";
    connection.query(sql,function (err, result) {
        if(err){
            res.json({
                code:"M404",
                data:null
            })
        }
        console.log(result);
        if (result.length > 0){
            res.json({
                code:"M200",
                data:result
            });
        }
        else {
            res.json({
                code:"M404",
                data:null
            });
        }
    });
});

//查询4.返回所有板块的id，板块名字、描述(测试完成)
app.get("/loadAllSections",function(req,res){
    let sql = "select section_id,section_name,section_comment,section_color from tsingbbs.section;";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        res.json({
           code:"M200",
           data:result
        });
    });
});

//查询5.给定用户id，返回他写的所有的帖子id、帖子标题、帖子内容（第一层）(测试完成)
app.post('/userposts',function(req,res){
    let data = req.body;
    let sql = "select post_id,post_title,fatherSection_id,fatherSubsection_id,content from tsingbbs.post where author_id = \"" + data.user_id + "\";";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        res.json({
            code:"M200",
            data:result
        })
    });
});


//查询5.根据板块的id，查询所有热门版面的id、名字、描述、颜色
app.post("/loadSectionInfo",function(req,res){
    let data = req.body;
    let sql = "select subsection_id,subsection_name,subsection_comment,subsection_color,hot,subsection_type from tsingbbs.subsection where fatherSection_id ='"
        + data.section_id + "';";
    console.log(sql);
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        console.log(result);
        res.json({
            code:"M200",
            data:result
        })
    });
});

//6.根据版面ID返回版面的标题
app.post("/loadSubSectionTitle",function(req,res){
    let data = req.body;
    let sql = "select subsection_name,subsection_comment from tsingbbs.subsection where subsection_id ='" + data.SubSection_id + "';" ;
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        res.json({
            code:"M200",
            data:result
        })
    });
});

//查询8.根据版面的id，查询版面下所有的帖子id、标题、作者、第一层内容、是否精华(测试完成)
app.post("/loadSubSection",function(req,res){
    let data = req.body;
    let sql = "select post_id,post_title,author_id,author_name,content,essence from tsingbbs.post where fatherSubsection_id = '"
        + data.SubSection_id + "';";
    console.log(data.SubSection_id);
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        res.json({
            code:"M200",
            data:result
        })
    });
});


//查询9.返回所有用户列表(测试完成)
app.get('/getAllUser',function(req,res){
    let sql = "select * from tsingbbs.user";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            });
        }

        console.log('--------------------------SELECT9----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        res.json({
            code:"M200",
            data:result
        })
    });
});

//查询2.根据用户id查询个人信息，查询他所有收藏的帖子id、帖子名称、帖子一楼内容 与 版面id、版面名称、版面描述(测试完成)
//function query2_userCollectedPost(user_id)
app.post("/searchCollectionPost",function(req,res){
    let data = req.body;
    let sql = "select post_id from tsingbbs.rela_user_collectedpost where user_id = '" + data.user_id + "';";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        res.json({
            code:"M200",
            data:result
        });
    });
});

//function query2_userCollectedSubsection(user_id)
//{
app.post("/searchCollectionSubSection",function(req,res){
    let data = req.body;
    let sql = "select subsection_id from tsingbbs.rela_user_collectedsubsection where user_id = '" + data.user_id + "';";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        res.json({
            code:"M200",
            data:result
        });
    });
});

//function query2_userCollectedSection(user_id)
//{
app.post("/searchCollectionSection",function(req,res){
    let data = req.body;
    let sql = "select section_id from tsingbbs.rela_user_collectedsection where user_id = '" + data.user_id + "';";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        res.json({
            code:"M200",
            data:result
        });
    });
});


//13.通过一个帖子ID，返回帖子所在的SectionID和subSectionID，帖子的名字，作者id和名字，第一层的内容
app.post('/getPostInfo',function(req,res){
    let data = req.body;
    let sql = "select fatherSection_id,fatherSubsection_id,post_title,author_id,author_name,content from tsingbbs.post where post_id = '"
        + data.post_id + "';" ;
    console.log(data);
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            });
        }
        res.json({
            code:"M200",
            data:result
        });
    });
});


//14.通过一个帖子ID，返回后面每一层的作者ID、姓名\楼层和内容
app.post('/getPostContent',function(req,res){
    let data = req.body;
    let sql = "select author_id,author_name,reply_floor,reply_content from tsingbbs.rela_post_reply where post_id = '" + data.post_id + "';" ;
    console.log(data);
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            });
        }
        res.json({
            code:"M200",
            data:result
        });
    });
});


//////////////////////////////////////////////////////////


//1.给定帖子标题、内容，用户id，用户名新建一个帖子(测试完毕)
app.post("/addPost",function(req,res){
    let sql = "select count(*) from tsingbbs.post;";
    let current_num = 0;
    let data = req.body;
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        else{
            current_num = parseInt( result[0]["count(*)"] );
            let total_num = 100000 + current_num + 1;
            let post_id = "p" + String(total_num);
            sql = "insert into tsingbbs.post values('" + post_id + "','" + data.post_title + "','" + data.author_id + "','"
                + data.author_name + "','" + String(0) + "','" + data.content+ "','" + String(0)  + "','" + data.SubSection_id
                + "','" + data.Section_id +"','"+  String(0) + "','" + String(0)+"');";
            connection.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    res.json({
                        code:"M404"
                    })
                }
                else{
                    sql="update tsingbbs.user set num_totalPosts=num_totalPosts+1 where user_id ='"+data.author_id+"';";
                    connection.query(sql,(err, result)=>{
                        if(err){
                            console.log('[SELECT ERROR] - ',err.message);
                            res.json({
                                code:"M404"
                            })
                        }
                        else{
                            res.json({
                                code:"M200",
                                post_id:post_id
                            })
                        }
                    })
                }
            });
        }
    });
});

//2.注册用户 给定用户名、密码、学校，添加到用户表(已测试完毕)
app.post('/userSignUp',function(req,res){
    //统计表中现在有多少人
    let sql = "select count(*) from tsingbbs.user;";
    let current_num = 0;
    let data = req.body;
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        current_num = parseInt( result[0]["count(*)"] );
        var total_num = 100000 + current_num;
        var user_id = "u" + String(total_num + 1);
        sql = "insert into tsingbbs.user values('" + user_id + "','" + data.user_name + "','"
            + data.user_password + "','" + data.user_school + "'," + String(0) +","+String(0) +");" ;
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.json({
                    code:"M404"
                });
            }
            res.json({
                code:"M200",
                user_id:user_id
            })
        });

    });

});

//3.给定板块的标题、描述 向板块表中加入一个新板块(测试完毕)
app.post('/addSection',function(req,res){
    let sql = "select count(*) from tsingbbs.section;";
    let current_num = 0;
    let data=req.body;
    console.log(data);
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        console.log(data);
        current_num = parseInt( result[0]["count(*)"] );
        let total_num = 100000 + current_num + 1;
        let section_id = "s" + String(total_num);
        sql = "insert into tsingbbs.section values('" + section_id + "','" + data.section_comment + "','"
            + data.section_name + "','" + data.section_color  +"');" ;
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.json({
                    code:"M404"
                })
            }
            res.json({
                code:"M200",
                section_id:section_id
            })
        });

    });
});

//4.给定板块id与用户id，加入用户的收藏(测试完成)
app.post('/collectSection',function(req,res){
    let data = req.body;
    let sql = "insert into tsingbbs.rela_user_collectedsection values('" +  data.user_id + "','" + data.section_id + "');";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            });
        }
        res.json({
            code:"M200",
        });
    });
});


//5.给定版面id与用户id，加入用户的收藏(测试完成)
app.post('/collectSubSection',function(req,res){
    let data = req.body;
    let sql = "insert into tsingbbs.rela_user_collectedsubsection values('" +  data.user_id + "','" + data.subsection_id + "');";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            });
        }
        res.json({
            code:"M200",
        });
    });
});

//6.给定帖子id与用户id，加入用户的收藏(测试完成)
app.post('/collectPost',function(req,res){
    let data = req.body;
    let sql = "insert into tsingbbs.rela_user_collectedpost values('" +  data.user_id + "','" + data.post_id + "');";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            });
        }
        res.json({
            code:"M200",
        });
    });
});

//7.给定帖子id，删除该帖子，并从所属版面中将帖子抹除(测试完成)
app.post('/deletePost',function(req,res){
    let data = req.body;
    let sql = "delete from tsingbbs.post where post_id = '" + data.post_id + "';";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        sql =  "delete from tsingbbs.subsection_post where post_id = '" + data.post_id + "';";
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.json({
                    code:"M404"
                })
            }
        });
        res.json({
            code:"M200"
        });
    });
});

//8.给定版面的id，删除该版面(测试完成)
app.post('/deleteSubSection',function(req,res){
    let data = req.body;
    let sql = "delete from tsingbbs.subsection where subsection_id = '" + data.subsection_id + "';";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }

        sql =  "delete from tsingbbs.post where fatherSubsection_id = '" + data.subsection_id + "';";
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.json({
                    code:"M404"
                })
            }
            res.json({
                code:"M200"
            })
        });
    });
});

//9.给定板块的id，从板块表中删除该板块（删除所有东西，包括版面、以及下面的帖子）
app.post('/deleteSection',function(req,res){
    let data = req.body;
    let sql = "delete from tsingbbs.section where section_id = '" + data.section_id + "';";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }

        sql =  "delete from tsingbbs.subsection where fatherSection_id = '" + data.section_id + "';";
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.json({
                    code:"M404"
                })
            }
            sql =  "delete from tsingbbs.post where fatherSection_id = '" + data.section_id + "';";
            connection.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    res.json({
                        code:"M404"
                    })
                }
                res.json({
                    code:"M200"
                })
            });
        });
    });
});


//10.给定帖子id，作者id，作者姓名，回复内容，回复类型（0是普通回复，1是跟帖），在一个帖子下面回帖。(测试完成)
app.post('/replyPost',function(req,res){
   //统计表中的帖子个数
    let data = req.body;
    let sql = "select count(*) from tsingbbs.rela_post_reply where post_id = '" + data.post_id + "' ;";
    let reply_floor = 0;
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        else{
            reply_floor = parseInt( result[0]["count(*)"] ) + 2;
            sql = "insert into tsingbbs.rela_post_reply values('" + data.post_id + "','" + data.author_id + "','"
                + data.author_name + "','"  + data.reply_content+ "',";
            sql = sql + String(reply_floor)  + "," + String(0)+");";
            connection.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    res.json({
                        code:"M404"
                    });
                }
                else{
                    res.json({
                        code:"M200",
                        data:result
                    });
                }
            });
        }
    });
});

//11.给定帖子id，将它设置为精华贴
app.post('/setStarPost',function(req,res){
    //统计表中的帖子个数
    let data = req.body;
    let sql = "update tsingbbs.post set essence = " + String(data.essence) + " where post_id = '" + data.post_id + "';";
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            });
        }
        res.json({
            code:"M200"
        });
    });
});

//12.给定版面的名字、描述、颜色，以及所在版块 加入一个新的版面(测试完毕)
//function operation5_addSubsection(subsection_name,subsection_comment,subsection_color,fatherSection_id)
app.post('/addNewSubSection',function(req,res){
    //统计表中的帖子个数
    let data = req.body;
    let sql = "select count(*) from tsingbbs.subsection;";
    let current_num = 0;
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:"M404"
            })
        }
        current_num = parseInt( result[0]["count(*)"] );
        let total_num = 100000 + current_num + 1;
        let subsection_id = "b" + String(total_num);
        sql = "insert into tsingbbs.subsection values('" + subsection_id + "','" + data.subsection_name
            + "','" + data.subsection_comment + "','" + data.subsection_color + "'," ;
        sql = sql +  String(0) + ",'"  + data.subsection_type  + "','" + data.fatherSection_id  + "');";
        console.log(sql);
        console.log(data.subsection_type);
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                res.json({
                   code:"M404",
                });
            }
            res.json({
                code:"M200",
                subsection_id:subsection_id
            });
        });

    });
});