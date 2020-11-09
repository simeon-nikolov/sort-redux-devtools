function sortStates() {
	if (isState() && isTree()) {
		const statesList = root?.querySelector('div > ul > li > ul');
		const collapsedDiv = root?.querySelector('div > ul > li > ul > div');
		collapsedDiv?.click();
		const statesElems = statesList?.querySelectorAll('li');
		const collapsedElems = statesList?.querySelectorAll('div > li');
		const collapsedArray = Array.from(collapsedElems);
		const statesArray = Array.from(statesElems).concat(collapsedArray);
		const sorted = statesArray?.sort((elem1, elem2) => elem1.querySelector('label > span > span:first-child').textContent < elem2.querySelector('label > span > span:first-child').textContent ? -1 : 1)
		try{ while(statesList?.hasChildNodes) { statesList.removeChild(statesList.lastChild);} } catch(e) {}
		sorted?.forEach(elem => statesList?.appendChild(elem))
	}
}

function isState() {
	return root?.querySelector('[class^=inspectedPath]')?.textContent === 'State';
}

function isTree() {
	const btn = root?.querySelector('[class^=actionPreviewContent] > div > div > div > button');
	return btn?.textContent === 'Tree' && btn?.attributes?.['data-selected']?.value === 'true';
}

document.addEventListener('click', (event) => {
	const stateBtn = root?.querySelector('[class^=tabSelector] > [class^=selectorButton]:nth-child(2)');
	const treeBtn = root?.querySelector('[class^=actionPreviewContent] > div > div > div > button');
	if ((stateBtn || treeBtn) && (event.target === stateBtn || event.target === treeBtn)) {
		setTimeout(sortStates);
	}
});
