var dataObjList = [];

$(function () {
	getJsonData();
});

function loadJson(cb) {
	var requestURL = 'fazenda.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		var jsonData = request.response;
		cb(jsonData);
	}
}

function getJsonData() {
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
				percentPos: isValid ? getPercentValue(Number(value.positive), (Number(value.positive) + Number(value.negative))) : null,
				percentNeg: isValid ? getPercentValue(Number(value.negative), (Number(value.positive) + Number(value.negative))) : null,
				isValid: isValid
			}
			// console.log(obj)
			dataObjList.push(obj);
		});
		sortPeople(dataObjList);
	})
}

function getPercentValue (currentVotesAmount, totalAmount) {
	var percent = (currentVotesAmount / totalAmount) * 100;
	return Math.round(percent) + '%';
}

function isValidVotes(positive, negative) {
	return (Number(positive) && Number(negative)) ? true : false;
}

function sortPeople(peopleArray) {
	// console.log(peopleArray);
	var validVotes = peopleArray.filter((people) => {
		return people.isValid;
	});

	var invalidVotes = peopleArray.filter((people) => {
		return !people.isValid;
	});

	validVotes.sort((a, b) => {
		const posA = (Number(a.positive) / (Number(a.positive) + Number(a.negative))) * 100;
		const posB = (Number(b.positive) / (Number(b.positive) + Number(b.negative))) * 100;

		if (posA > posB) return -1;
		if (posA < posB) return 1;
		return 0;
	});

	invalidVotes.sort((a, b) => {
		const posA = (Number(a.positive) / (Number(a.positive) + Number(a.negative))) * 100;
		const posB = (Number(b.positive) / (Number(b.positive) + Number(b.negative))) * 100;

		if (posA > posB) return -1;
		if (posA < posB) return 1;
		return 0;
	});

	invalidVotes.map((item, index) => {
		validVotes.push(item);
	});

	validVotes.forEach((value, idx) => {
		value.rankIdx = idx + 1;
	});

	console.log(validVotes);
	createItemListTemplate(validVotes);
}

function createItemListTemplate (objArr) {
	var rankingList = $('.ranking-list');
	console.log(rankingList)
	objArr.forEach((obj) => {
		var template = '';
		if (obj.isValid) {
			template = `
			<li class="ranking-list-item">
				<div class="item-profile-container unselected-border">
					<div style="background-image:url('${obj.pic}')" class="item-profile-img"></div>
					<span class="item-profile-idx">${obj.rankIdx}</span>
				</div>
				<div class="item-text">
					<p class="item-text-name">${obj.name}</p>
					<p class="item-text-description">${obj.desc}</p>
				</div>
			</li>
			`;
		} else {
			template = `
			<li class="ranking-list-item">
				<div class="item-profile-container unselected-border">
					<div style="background-image:url('${obj.pic}')" class="item-profile-img"></div>
					<span class="item-profile-idx">${obj.rankIdx}</span>
				</div>
				<div class="item-text">
					<p class="item-text-name">${obj.name}</p>
					<p class="item-text-description">${obj.desc}</p>
				</div>
			</li>
			`;
		}
		rankingList.append(template);
	});
}