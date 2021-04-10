const express=require('express');
const bodyParser= require('body-parser');
const ejs=require('ejs');
const http=require("https");
const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",function(request,response){
    const options = {
        "method": "GET",
        "hostname": "livescore6.p.rapidapi.com",
        "port": null,
        "path": "/matches/v2/list-live?Category=cricket",
        "headers": {
            "x-rapidapi-key": "150a996130msh4ec564514ffb082p188ec5jsn2e58347b54a7",
            "x-rapidapi-host": "livescore6.p.rapidapi.com",
            "useQueryString": true
        }
    };
    var sitereturns=[];
    const req = http.request(options, function (res) {
        const chunks = [];
        sitereturns;
        res.on("data", function (chunk) {
            chunks.push(chunk);
            var result=JSON.parse(chunk);
            var Progress=result.Stages[0].Events[0].EpsL;
            var team1=result.Stages[0].Events[0].T1[0].Nm;
            var team2=result.Stages[0].Events[0].T2[0].Nm;
            var score=result.Stages[0].Events[0].Tr1C1;
            var wickets=result.Stages[0].Events[0].Tr1CW1;
            var overs=result.Stages[0].Events[0].Tr1CO1;
            console.log(result);
            response.render("home",{team1: team1,team2: team2,score: score,wickets: wickets, overs: overs});
            //response.send(result);
            //, score: score, wickets: wickets, overs: overs}
        });
        
        // console.log(sitereturns);
        // res.on("end", function () {
        //     const body = Buffer.concat(chunks);
        //     console.log(body.toString());
        // });
        
    });
    
    req.end();
    
})

// app.get("/json",function(request,response){
//     const options = {
//         "method": "GET",
//         "hostname": "livescore6.p.rapidapi.com",
//         "port": null,
//         "path": "/matches/v2/list-live?Category=cricket",
//         "headers": {
//             "x-rapidapi-key": "150a996130msh4ec564514ffb082p188ec5jsn2e58347b54a7",
//             "x-rapidapi-host": "livescore6.p.rapidapi.com",
//             "useQueryString": true
//         }
//     };
//     var sitereturns=[];
//     const req = http.request(options, function (res) {
//         const chunks = [];
//         sitereturns;
//         res.on("data", function (chunk) {
//             chunks.push(chunk);
//             var result=JSON.parse(chunk);
//             var Progress=result.Stages[0].Events[0].EpsL;
//             var team1=result.Stages[0].Events[0].T1[0].Nm;
//             var team2=result.Stages[0].Events[0].T2[0].Nm;
//             var score=result.Stages[0].Events[0].Tr1C1;
//             var wickets=result.Stages[0].Events[0].Tr1CW1;
//             var overs=result.Stages[0].Events[0].Tr1CO1;
//             // console.log(result);
//             //response.render("home",{team1: team1,team2: team2,score: score,wickets: wickets, overs: overs});
//             response.send(result);
//             //, score: score, wickets: wickets, overs: overs}
//         });
        
//         // console.log(sitereturns);
//         // res.on("end", function () {
//         //     const body = Buffer.concat(chunks);
//         //     console.log(body.toString());
//         // });
        
//     });
    
//     req.end();
// })
app.post("/",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Server running on port 3000");
})
