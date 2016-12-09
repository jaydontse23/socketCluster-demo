
var playerName = 'user-' + Math.round(Math.random() * 10000);
var playerMoney = 5000;
var player={
	playerName: playerName,
	playerMoney: playerMoney
}

var socket = socketCluster.connect();
socket.on('error',function(err){
	console.log("there is a error:"+err)
})

socket.on("connect",function(status){
	console.log("client have connected the server!!");

})



var thisGameChannel = socket.subscribe('pushData');

thisGameChannel.on('subscribeFail', function (err) {
	console.log('Failed to subscribe to the sample channel due to error: ' + err);
});


thisGameChannel.watch(function (data) {
	if(data.player.playerName!=player.playerName){
		console.log('Sample channel message:', data.arr);

		var container1 = document.getElementById('dicebox1');
		$('.redpacket2').remove();
		var arr= data.arr;

		for (var i = 0 ; i<6;i++) {
			container1.appendChild(dicefun.createDice(arr[i]+1,i,"other"));
		}
	}
});




var dicefun = {
	init:function(){
		var container = document.getElementById('dicebox');
		$('.redpacket1').remove();
		var arr = this.randomFun();
		var data= {
			player: player,
			arr: arr
		}
		socket.emit("startGame",data);

		for (var i = 0 ; i<6;i++) {
			container.appendChild(this.createDice(arr[i]+1,i,"me"));
		}
	},
	randomFun:function(){
        var arr = [];
        for (var i = 0 ; i<6;i++ ) {
          arr.push(Math.floor(Math.random()*6));
        }
        return arr;
      },
	createDice:function(num,i,person){
		var image = document.createElement('img');
			person=="me"?image.setAttribute("class","redpacket1"):image.setAttribute("class","redpacket2");
   		  	// image.setAttribute("class","redpacket");
   		  	image.id = "redpacket" + i;
    	  	image.src = 'img/' + num +'.jpg';
    	  	return image;
	},
	
}
