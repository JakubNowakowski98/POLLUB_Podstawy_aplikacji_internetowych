function pokaz(id, indeks)
{
 var tresc="";
 switch (id)
 { 
	case 2: tresc += pokazAktualnosci(); break;
	case 3: tresc += pokazLekarzy(); break;
	case 4: tresc += pokazKontakt();break; 
	case 5: tresc += pokazFormularz(indeks);break;
	case 7: tresc += pokaz7();break;
	default: tresc += pokazO();
 }
 //pobierz element o wskazanym id i ustaw jego nową zawartość:
 document.getElementById('blok').innerHTML = tresc; 
}

function pokaz7()
{
	var tresc ='<header class="jumbotron my-4">'+
                '<h1 class="display-3">Opinie</h1>'+
                '<p class="lead">Możesz tutaj wystawić oraz odczytać opinie dot. lekarzy pracujących w naszej placówce. Im większa nota, tym lepiej oceniany jest pracownik. </p>'+
				'</header>'+
				'Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>'+
				'<tr><td>Ocena</td><td><select id="rating"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><//select></td></tr></table></form></br>'+
				'<button onclick="zapiszOpinie()">Zapisz opinię</button> <button onclick="pokazOpinie()">Pokaz opinie</button> <button onclick="usunOpinie()">Usun wszystkie opinie</button></br></br><div id="opinia"></div>';
	return tresc;
}

function zapiszOpinie()
{
	var item = {};
	item.kto = document.getElementById("lekarzo").value;
	item.ocena = document.getElementById("rating").value;
	var lista = JSON.parse(localStorage.getItem('lista'));
	if (lista===null) lista=[];
	lista.push(item);
	localStorage.setItem('lista', JSON.stringify(lista));
}

function pokazOpinie()
{
	var lista = JSON.parse(localStorage.getItem('lista'));
	 var el=document.getElementById('opinia'); 
	 var str='<h2>Najlepiej oceniany lekarz:</h2>';
	 if (lista===null) str+='<p>Pusta lista opinii lekarzy</p></br>';
	 else 
	 {
		 var lekarze = ['dr Alojzy Nowak', 'dr Weronika Zawadzka', 'dr Beata Malinowska', 'dr Grzegorz Kowalski', 'dr Alina Kos', 'dr Błażej Nowak', 'dr Grzegorz Dom', 'dr Jan Kowalski', 'dr Marek Stefaniak', 'dr Robert Medyczny', 'dr Michał Pawlak', 'dr Paweł Olejnik'];
		 var licznikWystapien = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		 var licznikOcen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		 var max=0;
		 var indeks=0;
		 for(i=0; i<lista.length; i++)
		 { 
			for(j=0; j<lekarze.length; j++)
			{
				if(lista[i].kto==lekarze[j])
				{
					licznikWystapien[j]=licznikWystapien[j]+1;
					licznikOcen[j]=licznikOcen[j]+parseInt(lista[i].ocena);
				}
			}
		 }
		 for(i=0; i<lekarze.length; i++)
		 { 
			 if(licznikOcen[i]/licznikWystapien[i]>max)
			 {
				max=licznikOcen[i]/licznikWystapien[i];
				indeks=i;
			 }
		 }
		 str+=lekarze[indeks]+' otrzymał(a) średnią ocen: '+max.toFixed(2);
		 str+='</br>';
	 }
	 str+="<h2>Opinie:</h2>";
	 if (lista===null) str+='<p>Pusta lista opinii lekarzy</p></br>';
	 else 
	 {
		 for(i=0; i<lista.length; i++)
		 { 
			 str+="<button class='usun' onclick='usunWybranaOpinie("+i+")' >X </button> ";
			 str+="<button class='edytuj' onclick='edytuj("+i+")' >O </button> ";
			 str+=lista[i].kto +': ';
			 str+= lista[i].ocena+'<br />'; 
		 }
		 str+='</br>';
	 }
	 el.innerHTML=str;
}

function usunOpinie()
{
	localStorage.clear();
	var show="";
	document.getElementById("opinia").innerHTML=show;
	pokazOpinie();
}

function usunWybranaOpinie(i)
{ 
	 var lista = JSON.parse(localStorage.getItem('lista'));
	 if (confirm("Usunąć wybraną opinię?")) lista.splice(i,1);
	 localStorage.setItem('lista', JSON.stringify(lista)); 
	 pokazOpinie();
}

