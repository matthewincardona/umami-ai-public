<script>
	// @ts-nocheck
	import { onMount, afterUpdate } from 'svelte';
	import { marked } from 'marked';
	import OpenAI from 'openai';
	export let botPrompt;

	const messages = [];
	let botIsTyping = false;

	const openai = new OpenAI({
		dangerouslyAllowBrowser: true,
		apiKey: import.meta.env.VITE_OPENAI_API_KEY
	});

	async function generateResponse(userMessage) {
		let systemPrompt = ' Write all of your responses in markdown. Eg. using ** ** for bold text.';
		userMessage; // Combine the user's message and the hidden prompt
		try {
			const completion = await openai.responses.create({
				model: 'gpt-4o-mini',
				input: [
					{
						role: 'system',
						content: [
							{
								type: 'input_text',
								text: systemPrompt + ' ' + botPrompt
							}
						]
					},
					{
						role: 'user',
						content: [
							{
								type: 'input_text',
								text: userMessage
							}
						]
					}
					// {
					// 	role: 'assistant',
					// 	content: [
					// 		{
					// 			type: 'output_text',
					// 			text: ''
					// 		}
					// 	]
					// }
				],
				text: {
					format: {
						type: 'text'
					}
				},
				reasoning: {},
				tools: [],
				temperature: 1,
				max_output_tokens: 1000,
				top_p: 1,
				store: true
			});
			return completion.output_text;
		} catch (error) {
			if (error.response) {
				console.log(error.response.status);
				console.log(error.response.data);
			} else {
				console.log(error.message);
			}
		}
	}

	// Let the user send a message using the enter key
	onMount(() => {
		const inputElement = document.getElementById('chat-input');

		inputElement.addEventListener('keydown', async (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				const message = inputElement.value;

				addChatMessage(message, true);
				inputElement.value = '';
				botIsTyping = true;

				let response = await generateResponse(message);

				let responseAsFormattedMarkdown = marked.parse(response); // parse markdown
				addChatMessage(responseAsFormattedMarkdown);
				botIsTyping = false;
			}
		});
	});

	function addChatMessage(message, isUser = false) {
		messages.push({ message, isUser });
	}
</script>

<div id="chat-container">
	<div id="chat-container__inner">
		{#each messages as { message, isUser }}
			<div class="chat-message {isUser ? 'user-message' : 'bot-message'}">
				<div class="message-text {isUser ? '' : 'bot-text'}">{@html message}</div>
				{#if !isUser && botIsTyping}
					<div class="typing-indicator" />
				{/if}
			</div>
		{/each}
	</div>
	<div class="chat-input-container">
		<textarea id="chat-input" rows="3" placeholder="Say hello!" />
	</div>
</div>

<style>
	#chat-input {
		resize: none;
		margin-left: auto;
		margin-right: auto;
		padding: 12px;
		width: 100%;
		border-radius: 5px;
	}

	.chat-input-container {
		margin: 20px;
		display: flex;
		justify-content: center;
	}

	#chat-container {
		border: solid 1px rgb(82, 81, 81);
		width: 100%;
		border-radius: 5px;
	}

	#chat-container__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3rem;
		padding-left: 1rem;
		padding-top: 2rem;
		padding-bottom: 1rem;
		margin: 0 auto;
		overflow-y: auto;
		overflow-x: hidden;
		height: 500px;
	}

	.chat-message {
		display: flex;
		margin: 8px;
		margin-bottom: 26px;
	}

	.user-message {
		justify-content: flex-end;
		margin-left: auto;
	}

	.user-message::after {
		content: 'You';
		margin-left: 10px;
		margin-top: 10px;
		color: #8d8d8d;
		font-size: 0.8rem;
	}

	.bot-message {
		margin-right: auto;
		justify-content: flex-start;
	}

	.bot-text {
		border: solid 2px rgb(98, 120, 215);
		border-radius: 8px;
	}

	.bot-message::before {
		content: 'Umami';
		margin-right: 10px;
		margin-top: 10px;
		color: rgb(98, 120, 215);
		font-size: 0.8rem;
	}

	.message-text {
		padding: 12px;
		border-radius: 8px;
		background-color: #eee;
		font-size: 0.8rem;
		max-width: 65ch;
	}

	pre {
		max-width: 10px;
	}

	.typing-indicator {
		width: 10px;
		height: 10px;
		background-color: #bbb;
		border-radius: 50%;
		margin: 0 8px;
		animation: typing 1s infinite;
		position: absolute;
	}

	@keyframes typing {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 1;
		}
	}
</style>
