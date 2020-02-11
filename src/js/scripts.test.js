const { getPercentValue, isValidVotes, sortPeople, createItemListTemplate } = require('./scripts');

describe("Teste de validação de votos", () => {
	test('Valores devem ser validos', () => {
		var a = 123414;
		var b = 2345;
		expect(isValidVotes(a, b)).toBeTruthy();
	});
	test('Votos devem ser inválidos', () => {
		var a = 123414;
		var b = null;
		var c = undefined;
		expect(isValidVotes(a, b)).toBeFalsy();
		expect(isValidVotes(a, c)).toBeFalsy();
	});
});

describe("Teste do cálculo de porcentagem", () => {
	test('Em um total de 20 votos, 2 votos deve ser igual a 10% do total', () => {
		expect(getPercentValue(2, 20)).toBe(10);
	});
});

describe("Teste da ordenação do array de participantes", () => {
	var testArr = [
		{
			rankIdx: 3,
			name: "Rita Cadillac",
			desc: "Chacrete n&ordm;1",
			pic: "http://im.r7.com/record/files/2C96/1617/3F6E/32AE/013F/72F9/AD72/3CE1/RitaCadillac1.jpg",
			positive: 51638022,
			negative: 18143089,
			percentPos: "74%",
			percentNeg: "26%",
			isValid: true
		},
		{
			rankIdx: 5,
			name: "Andressa Urach",
			desc: "Personalidade da mídia",
			pic: "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72EF/C598/41DC/Andressa1.jpg",
			positive: null,
			negative: null,
			percentPos: null,
			percentNeg: null,
			isValid: false
		},
		{
			rankIdx: 1,
			name: "Bárbara Evans",
			desc: "Modelo e filha de Monique Evans",
			pic: "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72F6/B48C/5BBD/B%C3%A1rbaraEvans1.jpg",
			positive: 69274684,
			negative: 9446548,
			percentPos: "88%",
			percentNeg: "12%",
			isValid: true
		},
		{
			rankIdx: 4,
			name: "Gominho",
			desc: "Fofoqueiro de Plantão",
			pic: "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72F7/CF15/5F4B/Gominho1.jpg",
			positive: 23249923,
			negative: 39587707,
			percentPos: "37%",
			percentNeg: "63%",
			isValid: true
		},
		{
			rankIdx: 2,
			name: "Yudi Tamashiro",
			desc: "Apresentador e ídolo teen",
			pic: "http://im.r7.com/record/files/2C96/1617/3F6E/32AE/013F/72FD/87BB/4436/Yudi1.jpg",
			positive: 59089056,
			negative: 14772265,
			percentPos: "80%",
			percentNeg: "20%",
			isValid: true
		}
	]
	var correctArr = [
		{
			rankIdx: 1,
			name: "Bárbara Evans",
			desc: "Modelo e filha de Monique Evans",
			pic: "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72F6/B48C/5BBD/B%C3%A1rbaraEvans1.jpg",
			positive: 69274684,
			negative: 9446548,
			percentPos: "88%",
			percentNeg: "12%",
			isValid: true
		},
		{
			rankIdx: 2,
			name: "Yudi Tamashiro",
			desc: "Apresentador e ídolo teen",
			pic: "http://im.r7.com/record/files/2C96/1617/3F6E/32AE/013F/72FD/87BB/4436/Yudi1.jpg",
			positive: 59089056,
			negative: 14772265,
			percentPos: "80%",
			percentNeg: "20%",
			isValid: true
		},
		{
			rankIdx: 3,
			name: "Rita Cadillac",
			desc: "Chacrete n&ordm;1",
			pic: "http://im.r7.com/record/files/2C96/1617/3F6E/32AE/013F/72F9/AD72/3CE1/RitaCadillac1.jpg",
			positive: 51638022,
			negative: 18143089,
			percentPos: "74%",
			percentNeg: "26%",
			isValid: true
		},
		{
			rankIdx: 4,
			name: "Gominho",
			desc: "Fofoqueiro de Plantão",
			pic: "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72F7/CF15/5F4B/Gominho1.jpg",
			positive: 23249923,
			negative: 39587707,
			percentPos: "37%",
			percentNeg: "63%",
			isValid: true
		},
		{
			rankIdx: 5,
			name: "Andressa Urach",
			desc: "Personalidade da mídia",
			pic: "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72EF/C598/41DC/Andressa1.jpg",
			positive: null,
			negative: null,
			percentPos: null,
			percentNeg: null,
			isValid: false
		}
	]
	var sortedTestArr = sortPeople(testArr);
	test("Dado o array desordemado de exemplo o array resultante deve ser igual ao array correto", () => {
		sortedTestArr.forEach((element, index) => {
			expect(element).toEqual(correctArr[index]);
		});
	});
});

