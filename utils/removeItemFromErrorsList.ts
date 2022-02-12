function removeItemFromErrorsList(setErrorsList: (a: any) => any, item: string): void {
	setErrorsList((prev) => {
		let _prev = prev;

		if(_prev.includes(item))
			_prev.splice(_prev.indexOf(item), 1);
		
		return _prev;
	});
}

export default removeItemFromErrorsList;
