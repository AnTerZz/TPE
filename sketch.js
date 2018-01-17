/* Valeurs utilisées :
Altitude : 5000ft
Coefficiend d'Oswald 0,8 (généralement compris entre 0,7 et 0,9)
aP = 0,1
aT = 0,11 (calculé)*/



var sVitesse, sIncidence, vPortance, vTrainée;

function setup() {
	createCanvas(800, 500);
	background(0,0,0);

	//images
	sky = loadImage("images/sky.jpeg");
	plane = loadImage("images/avion.png");
	portance = loadImage("images/portance.png");


	//slider
	sVitesse = createSlider(50, 120);
	sVitesse.position(30, 30);
	sIncidence = createSlider(1, 14);
	sIncidence.position(30, 80);
}


function draw() {

	//chiffres
	text(sVitesse.value().toString(), 120, 30);
	text(sIncidence.value().toString(), 120, 80);


	image(sky,0,0,800,500);
	imageMode(CENTER);
	translate(400,250);
	rotate(PI / 180 * sIncidence.value());
	image(plane,0,150,332,200);
	imageMode(CORNER);

	//Calcul Portance
	var Rz = ((1055/1000) * sq(sVitesse.value() * (514/1000)) * (142/10) * (sIncidence.value()/10))/2;
	text(nfc(Rz,0),120,30);

	//Calcul Trainée
	var Cx = ((5/100) + ((sq(11/100)*sq(sIncidence.value()))/(PI*(535/100)*(8/10))));
	var Rx = ((1055/1000) * sq(sVitesse.value() * (514/1000)) * (142/10) * Cx)/2;
	text(nfc(Rx,0), 120, 60);

	//Vecteur Portance
	vPortance = createVector(0, Rz / 120);
	strokeWeight(4);
	stroke(255, 0, 0);
	beginShape(LINES);
	vertex(0,150);
	vertex(0 - vPortance.x, 150 - vPortance.y);
	vertex(0 - vPortance.x, 150 - vPortance.y);
	vertex(0 - vPortance.x - 10 , 150 - vPortance.y + 10);
	vertex(0 - vPortance.x, 150 - vPortance.y);
	vertex(0 - vPortance.x + 10, 150 - vPortance.y + 10);
	endShape();

	//Vecteur Trainée
	vTrainée = createVector(Rx / 25, 0);
	beginShape(LINES);
	vertex(0, 150);
	vertex(0 + vTrainée.x, 150 + vTrainée.y);
	vertex(0 + vTrainée.x, 150 + vTrainée.y);
	vertex(0 + vTrainée.x - 10, 150 + vTrainée.y -10);
	vertex(0 + vTrainée.x, 150 + vTrainée.y);
	vertex(0 + vTrainée.x - 10, 150 + vTrainée.y + 10);
	endShape();
}