describe("Teste da criação do template html do itens da lista", () => {
	var validVotesExample = [{
		rankIdx: 3,
		name: "Rita Cadillac",
		desc: "Chacrete n&ordm;1",
		pic: "http://im.r7.com/record/files/2C96/1617/3F6E/32AE/013F/72F9/AD72/3CE1/RitaCadillac1.jpg",
		positive: 51638022,
		negative: 18143089,
		percentPos: "74%",
		percentNeg: "26%",
		isValid: true
	}];

	var invalidVotesExample = [{
		rankIdx: 5,
		name: "Andressa Urach",
		desc: "Personalidade da mídia",
		pic: "http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72EF/C598/41DC/Andressa1.jpg",
		positive: null,
		negative: null,
		percentPos: null,
		percentNeg: null,
		isValid: false
	}];

	var validPercentTemplate = JSON.stringify(`<li class="ranking-list-item" tabindex="0" aria-label="Posição 3 - Participante Rita Cadillac, Chacrete n&ordm;1. 74% gostam e 26% não gostam desse participante"><div class="item-profile-container"><div style="background-image:url('http://im.r7.com/record/files/2C96/1617/3F6E/32AE/013F/72F9/AD72/3CE1/RitaCadillac1.jpg')" class="item-profile-img" aria-label="Foto do participante Rita Cadillac"></div><span class="item-profile-idx">3</span></div><div class="item-text"><p class="item-text-name">Rita Cadillac</p><p class="item-text-description">Chacrete n&ordm;1</p></div><div class="item-tooltip"><div class="item-tooltip-header"><div class="item-tooltip-header-positive"><p>GOSTAM</p></div><div class="item-tooltip-header-negative"><p>NÃO GOSTAM</p></div></div><div class="item-tooltip-percent"><div class="item-tooltip-percent-positive"><p aria-label='74% gostam de Rita Cadillac'>74%</p></div><div class="item-tooltip-percent-negative"><p aria-label='26% não gostam de Rita Cadillac'>26%</p></div></div></div></li>`);
	
	var invalidPercentTemplate = JSON.stringify(`<li class="ranking-list-item" tabindex="0" aria-label="Posição 5 - Participante Andressa Urach, Personalidade da mídia. Porcentagem de votos não informados"><div class="item-profile-container"><div style="background-image:url('http://im.r7.com/record/files/2C96/1618/3F6E/369D/013F/72EF/C598/41DC/Andressa1.jpg')" class="item-profile-img" aria-label="Foto do participante Andressa Urach"></div><span class="item-profile-idx">5</span></div><div class="item-text"><p class="item-text-name">Andressa Urach</p><p class="item-text-description">Personalidade da mídia</p></div><div class="item-tooltip"><div class="item-tooltip-header"><div class="item-tooltip-header-positive"><p>GOSTAM</p></div><div class="item-tooltip-header-negative"><p>NÃO GOSTAM</p></div></div><div class="item-tooltip-percent invalid-percent"><div class="item-tooltip-percent-positive"><p aria-label='Porcentagem de likes não informada'>Não<br>informado</p></div><div class="item-tooltip-percent-negative"><p aria-label='Porcentagem de dislikes não informada'>Não<br>informado</p></div></div></div></li>`)
	test('Dado um participante com porcentagem do votos válidas deve gerar o template com os valores percentuais', () => {
		var test = createItemListTemplate(validVotesExample);
		expect(JSON.stringify(test[0])).toMatch(validPercentTemplate);
	});

	test('Dado um participante com porcentagem do votos inválidas deve gerar o template indicando que os valor não foram informados', () => {
		var test = createItemListTemplate(invalidVotesExample);
		expect(JSON.stringify(test[0])).toMatch(invalidPercentTemplate);
	});
});