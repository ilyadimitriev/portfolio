const sendForm = formId => {

	const form = document.getElementById(formId);
	const statusMessage = document.createElement(`div`);

	const postData = body =>
		fetch(`server.php`, {
			method: `POST`,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});

	const handleError = error => {
		statusMessage.style.cssText = `font-size: 1.4rem;`;
		statusMessage.innerHTML = ``;
		statusMessage.textContent = 'Возникла ошибка при отправки данных';
		console.error(error);
	};

	const handleResponse = () => {
		const html = document.querySelector('html');
		document.querySelector('.popup-thank').style.visibility = `visible`;
		setTimeout(() => {
			document.querySelector('.popup-thank').style.visibility = `hidden`;
			document.querySelector('.popup-consultation').style.visibility = `hidden`;
			html.style.overflowY = `auto`;
		}, 4000);
		form.querySelectorAll(`input`).forEach(input => {
			input.value = ``;
			if (input.checked) {
				input.checked = false;
			}
		});
		statusMessage.innerHTML = ``;
	};

	form.addEventListener(`submit`, event => {
		event.preventDefault();
		form.appendChild(statusMessage);
		const formData = new FormData(form);
		const body = {};
		formData.forEach((val, key) => {
			body[key] = val;
		});
		postData(body)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`Возникла ошибка при отправки данных`);
				} else {
					handleResponse();
				}
			})
			.catch(handleError);
	});
};


export default sendForm;

