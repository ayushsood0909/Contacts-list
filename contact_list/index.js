const express=require('express');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
const path=require('path');
//const db=require('./config/mongoose');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
/*app.use(function(req,res,next){
    req.name="Ayush";
    console.log('Myname called from MW1 ',req.name);
    next();
})
app.use(function(req,res,next){
    req.name="Sood"
    console.log('Myname called from MW2 ',req.name);
    next();
})*/


var contactList=[
    {
        name:"Ayush",
        phone:"999999999"
    },
    {
        name:"Ravi",
        phone:"777777777"
    },
    {
        name:"Naman",
        phone:"888888888"
    },
]

app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in finding contacts from the db');
            return;
        }
    
    return res.render('home',{
        title:'contact list',
        contact_list:contacts
    });
})
})
app.get('/profile',function(req,res){
    //console.log(__dirname);
    //res.send('<h1>Cool! It is running</h1>');
    return res.render('home');
})
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let us play with ejs!"
    });
})
app.post('/create-contact',function(req,res){
   // return res.redirect('/practice')
   console.log(req.body);
   //contactList.push(req.body);
   Contact.create({
       name:req.body.name,
       phone:req.body.phone
   },function(err,newContact){
       if(err){console.log('Error in creating the file!');return;}
   
   console.log('**********',newContact);
   return res.redirect('back');
});
});

app.get('/delete-contact',function(req,res){
    console.log(req.query);
    let id=req.query.id;
    //let phone=req.query.phone;
    //let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    //if(contactIndex!=-1){
      //  contactList.splice(contactIndex,1);
    //}
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from the database!')
        }
    
    return res.redirect('back');
});
});
app.listen(port,function(err){
    if(err)
    {
        console.log('Error in running the file');
    }
    console.log('Yup! My express server is running on Port ',port);
})
