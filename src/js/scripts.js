function getPercentValue (currentVotesAmount, totalAmount) {
	var percent = (currentVotesAmount / totalAmount) * 100;
	return Math.round(percent);
}

function isValidVotes(positive, negative) {
	return (Number(positive) && Number(negative)) ? true : false;
}

function sortPeople(peopleArray) {
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
    return validVotes;
	// console.log(validVotes);
	// createItemListTemplate(validVotes);
}

function createItemListTemplate (objArr) {
	var templateArr = [];
	objArr.forEach((obj) => {
		var template = '';
		if (obj.isValid) {
			template = `<li class="ranking-list-item" tabindex="0" aria-label="Posição ${obj.rankIdx} - Participante ${obj.name}, ${obj.desc}. ${obj.percentPos} gostam e ${obj.percentNeg} não gostam desse participante"><div class="item-profile-container"><div style="background-image:url('${obj.pic}')" class="item-profile-img" aria-label="Foto do participante ${obj.name}"></div><span class="item-profile-idx">${obj.rankIdx}</span></div><div class="item-text"><p class="item-text-name">${obj.name}</p><p class="item-text-description">${obj.desc}</p></div><div class="item-tooltip"><div class="item-tooltip-header"><div class="item-tooltip-header-positive"><p>GOSTAM</p></div><div class="item-tooltip-header-negative"><p>NÃO GOSTAM</p></div></div><div class="item-tooltip-percent"><div class="item-tooltip-percent-positive"><p aria-label='${obj.percentPos} gostam de ${obj.name}'>${obj.percentPos}</p></div><div class="item-tooltip-percent-negative"><p aria-label='${obj.percentNeg} não gostam de ${obj.name}'>${obj.percentNeg}</p></div></div></div></li>`;
		} else {
			template = `<li class="ranking-list-item" tabindex="0" aria-label="Posição ${obj.rankIdx} - Participante ${obj.name}, ${obj.desc}. Porcentagem de votos não informados"><div class="item-profile-container"><div style="background-image:url('${obj.pic}')" class="item-profile-img" aria-label="Foto do participante ${obj.name}"></div><span class="item-profile-idx">${obj.rankIdx}</span></div><div class="item-text"><p class="item-text-name">${obj.name}</p><p class="item-text-description">${obj.desc}</p></div><div class="item-tooltip"><div class="item-tooltip-header"><div class="item-tooltip-header-positive"><p>GOSTAM</p></div><div class="item-tooltip-header-negative"><p>NÃO GOSTAM</p></div></div><div class="item-tooltip-percent invalid-percent"><div class="item-tooltip-percent-positive"><p aria-label='Porcentagem de likes não informada'>Não<br>informado</p></div><div class="item-tooltip-percent-negative"><p aria-label='Porcentagem de dislikes não informada'>Não<br>informado</p></div></div></div></li>`;
        }
		templateArr.push(template);
    });
    return templateArr;
}

/* start-test-block */
module.exports = { getPercentValue, isValidVotes, sortPeople, createItemListTemplate };
/* end-test-block */