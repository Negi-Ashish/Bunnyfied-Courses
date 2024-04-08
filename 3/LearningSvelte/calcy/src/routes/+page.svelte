<script lang="ts">
	const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
	const operations = ['/', '*', '+', '-', '='];

	// For storing which operations need to be performed /, *, +, -
	let selectedOperation = '';
	// For displaying required content on the main screen.
	let display = '';
	// Operations will be performed on two numbers and hence we need 2 variables to store them.
	let firstNumber = '';
	let secondNumber = '';
	// Once the result is calculated we need to reset the firstNumber and SecondNumber to make the next operation possible without any bugs.
	let isDisplayingResults = false;

	const handleOperationClick = (operation: string) => {
		// Scenario where the first number is not selected, we dont allow the user to select any operations.
		if (!firstNumber) return;
		// Scenario where the selected operation is '='
		if (operation == '=') {
			// Scenario where the second number is not selected, we dont allow the user to perform any operations.
			if (!secondNumber) return;
			const firstNum = parseInt(firstNumber);
			const secondNum = parseInt(secondNumber);

			let results = '';
			// Switch cases for all scenarios
			switch (selectedOperation) {
				case '/':
					results = (firstNum / secondNum).toFixed(2);
					break;
				case '*':
					results = (firstNum * secondNum).toFixed(2);
					break;
				case '+':
					results = (firstNum + secondNum).toFixed(2);
					break;
				case '-':
					results = (firstNum - secondNum).toFixed(2);
					break;
			}
			display = results;
			isDisplayingResults = true;
		}
		selectedOperation = operation;
	};

	const handleClear = () => {
		selectedOperation = '';
		display = '';
		firstNumber = '';
		secondNumber = '';
		isDisplayingResults = false;
	};

	const handleNumberClick = (number: string) => {
		if (isDisplayingResults) {
			handleClear();
		}
		// Scenario where the string is empty and the user is adding zeroes, resulting in the eventual magnitude of the numbers becoming zero.
		if (display === '' && number === '0') return;

		// Scenario where the string already has a decimal and user is trying to add more point's, eventually making a invalid number.
		if (number === '.' && display.includes('.')) return;

		if (!selectedOperation) {
			// Scenario where the string is empty adn user is adding decimal in the begning.
			if (display === '' && number === '.') {
				firstNumber = '0.';
				return (display = firstNumber);
			}
			firstNumber += number;
			return (display = firstNumber);
		} else {
			// console.log('here', display);
			// Scenario where the string is empty adn user is adding decimal in the begning.
			if (display === '' && number === '.') {
				secondNumber = '0.';
				return (display = secondNumber);
			}
			secondNumber += number;
			return (display = secondNumber);
		}
	};
</script>

<main>
	<div class="calculator">
		<div class="results">{display}</div>
		<div class="digits">
			<div class="numbers">
				<button class="btn btn-xlg" on:click={handleClear}>Clear</button>
				{#each numbers as number (number)}
					<button
						class={`btn ${number === '0' ? 'btn-lg' : null}`}
						on:click={() => handleNumberClick(number)}
					>
						{number}
					</button>
				{/each}
			</div>
			<div class="operations">
				{#each operations as operation (operation)}
					<button
						class={`btn ${operation === selectedOperation ? 'btn-silver' : 'btn-orange'}`}
						on:click={() => handleOperationClick(operation)}
					>
						{operation}
					</button>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.calculator {
		background-color: rgb(28, 28, 28);
		width: 240px;
		padding: 15px;
		border-radius: 7px;
	}
	.digits {
		display: flex;
	}
	.operations {
		display: flex;
		flex-direction: column;
	}
	.numbers {
		display: flex;
		flex-wrap: wrap;
		width: 200px;
	}
	.btn {
		width: 50px;
		height: 50px;
		border-radius: 100px;
		background-color: rgb(151, 112, 112);
		font-size: 20px;
		font-weight: bold;
		border: none;
		margin: 5px;
		color: azure;
	}
	.btn-lg {
		width: 110px;
	}
	.btn-orange {
		background-color: rgb(243, 100, 43);
	}
	.btn-silver {
		background-color: rgb(216, 148, 148);
	}
	.btn-xlg {
		width: 170px;
	}
	.results {
		height: 60px;
		color: white;
		font-size: 50px;
		display: flex;
		flex-direction: row-reverse;
		margin-right: 10px;
	}
</style>
