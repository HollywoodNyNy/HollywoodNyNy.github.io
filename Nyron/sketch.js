// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCUZEvfbSXcVzVrRn1wX5Ef4RM10pPYJt4",
  authDomain: "some-foolery.firebaseapp.com",
  databaseURL: "https://some-foolery.firebaseio.com",
  projectId: "some-foolery",
  storageBucket: "some-foolery.appspot.com",
  messagingSenderId: "69278025930",
  appId: "1:69278025930:web:8e438cfca59c0b7b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database()


let ny= document.getElementById("ny")
let x
let y
let n
let m
let j
let k
let direction_horiz1
let direction_vert1
let direction_horiz2
let direction_vert2
let countEnemy= 4
let level= 1
let time= 10
let scoreboard = {  }

function setup() {
  x=100
  y=500
  n=100
  m=100
  j= [200,75,395,250,170,45,106,333,282,163,155] 
  k= [80,65,200,300,230,140,90,222,260,245,255]
  direction_horiz1= 1
  direction_vert1= 1
  direction_horiz2= [1,1,1,1,1,1,1,1,1,1,1]
  direction_vert2= [1,1,1,1,1,1,1,1,1,1,1]                            
  score=0

  countEnemy=4
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (time > 0) {

  background(220);
  textSize(20)
  fill(78,34,34)
  text("Score:" +score,500,50)
  text("Time:" +time.toFixed(1
                            ),100,50)
  fill(88,214,141)
  circle(x,y,50)
  fill(234,238,111)
  circle(n,m,70)
  fill(178,34,34)

  time = time-0.02
  n = n + 5*direction_horiz1
  m = m + 5*direction_vert1

  if (touches.length == 0)   {
	  
  if (keyIsDown(LEFT_ARROW)){
    x = x - 9
  }
  if (keyIsDown(RIGHT_ARROW)){
    x = x + 9
  }
  if (keyIsDown(UP_ARROW)){
    y = y - 9
  }
  if (keyIsDown(DOWN_ARROW)){
    y = y + 9
  }	

}

else { 
		 100= touches[0].x
		 500= touches[0].y
}

	  

  if ( n > width || n<0) {
	direction_horiz1 = direction_horiz1*-1
}
    if ( m > height || m<0) {
	direction_vert1 = direction_vert1*-1
}
  if(dist(x,y,n,m) <70 +50) {
    score = score + 1
  }
  
  if (score > 100 && level == 1) {
  countEnemy=countEnemy+ 1
  level=2
  }
  if (score > 300 && level == 2) {
  countEnemy=countEnemy+ 1
  level=3
  }
  if (score > 500 && level == 3) {
  countEnemy=countEnemy+ 1
  level=4
  }
  if (score > 700 && level == 4) {
  countEnemy=countEnemy+ 1
  level=5
  }
  if (score > 1000 && level == 5) {
  countEnemy=countEnemy+ 3
  level=6
  }
  
  for (i=0; i<countEnemy; i=i+1) {
    
    circle(j[i],k[i],80)
    j[i] = j[i] - 5*direction_horiz2[i]
    k[i] = k[i] - 5*direction_vert2[i]
    
    if ( j[i] > width || j[i]<0) {
	direction_horiz2[i] = direction_horiz2[i]*-1
}
    if ( k[i] > height || k[i]<0) {
	direction_vert2[i] = direction_vert2[i]*-1
}
  if(dist(x,y,j[i],k[i]) <70 +50) {
    score = score - 1
  }
  }
  }
  else {
    ny.innerHTML = "Name? <input id='name'><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
    noLoop()
  }
}

function restart() { 
        let name = document.getElementById("name")
		name = name.value 
	    database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("Scoreboard:" +JSON.stringify(scoreboard,null,1)) 
		time = 10
		score = 0
        countEnemy=4
        level=1
        generate_leaderboard()
		loop()
		ny.innerHTML = ""
}
function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
  alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
