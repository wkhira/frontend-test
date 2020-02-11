$(function () {
	buildList();
});

function loadJson(cb) {
	var requestURL = 'https://raw.githubusercontent.com/wkhira/frontend-test/master/src/fazenda.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		var jsonData = request.response;
		cb(jsonData);
	};
}

function buildList() {
    var dataObjList = [];
	loadJson(function (json) {
		json.data.forEach((value) => {
			var isValid = isValidVotes(value.positive, value.negative);
			var obj = {
				rankIdx: null,
				name: value.name,
				desc: (value.description == 'Cracrete n&ordm;1') ? 'Chacrete n&ordm;1' : value.description,
				pic: value.picture,
				positive: isValid ? Number(value.positive) : null,
				negative: isValid ? Number(value.negative) : null,
				percentPos: isValid ? getPercentValue(Number(value.positive), (Number(value.positive) + Number(value.negative)))  + '%' : null,
				percentNeg: isValid ? getPercentValue(Number(value.negative), (Number(value.positive) + Number(value.negative)))  + '%' : null,
				isValid: isValid
			};
			// console.log(obj)
			dataObjList.push(obj);
        });
        var sortedData = sortPeople(dataObjList);
        var templateList = createItemListTemplate(sortedData);
        var rankingList = $('.ranking-list');
        templateList.forEach((line) => {
            rankingList.append(line);
        });
	});
}