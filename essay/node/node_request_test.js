var request = require("request-promise");

var options = {
    method: 'POST',
    url: 'http://localhost:9000/subscribe/add',
    headers:
        {
            'postman-token': 'f464a828-f27b-d1e4-8482-a5ac74a17b0b',
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
    body: { 
        token: '180100134281510802241741', 
        target: '5a0129d7b2d359605a9c34b8',
        type: 'expert'
    },
    json: true
};


(async()=>{
    // console.log(request.get())
    for(var i = 0 ; i <200 ; i++){
        let r = await request(options)
        console.log(r)
    }

})()

// request(options), function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
// });
