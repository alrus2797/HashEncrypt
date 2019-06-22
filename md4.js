Array.prototype.rotate = function(reverse = false){
	if (reverse) this.unshift(this.pop())
	else this.push(this.shift());
	return this;
}

function shift_array(arr, n, reverse = false){
	for (let i = 0; i < n; i++) {
		arr = arr.rotate(reverse);
	}
	return arr;
}

function str_to_base(str, base = 2){
	n_str = "";
	for (let i = 0; i < str.length; i++) {
		bin_char = str.charCodeAt(i).toString(base); 
		if (bin_char.length < 8)
			bin_char = bin_char.padStart(8,"0");
		n_str += bin_char;
	}
	return n_str;
}

function str_padding(str){
	str += "1";
	while (str.length % 512 != 448){
		str += "0";
	}
	return str;
}

function get_init_words(){
	return	[	
		['01', '23', '45', '67'], 
		['89', 'ab', 'cd', 'ef'],
		['fe', 'dc', 'ba', '98'],
		['76', '54', '32', '10']
	]
}

function get_functions(){
	return [
		function(X,Y,Z){ (X & Y) | (~X & Z) },
		function(X,Y,Z){ (X & Y) | (X & Z) | (Y & Z) },
		function(X,Y,Z){ (X ^ Y ^ Z) },
	]
}

function split_message(str, n){
	var res = [];
	str = str.split('');
	while (str.length){
		res.push(str.splice(0,n));
	}
	return res;
}


function make_round(words, func, pos, X, shift){
	words[0] = ((parseInt(words[0],2) + parseInt(func(words[0],words[1],words[2]), 2) + X[pos]) << shift).toString(2);
	return words;
}

function md5(str){
	str = "hola";
	//Convert to Bin
	str	= str_to_base(str, 2);
	bit_str_length = str.length.toString(2).padStart(64,"0");
	//Padding bits
	str	= str_padding(str);
	//Add length 
	str += bit_str_length;
	console.log("Str length status after append length: ", str.length);
	

	var init_words	= get_init_words();
	
	var functions	= get_functions();
	
	var [A, B, C, D] = init_words;
	var [G, F, H]	 = functions;

	//console.log(A,B,C,D);
	//console.log(F,G,H);

	var M = split_message(str, 32);
	var N = M.length;
	console.log(N);

	shift_rounds = [
		[3,7,11,19],
		[3,5, 9,13],
		[3,9,11,15]
	]


	for (let i = 0; i < N/16; i++) {
		//console.log('hey');
		X = M[i*16].slice();

		AA = A.slice();
		BB = B.slice();
		CC = C.slice();
		DD = D.slice();

		for (let round = 0; round < 3; round++) {
			for (let op = 0; op < 16; op++) {
				init_words = make_round(init_words,functions[round],op,X,shift_rounds[round][op%4]);
				init_words = init_words.rotate();
			}
		}


	}

	
}

md5("1");


a = [0,0,0,1,0,1];
console.log(a);
a = shift_array(a,3);
console.log(a);