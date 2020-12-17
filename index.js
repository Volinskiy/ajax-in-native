function CreatePopUp() {
    let popUp = document.getElementById('jsPopUpAddNote'),
        fieldUserName = popUp.querySelector('.jsUserName'),
        fieldUserBalance = popUp.querySelector('.jsBalance'),
        fieldErrorMessage = popUp.querySelector('.jsErrorMessage'),
	    buttonClosePopUp = popUp.querySelector('#jsButtonClosePopUp');
	
    // Получение данных с сервера и заполнение соответствующих полей
    function insertDataAsyncFromServer (
                                    url,
                                    dataSend,
                                    callbackOnSuccess,
                                    callbackOnError,
                                    callbackOnProgress){
        
        let xhr = new XMLHttpRequest(),
            urlWithParams = new URL(url);
        
        // Формируем строку запроса
        urlWithParams.searchParams.set('url', dataSend.toString());

		xhr.open("GET", urlWithParams);
        xhr.responseType = "json";
        
		xhr.onload = function() {
            if (xhr.status != 200) {
                callbackOnError(`Ошибка ${xhr.status}: ${xhr.statusText}`);
			} else {
                callbackOnSuccess(xhr.response);
			}
		};
		
		xhr.onprogress = function(event) {
            callbackOnProgress();
		};
		
		xhr.onerror = function() {
            callbackOnError(`Ошибка ${this.status}: ${this.statusText}`);
		};
        
        xhr.send();
	}
	
	this.open = (dataSend = 'url', url = '/data.json') => {
		popUp.classList.remove('display-none');
        insertDataAsyncFromServer( url,
                                dataSend,
                                this.stateSuccessRequestData,
                                this.stateErrorFailureRequestData,
                                this.stateInProgressRequestData)
    }
    
	this.close = () => {
        popUp.classList.add('display-none');
        this.resetPopUpData();
    }
    
	this.resetPopUpData = function(){
        fieldUserName.innerText = '';
        fieldUserBalance.innerText = '';
        fieldErrorMessage.innerText = '';
        fieldErrorMessage.classList.add('display-none');
        fieldUserName.classList.remove('display-none');
        fieldUserBalance.classList.remove('display-none');
    }

    this.stateErrorFailureRequestData = (errorMessage) => {
        this.resetPopUpData();
        
        fieldErrorMessage.innerText = errorMessage;
        fieldErrorMessage.classList.remove('display-none');
        fieldUserName.classList.add('display-none');
        fieldUserBalance.classList.add('display-none');
    }

    this.stateSuccessRequestData = (responseData) => {
        this.resetPopUpData();
        
        fieldUserName.innerText = `${responseData['user-name']}`;
        fieldUserBalance.innerText = `${responseData['user-balance']}`;
    }

    this.stateInProgressRequestData = function(){
        console.log('progress');
    }

	buttonClosePopUp.addEventListener('click', () => {
		this.close();
	})
}

let popUp = new CreatePopUp();

let buttonOpenPopUp = document.getElementById('buttonOpenPopUp');

buttonOpenPopUp.addEventListener('click', function(){
	popUp.open();
})

let formRequestData = document.getElementById('formRequestData'),
buttonOpenPopup = formRequestData.querySelector('#buttonOpenPopUp')


formRequestData.addEventListener('submit', function(e){
	e.preventDefault()
	// let response = await fetch('/data.json', )
	// if (response.ok) { // если HTTP-статус в диапазоне 200-299
	// 	// получаем тело ответа (см. про этот метод ниже)
	// 	let text = await response.text();
	// 	console.log(text);
	// } else {
	// 	alert("Ошибка HTTP: " + response.status);
	// }
})