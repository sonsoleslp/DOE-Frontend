var diagrama = function(){

		var medios = mediums
		var numeromedios = medios.length;
		var moduloro = 0;

		medios.forEach(function(mm){
			mm.lambda = 1 / Math.sqrt(mm.er * mm.mur) * 300 / freq;
			mm.eta = 120*Math.PI	/ Math.sqrt(mm.er /mm.mur)
		});
		var m = medios[numeromedios-1];
		m.moduloro=moduloro.toFixed(2);
		
		var fasei = 0;
		m.fasei=fasei;
		var zvista = complejo(m.eta,0);
		var zant = objeto(zvista);

		var ro = division(      resta(zant  , complejo(m.eta, 0)   )        ,        suma(complejo(m.eta,0) , zant)         ); 

		var COE = 1;
		m.COE = COE.toFixed(2)
 

		for (var i = numeromedios - 2; i >= 0; i--) {

			m = medios[i];
			
			m.eta = 120 * Math.PI  / Math.sqrt(m.er * m.mur);
			var beta = 2 * Math.PI /(m.lambda) ;
			var arg = beta * m.grosor;

			var num1 = complejo(0, 0);
			var num2 = complejo(0, 0);
			var den1 = complejo(0, 0);
			var den2 = complejo(0, 0);
			var factor = complejo(m.eta, 0);

		
			num1 = multiplicacion(zant,complejo(Math.cos(arg), 0));
			num2 = complejo(0, m.eta*Math.sin(arg));
			den1 = complejo(m.eta*Math.cos(arg), 0);
			den2 = multiplicacion(complejo(0,1),multiplicacion(zant,complejo(Math.sin(arg), 0)));
			zvista = division(multiplicacion(factor,suma(num1,num2)),suma(den1,den2));
		    ro = division(      resta(zant, complejo(m.eta,0)   )        ,        suma(complejo(m.eta,0) , zant)         );

			moduloro = modulo(ro);
			COE = (1 + moduloro) / (1 - moduloro);
			m.COE = COE.toFixed(2);
			m.moduloro = moduloro.toFixed(2)
			m.fasei = fase(ro);
			

			zant = objeto(zvista);

			
		}
	};

diagrama()
