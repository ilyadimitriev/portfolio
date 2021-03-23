const phoneMask = () => {
	const phoneInputElems = document.querySelectorAll('[name="phone"]');
	phoneInputElems.forEach(input => {
		input.addEventListener('focus', () => {
			if (input.value === '') {
				input.value = '+7 (';
			}
		});
		input.addEventListener('input', event => {
			const length = input.value.length;
			if (event.inputType === 'deleteContentBackward') {
				if (length === 15) {
					input.value = input.value.slice(0, 14);
				} else if (length === 12) {
					input.value = input.value.slice(0, 11);
				} else if (length === 8) {
					input.value = input.value.slice(0, 6);
				} else if (length <= 4) {
					input.value = '+7 (';
				}
			} else {
				if (/\D$/.test(input.value)) {
					input.value = input.value.replace(/[\D]$/, '');
					return;
				}
				if (length === 7) {
					input.value += ') ';
				} else if (length === 12) {
					input.value += '-';
				} else if (length === 15) {
					input.value += '-';
				} else if (length > 18) {
					input.value = input.value.replace(/.$/, '');
					return;
				}
			}
		});
		input.addEventListener('blur', () => {
			if (input.value.length <= 4) {
				input.value = '';
			}
		});
	});
};

export default phoneMask;
