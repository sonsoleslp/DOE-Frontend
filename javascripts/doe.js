function doe(width,height){
	var MARGEN = 10;


	var numeromedios = medios.length;
	if (numeromedios == 0)
		return;

	var largo = 0;
	var alto = height;

	// Reparte el canvas entre el grosor total
	for (var i = 0; i < numeromedios; i++) {

		largo += medios[i].grosor;

	}

	var maximoro = medios[0].moduloro;
	var minimae = medios[0].eta;
	var dx = 0;
	var total = width - 2 * (MARGEN + 1);
	var k = total / largo;
	var dif = largo / total;
	var puntonuevo = 0;
	var coef = 2 * Math.sqrt(medios[0].eta* 2 / (2 * medios[0].eta)/ (1 - medios[0].moduloro* medios[0].moduloro));
			
			
			
					

	for ( i = 0; i < numeromedios; i++) {

		dx +=  medios[i].grosor * k;
		if (medios[i].moduloro > maximoro)
			maximoro = medios[i].moduloro;
		if (medios[i].eta < maximoro)
			minimae =medios[i].eta;
		puntonuevo += medios[i].grosor / 2 * k;
		var coefi = 2 * Math.sqrt(medios[i].eta* 2 / (2 * medios[0].eta) / (1 - medios[i].moduloro *  medios[i].moduloro));
		if (coefi > coef)
			coef = coefi;
		var frac = ((120 * Math.PI) /medios[i].eta);
	 
		var COE = (1 + medios[i].moduloro)/ (1 - medios[i].moduloro);
		 

		puntonuevo += medios[i].grosor / 2 * k;
	 

	var puntos = [];

	var z = (height - 2 * MARGEN) / parseFloat(coef);

	var marg = width;
	var startX = 0;
	var startY = 0;

	var ro = 0;
	var coe = 1;

	// Comienza a dibujar el DOE de derecha a izquierda
	for (var a = numeromedios - 1; a >= 0; a--) {
		var jmax = 0;
		var imax = 0;
		var jmin = 1;
		var imin = 0;
		var m = medios[a];
		var gro = medios[a].grosor;
		var anc = k * gro;
		var beta = 2 * Math.PI / m.lambda;

		ro = m.moduloro;
		var fi = m.fasei;
		coe = m.COE;
		var mult = Math.sqrt(m.eta * 2 / (2 * medios[0].eta) / (1 - m.moduloro * m.moduloro) * (1 - medios[0].moduloro * medios[0].moduloro));
		for (var i = 0; i <= gro;) {
			// Ecuacion del doe
			var j = mult
					* Math.abs(Math.sqrt(2 * Math.cos(2 * beta * (i) + fi)
							* Math.abs(ro) + 1 + ro * ro));

			var x = parseFloat(marg - i * k - MARGEN - 3);
			var y = - parseFloat( j * z + height - MARGEN);
			if (y < MARGEN - 1){
				y = MARGEN - 1;
			}

			var punto = {x:x, y:y};

			puntos.push(punto);

			if (a == numeromedios - 1 && i == 0) {
				startX = x;
				startY = y;
			}
			i += dif;
			if (j > jmax) {
				jmax = j;
				imax = x;
			}
			if (j < jmin) {
				jmin = j;
				imin = x;
			}

		}
		if (a == 0 && m.moduloro > 0.0001
				&& jmax > (1 + m.moduloro - 0.001))
		/*	canvas.drawText("1+|ρ|", (float) imax - 3 * MARGEN,
					-(float) jmax * z + canvas.getHeight() - MARGEN, paint);                    */
		if (a == 0 && m.getModuloro() > 0.0001
				&& jmin < (1 - m.getModuloro() + 0.001))
		/*	canvas.drawText("1-|ρ|", (float) imin - 3 * MARGEN,
					-(float) jmin * z + canvas.getHeight() + MARGEN, paint);					*/

		marg -= parseFloat(anc);

	}

	//		paint.setStrokeWidth(2);
	//		paint.setColor(Color.rgb(24, 172, 112));
	puntos.forEach(function(punto){
		var endX = punto.x;
		var endY = punto.y;
	//			canvas.drawLine(startX, startY, endX, endY, paint);

		startX = endX;
		startY = endY;

	});




	}//  puntos.forEach(function(punto){console.log(JSON.stringify(punto))});

			return puntos;
}