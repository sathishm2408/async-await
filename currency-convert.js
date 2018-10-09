
//http://data.fixer.io/api/latest?access_key=58538fb6e6c119a0fb53ca858fd097d2

const axios=require('axios');

const getExchangeRate=async(from,to)=>{
	try{
	const response=await axios.get('http://data.fixer.io/api/latest?access_key=58538fb6e6c119a0fb53ca858fd097d2');
	const euro=1/response.data.rates[from];
	const rate=euro*response.data.rates[to];
	
	if(isNaN(rate)){
		throw new Error();
	}
	
	return rate;
	}catch(e){
		throw new Error('Unable to get exchange rate for '+from+' and '+to+'.');
	}
	};

const getCountries=async(currencyCode)=>{
	try{
	const countries=await axios.get('https://restcountries.eu/rest/v2/currency/'+currencyCode);
	return countries.data.map((country)=>country.name);
	}catch(e){
		throw new Error('Unable to get countries that use '+currencyCode );
	}
};

/*const convertCurrency=(from,to,amount)=>{
	let convertedAmount;
	return getExchangeRate(from,to).then((rate)=>{
		convertedAmount=(amount*rate).toFixed(2);
		return getCountries(to);
		}).then((countries)=>{
			return amount+' '+from+' is worth '+convertedAmount+' '+to+'.You can spend it in the following countries:'+countries.join(', ');
		});
};	
	*/

const convertCurrency=async(from,to,amount)=>{
	const rate=await getExchangeRate(from,to);
	const countries=await getCountries(to);
	const convertedAmount=(amount*rate).toFixed(2);
	return amount+' '+from+' is worth '+convertedAmount+' '+to+'.You can spend it in the following countries:'+countries.join(', ');
	};

	
convertCurrency('USD','CAD',20).then((message)=>{
	console.log(message);
}).catch((e)=>{
	console.log(e.message);
});	
	
//getExchangeRate('USD','CAD').then((rate)=>{
	//console.log(rate);
//});

//getCountries('USD').then((countries)=>{
//	console.log(countries);
//})