function edytuj(i)
{ 
	var lista = JSON.parse(localStorage.getItem('lista'));
	var tresc ='<header class="jumbotron my-4">'+
    '<h1 class="display-3">Opinie</h1>'+
    '<p class="lead">Możesz tutaj wystawić oraz odczytać opinie dot. lekarzy pracujących w naszej placówce. Im większa nota, tym lepiej oceniany jest pracownik. </p>'+
	'</header>';
	if(lista[i].kto == "dr Alojzy Nowak")
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option selected>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
	else if ((lista[i].kto == "dr Weronika Zawadzka"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option selected>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';

	else if ((lista[i].kto == "dr Beata Malinowska"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option selected>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Grzegorz Kowalski"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option selected>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Alina Kos"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option selected>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Błażej Nowak"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option selected>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Grzegorz Dom"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option selected>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Jan Kowalski"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option selected>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Marek Stefaniak"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option selected>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Robert Medyczny"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option selected>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Michał Pawlak"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option selected>dr Michał Pawlak</option><option>dr Paweł Olejnik</option></select></td></tr>';
		
	else if ((lista[i].kto == "dr Paweł Olejnik"))
		tresc+='Dodaj opinię:</br><form><table><tr><td>Lekarz</td><td><select id="lekarzo"><option>dr Alojzy Nowak</option><option>dr Weronika Zawadzka</option><option>dr Beata Malinowska</option><option>dr Grzegorz Kowalski</option><option>dr Alina Kos</option><option>dr Błażej Nowak</option><option>dr Grzegorz Dom</option><option>dr Jan Kowalski</option><option>dr Marek Stefaniak</option><option>dr Robert Medyczny</option><option>dr Michał Pawlak</option><option selected>dr Paweł Olejnik</option></select></td></tr>';
	if((lista[i].ocena == "1"))
		tresc+='<tr><td>Ocena</td><td><select id="rating"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option><//select></td></tr></table></form></br>';
	
	else if((lista[i].ocena == "2"))
		tresc+='<tr><td>Ocena</td><td><select id="rating"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><//select></td></tr></table></form></br>';
		
	else if((lista[i].ocena == "3"))
		tresc+='<tr><td>Ocena</td><td><select id="rating"><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option><//select></td></tr></table></form></br>';
	
	else if((lista[i].ocena == "4"))
		tresc+='<tr><td>Ocena</td><td><select id="rating"><option>1</option><option>2</option><option>3</option><option selected>4</option><option>5</option><//select></td></tr></table></form></br>';
	
	else if((lista[i].ocena == "5"))
		tresc+='<tr><td>Ocena</td><td><select id="rating"><option>1</option><option>2</option><option>3</option><option>4</option><option selected>5</option><//select></td></tr></table></form></br>';
	
	tresc+='<button onclick="edytujOpinie('+i+')">Edytuj opinię</button> <button onclick="pokazOpinie()">Pokaz opinie</button> <button onclick="usunOpinie()">Usun wszystkie opinie</button></br></br><div id="opinia"></div>';
	document.getElementById('blok').innerHTML = tresc;
	pokazOpinie();
}

function edytujOpinie(i)
{
	if (confirm("Zmienić produkt danymi wybranymi powyżej?"))
	{
		 var item = {};
		 item.kto = document.getElementById('lekarzo').value;
		 item.ocena = document.getElementById('rating').value;
		 var lista = JSON.parse(localStorage.getItem('lista'));
		 if (lista===null) lista=[]; 
		 lista[i]=item; 
		 localStorage.setItem('lista', JSON.stringify(lista));
	}
	pokaz(7,0);
	pokazOpinie();
}


document.addEventListener("DOMContentLoaded", function() 
{
	 var but1 = document.getElementById("b1");
	 but1.addEventListener('click', function()
	 {
		 fetch("http://localhost/JN_projekt_koncowy_final/dane/oPrzychodni.txt")
		 .then( response => {return response.text();} )
		 .then( dane => { document.getElementById('blok').innerHTML = dane; }) 
	 },
	 false); 
})

function pokazO()
{
	var tresc='<header class="jumbotron my-4">'+
                '<h1 class="display-3">Witaj na stronie Przychodni</h1>'+
                '<p class="lead">Znajdziesz tutaj podstawowe informacje o naszej placówce w zakładce "o przychodni", listę lekarzy tutaj pracujących oraz możliwość zapisu na wizytę do wybranego specjalisty w zakładce "zapisy", listę zmian na stronie i nie tylko w zakładce "aktualności" a także dane kontaktowe w zakładce "kontakt". </p>'+
            '</header>'+
            '<div class="row text-center">'+
                '<div class="col-lg-4 col-md-6 mb-4">'+
                    '<div class="card h-100">'+
                        '<img class="card-img-top" src="img/ordynator.jpg" alt="..." width="500" height="325"/>'+
                        '<div class="card-body">'+
                            '<h4 class="card-title">Ordynator</h4>'+
                            '<p class="card-text">Ordynatorem naszej placówki jest dr Marian Łubicz. Wiele osób twierdzi, że przypomina aktora - Krzysztofa Kowalewskiego.</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 mb-4">'+
                    '<div class="card h-100">'+
                        '<img class="card-img-top" src="img/ochrona.jpg" alt="..." width="500" height="325"/>'+
                        '<div class="card-body">'+
                            '<h4 class="card-title">Ochrona</h4>'+
                            '<p class="card-text">Ochroną placówki zajmują się wyszkoleni pracownicy firmy "CliSec", której nazwa pochodzi od słów Clinic oraz Security.</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 mb-4">'+
                    '<div class="card h-100">'+
                        '<img class="card-img-top" src="img/recepcja.jpg" alt="..." width="500" height="325"/>'+
                        '<div class="card-body">'+
                            '<h4 class="card-title">Recepcja</h4>'+
                            '<p class="card-text">Przyjazne panie recepcjonistki o miłej aparycji zawsze pomogą załatwić u nas każdą sprawę.</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
	return tresc;
}

function pokazAktualnosci()
{ 
	var tresc='<header class="jumbotron my-4">'+
                '<h1 class="display-3">Aktualności:</h1>'+
                '<p class="lead"><ul class="tlo"></br><li>Poprawienie szaty graficznej stron</li><li>Więcej opcji responsywności związanej z podstroną z zakładki: "Zapisy"</li><li>Bug fixy w podstronie do rejestracji na wizytę</li><li>Aktualizacja listy lekarzy</li><li>Dodanie zakładki "Opinie"</li></br></ul> </p>'+
            '</header>'+
			'<header class="jumbotron my-4">'+
                '<h1 class="display-3">Ostatnia aktualizacja: </h1>'+
                '<p class="lead" id="zegar">';  
		var dzisiaj = new Date();
		var kiedys = new Date(2021, 4, 29, 14, 30 , 0);
		var dni = dzisiaj-kiedys;
		dni = Math.floor(dni/(1000*60*60*24));	
		if(dni==0)
		{
			dni = dzisiaj-kiedys;
			dni = Math.floor(dni/(1000*60));
			if(dni==0)
			{
				tresc+= 'Strona właśnie została zaktualizowana';
			}	
			else
			{
				tresc+='czas od aktualizacji strony przychodni: '+dni+'min';
			}
		}
		else if(dni==1)
		{
			tresc+= dni+' dzień od aktualizacji strony przychodni';	
		}
		else
		{
			tresc+= dni+' dni od aktualizacji strony przychodni';
		}
		tresc+='</p>'+
            '</header>';
return tresc;			
}

function pokazKontakt()
{ 
 var tresc='<header class="jumbotron my-4">'+
                '<h1 class="display-3">Kontakt</h1>'+
                '<p class="lead">'+
				'<table><thead><tr><th>Dział</th><th>Telefon</th><th>Dostępność</th></tr><tr> <td>Recepcja </td> <td>  123-123-123 </td><td> 6:00-18:00 7 dni w tyg.</td></tr>'+
				'<tr> <td>Ordynator&nbsp;&nbsp;&nbsp; </td> <td> 321-321-321  &nbsp;&nbsp;&nbsp;</td><td> 10:00-14:00 pn-pt</td></tr>'+
				'<tr> <td>Ochrona </td> <td> 132-132-132 </td><td> 24/7</td></tr></table></br>'+
				'</p>'+
            '</header>';
 return tresc;
}

function pokazLekarzy()
{ 
 var tresc='<header class="jumbotron my-4">'+
                '<h1 class="display-3">Lekarze zatrudnieni w naszej placówce</h1>'+
            '</header>'+
			'<div class="row text-center">';
			 var nazwa="";
			 var lekarze = ['dr Alojzy Nowak', 'dr Weronika Zawadzka', 'dr Beata Malinowska', 'dr Grzegorz Kowalski', 'dr Alina Kos', 'dr Błażej Nowak', 'dr Grzegorz Dom', 'dr Jan Kowalski', 'dr Marek Stefaniak', 'dr Robert Medyczny', 'dr Michał Pawlak', 'dr Paweł Olejnik'];
			 for(i=1;i<=12;i++)
			 {
				nazwa='img/obraz'+i+'.jpg';
				tresc+='<div class="col-lg-4 col-md-6 mb-4">'+
                    '<div class="card h-100">'+
                        '<img class="card-img-top" src='+nazwa+' alt="..." width="500" height="325"/>'+
                        '<div class="card-body">'+
                            '<h4 class="card-title">'+lekarze[i-1]+'</h4>'+
                        '</div>'+
                        '<div class="card-footer"><a class="btn btn-primary" href="#!" onclick="pokazLekarza('+i+')">Zapisz się</a></div>'+
                    '</div>'+
                '</div>';
			 }
			tresc+='</div>';
 return tresc;
}

function pokazFormularz(indeks)
{
	var lekarze = ['dr Alojzy Nowak', 'dr Weronika Zawadzka', 'dr Beata Malinowska', 'dr Grzegorz Kowalski', 'dr Alina Kos', 'dr Błażej Nowak', 'dr Grzegorz Dom', 'dr Jan Kowalski', 'dr Marek Stefaniak', 'dr Robert Medyczny', 'dr Michał Pawlak', 'dr Paweł Olejnik'];
	var lekarzeS = ['Okulista', 'Chirurg szczękowy', 'Lekarz rodzinny', 'Lekarz rodzinny', 'Kardiolog', 'Okulista', 'Lekarz rodzinny', 'Ginekolog', 'Kardiolog', 'Ortopeda', 'Alergolog', 'Pediatra'];
	var tresc='<header class="jumbotron my-4">'+
                '<h1 class="display-3">Formularz zapisu na wizytę</h1></br>'+
                '<p class="lead"> ';
	tresc+='<form action="mailto:jakubnowakowski98@gmail.com" method="post" onsubmit="return sprawdz()">';
		tresc+='<table>';
			tresc+='<tr> ';
				tresc+='<td>Typ lekarza: </td> ';
				tresc+='<td><input id="typ" disabled value="'+lekarzeS[indeks-1]+'"/> </td>';
			tresc+='</tr>';
			tresc+='<tr> ';
				tresc+='<td>Lekarz: </td> ';
				tresc+='<td><input id="lekarz" disabled value="'+lekarze[indeks-1]+'"/> </td>';
			tresc+='</tr>';
			tresc+='<tr> ';
				tresc+='<td>Nazwisko: </td> ';
				tresc+='<td><input name="nazw" size="30" id="nazw"/> </td>';
				tresc+='<td id="nazw_error" class="czerwone"></td>';
			tresc+='</tr>';
			tresc+='<tr> ';
				tresc+='<td>Imię: </td> ';
				tresc+='<td><input name="imie" size="20" id="imie"/> </td>';
				tresc+='<td id="imie_error" class="czerwone"></td>';
			tresc+='</tr>';
			tresc+='<tr>';
				tresc+='<td>PESEL:</td>';
				tresc+='<td><input name="PESEL" size ="11" id="PESEL"/></td>';
				tresc+='<td id="PESEL_error" class="czerwone"></td>';
			tresc+='</tr>';
			tresc+='<tr> ';
				tresc+='<td>Państwo:</td>';
				tresc+='<td>';
					tresc+='<select name="kraj" id="kraj">';
						tresc+='<option value="Polska"="selected">Polska</option>';
						tresc+='<option value="Obcokrajowiec">Inne</option>';
					tresc+='</select>';
				tresc+='</td>';
				tresc+='<td></td>';
			tresc+='</tr>';
			tresc+='<tr> ';
				tresc+='<td>Adres e-mail: </td>';
				tresc+='<td><input name="email" size ="30" id="email"/></td>';
				tresc+='<td id="email_error" class="czerwone"></td>';
			tresc+='</tr>';
		tresc+='</table>';
		tresc+='</br><h4>Cel(e) wizyty:</h4>';
		tresc+='<p>';
			tresc+='<input name="cel" type="checkbox" id="profilaktyka" value="Profilaktyka"/>Profilaktyka</br> ';
			tresc+='<input name="cel" type="checkbox" id="choroba" value="Choroba"/>Choroba</br>';
			tresc+='<input name="cel" type="checkbox" id="kontrola" value="Kontrolna wizyta"/>Kontrolna wizyta <br/>';
			tresc+='<span id="cel_error" class="czerwone"></span>';
		tresc+='</p>';
		tresc+='<h4>Sposób zapłaty:</h4>';
		tresc+='<p>';
			tresc+='<input name="zaplata" id="zaplata" type="radio" value="Karta kredytowa" />Karta kredytowa</br> ';
			tresc+='<input name="zaplata" type="radio" value= "Gotówka" />Gotówka</br>';
			tresc+='<input name="zaplata" type="radio" value= "Przelew bankowy" />Przelew bankowy <br />';
			tresc+='<span id="zaplata_error" class="czerwone"></span><br /><br />';
			tresc+='<input type="submit" value=" Wyślij " /> ';
			tresc+='<input onclick="anuluj()" type="reset" value=" Anuluj " />';
		tresc+='</p></br>';
		tresc+='</form></br></p>';
	return tresc;
}

function anuluj()
{
	document.getElementById("zaplata_error").innerHTML="";
	document.getElementById("cel_error").innerHTML="";
	document.getElementById("email_error").innerHTML="";
	document.getElementById("PESEL_error").innerHTML="";
	document.getElementById("nazw_error").innerHTML="";
	document.getElementById("imie_error").innerHTML="";
}

function pokazLekarza(indeks)
{
	var nazwa='img/obraz'+indeks+'.jpg';
	var lekarzeI = ['Alojzy', 'Weronika', 'Beata', 'Grzegorz', 'Alina', 'Błażej', 'Grzegorz', 'Jan', 'Marek', 'Robert', 'Michał', 'Paweł'];
	var lekarzeN = ['Nowak', 'Zawadzka', 'Malinowska', 'Kowalski', 'Kos', 'Nowak', 'Dom', 'Kowalski', 'Stefaniak', 'Medyczny', 'Pawlak', 'Olejnik'];
	var lekarzeS = ['Okulista', 'Chirurg szczękowy', 'Lekarz rodzinny', 'Lekarz rodzinny', 'Kardiolog', 'Okulista', 'Lekarz rodzinny', 'Ginekolog', 'Kardiolog', 'Ortopeda', 'Alergolog', 'Pediatra'];
	var tresc='<header class="jumbotron my-4">'+
                '<h1 class="display-3" id="centruj3">Zapisz się na wizytę</h1></br>'+
                '<p class="lead" id="centruj"> '+
				'<img class="card-img-top" src='+nazwa+' alt="obrazek" width="350" height="500"/>'+
				'</br></br><table id="centruj2"><thead><tr><th>Imię&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Nazwisko&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Specjalizacja</th></tr></thead>'+
				'<tr><td>'+lekarzeI[indeks-1]+'</td><td>'+lekarzeN[indeks-1]+'</td><td>'+lekarzeS[indeks-1]+'</td></tr></table>'+
				'</br><div id="centruj"><button onclick="pokaz(5, '+indeks+')">Zapisz się</button>&nbsp<button id="przycisk" onclick="pokaz(3)">Powrót</button></div></br>'+				
				'</p>'+
            '</header>';

	document.getElementById('blok').innerHTML = tresc;
}







function sprawdzPole(pole_id,obiektRegex) 
{
	var obiektPole = document.getElementById(pole_id);
	if(!obiektRegex.test(obiektPole.value)) return (false);
	else return (true);
}

function sprawdz_radio(nazwa_radio)
{
	var obiekt=document.getElementsByName(nazwa_radio);
	for (i=0;i<obiekt.length;i++)
	{ 
		wybrany=obiekt[i].checked;
		if (wybrany) return true;
	}
	return false;
}

function sprawdz_box(box_id)
{
	var obiekt=document.getElementById(box_id);
	if (obiekt.checked) return true;
	else return false;
}

function sprawdz()
{
	var ok=true; 

	obiektNazw = /^[A-ZŁŚŹŻÓĘĄŃĆ][A-ZŁŚŹŻÓĘĄŃĆa-złśżźóęąńć\-]{1,30}$/;
	obiektImie = /^[A-ZŁŚŹŻÓĘĄŃĆ][A-ZŁŚŹŻÓĘĄŃĆa-złśżźóęąńć\s]{1,20}$/;
	obiektemail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+$/;
	obiektPESEL=/^[0-9]{11}$/;

	if (!sprawdzPole("nazw",obiektNazw))
	{ 
		ok=false;
		document.getElementById("nazw_error").innerHTML="Nazwisko wpisz z wielkiej litery. Maksymalnie 30 znaków. Dopuszczalny znak specjalny to: -";
	}
	else document.getElementById("nazw_error").innerHTML="";
	if (!sprawdzPole("imie",obiektImie))
	{ 
		ok=false;
		document.getElementById("imie_error").innerHTML="Imie wpisz z wielkiej litery. Maksymalnie 20 znaków. Dopuszczalny znak specjalny to: spacja";
	}
	else document.getElementById("imie_error").innerHTML="";
	if (!sprawdzPole("email",obiektemail))
	{ 
		ok=false;
		document.getElementById("email_error").innerHTML="Wpisz poprawny email! Musi zawierać znak @";
	}
	else document.getElementById("email_error").innerHTML="";
	if (!sprawdzPole("PESEL",obiektPESEL))
	{ 
		ok=false;
		document.getElementById("PESEL_error").innerHTML="Wpisz poprawnie PESEL! Musi to być 11-cyfrowy ciąg.";
	}
	else document.getElementById("PESEL_error").innerHTML="";
	if (!sprawdz_box("profilaktyka") && !sprawdz_box("choroba") && !sprawdz_box("kontrola"))
	{ 
		ok=false;
		document.getElementById("cel_error").innerHTML="Musisz wybrać cel(e) wizyty!";
	}
	else document.getElementById("cel_error").innerHTML="";

	var zap=document.getElementsByName("zaplata");
	var dane2="";
		for(let i=0; i<zap.length; i++)
		{
			if(zap[i].checked)
			{			
				dane2=zap[i].value;
			}
			if(i==zap.length-1 && dane2=="")
			{	
				document.getElementById("zaplata_error").innerHTML="Nie wybrałeś sposobu zapłaty, strona ustawiła automatycznie opcję: Karta kredytowa";
				document.getElementById("zaplata").checked = "checked";
			}
			else
			{
				document.getElementById("zaplata_error").innerHTML="";
			}
		}

	if(ok)
	{
		anuluj();
		pokazDane();
	}

	return ok;
}

function pokazDane()
{
    var dane="Dane z wypełnionego przez Ciebie formularza:\n";
	dane+="Typ lekarza: "+document.getElementById('typ').value+"\n";
	dane+="Lekarz: "+document.getElementById('lekarz').value+"\n";
    dane+="Nazwisko: "+document.getElementById('nazw').value+"\n";
	dane+="Imię: "+document.getElementById('imie').value+"\n";
    dane+="PESEL: "+document.getElementById('PESEL').value+"\n";
    dane+="Narodowość: "+document.getElementById('kraj').value+"\n";
    dane+="Email: "+document.getElementById('email').value+"\n";
    dane+="Cel(e) wizyty: ";
    var p=document.getElementsByName("cel");
    for(let i=0; i<p.length; i++)
    {
        if(p[i].checked) dane+=p[i].value+" ";
    }
    dane+="\n"+"Sposób zapłaty: ";
    var zap=document.getElementsByName("zaplata");
    for(let i=0; i<zap.length; i++)
    {
        if(zap[i].checked)
		{			
			dane+=zap[i].value+" ";
		}
    }
    if (window.confirm(dane)) return true;
    else return false;
}