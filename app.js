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
            console.log(result);
            response.send(result.Stages[0].Events[0].ECo);
        });
        
        // console.log(sitereturns);
        // res.on("end", function () {
        //     const body = Buffer.concat(chunks);
        //     console.log(body.toString());
        // });
        
    });
    
    req.end();
    
})
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

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
        console.log(chunk);
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();

app.listen(3000,function(){
    console.log("Server running on port 3000");
})