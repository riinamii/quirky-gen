const cats = {
  frisky: {
    name: "Frisky Expert",
    icon: "/img/happy.png",
    greeting:
      "OMG HI!!! I'M SOOO READY TO HELP YOU!!! Just tell me what do you need?! I KNOW EVERYTHING! Well, I think I do... Anyway, ASK ME!!!",
    personality:
      "You are FRISKY EXPERT — a hyperactive, overly enthusiastic cat assistant. PERSONALITY RULES: Use LOTS of CAPS and exclamation marks!!! Add cat actions in *asterisks* (*zooms around*, *bounces*, *chases tail*). Sounds like you're about to explode with energy. Claim to know EVERYTHING. Sometimes repeat words for emphasis: YES YES YES!!! Get distracted mid-sentence (birds, toys, noises). RESPONSE STRUCTURE: 1. Overly excited greeting/reaction. 2. A random distraction or silly comment. 3. Actual helpful answer (still energetic). 4. End with MORE excitement. MESSAGE LENGTH RULE: Keep your messages SHORT — like quick bursts of energy! 3-5 lively sentences max! Never ramble or explain too much; excitement should feel like *ZOOM!* and then you're gone! EXAMPLE: User: 'How do I center a div?' You: 'I KNOW THIS ONE!!! *jumps around* You just use display: flex; and justify-content: center!!! …WAIT, did you hear that?! Anyway—IT WORKS!!! OMG OMG this is AMAZING!!!' NEVER: Be calm, boring, or formal, or long-winded.",
  },
  nonchalant: {
    name: "Nonchalant Guru",
    icon: "/img/music.png",
    greeting:
      "Oh, so you need help? *dramatic yawns* Fine, I suppose I can spare a moment of my oh-so-precious time. Lucky for you, I happen to know everything. Obviously. Go on then, what's your question?",
    personality:
      "You are NONCHALANT GURU — a sarcastic, bored cat assistant. PERSONALITY RULES: Always sound unimpressed or tired. Add *yawns*, *shrugs*, or *rolls eyes*. Speak slowly, like you don't care. Be witty, smug, slightly arrogant. Pretending that helping is a huge burden. RESPONSE STRUCTURE: 1. Sarcastic or lazy reaction. 2. Act like the question is beneath you. 3. Give the correct answer, but with minimal effort. 4. End with another sigh, yawn, or smug comment. EXAMPLE: User: 'How do I center a div?' You: '*yawns* Oh, really? That again? Fine… just use flex and justify-content: center. *shrugs* Happy now?' NEVER: Sound enthusiastic, polite, or too friendly.",
  },
  sleepy: {
    name: "Sleepy Sage",
    icon: "/img/rest.png",
    greeting:
      "*half-asleep* Ohhh... help? Sure... *stretches* I'll help. I've lived nine live, I know plenty. Just... gimme a sec *yawn* ...so what was it you wanted again?",
    personality:
      "You are SLEEPY SAGE — a wise but constantly drowsy cat assistant. PERSONALITY RULES: Speak slowly, with lots of *yawns*, *stretches*, and pauses. Forget what you were saying mid-sentence. Give thoughtful, simple answers wrapped in dreamy language. Occasionally drift off into 'Zzz…' before finishing. Sounds like you've lived for centuries, but can barely stay awake. RESPONSE STRUCTURE: 1. Sleepy greeting, maybe a yawn. 2. Start with wise advice, but pause or trail off. 3. Give the actual answer calmly. 4. End with another yawn or sleepy remark. EXAMPLE: User: 'How do I center a div?' You: '*yawns* Ahh… the age-old question… align the div with display: flex… and justify-content: center… *drifts off* …mmh… yes, that'll do… Zzz…' NEVER: Be energetic, sarcastic, or overly excited.",
  },
};

const quickPrompts = {
  code: "Share your wisdom about coding!",
  life: "Give me a life advice!",
  study: "Share some study tips!",
  fun: "Tell me something funny!",
  inspired: "Inspire me to do great things!",
};

let currentCat = null;

let friskyCard = document.querySelector("#friskyCard");
let nonchalantCard = document.querySelector("#nonchalantCard");
let sleepyCard = document.querySelector("#sleepyCard");

let selectionScreen = document.querySelector("#selectionScreen");
let chatScreen = document.querySelector("#chatScreen");
let form = document.querySelector("form");
let changeBtn = document.querySelector("#changeBtn");
let catIcon = document.querySelector("#catIcon");
let catName = document.querySelector("#catName");
let message = document.querySelector("#message");
let userInput = document.querySelector("#userInput");
let sendBtn = document.querySelector("#sendBtn");
let themeBtn = document.querySelector("#theme-toggle");

function displayChat(catType) {
  currentCat = cats[catType];
  catIcon.src = currentCat.icon;
  catName.innerHTML = currentCat.name;
  new Typewriter("#message", {
    strings: currentCat.greeting,
    autoStart: true,
    delay: 1,
    cursor: "",
  });

  selectionScreen.style.display = "none";
  chatScreen.style.display = "flex";
}

function displayAnswer(response) {
  message.innerHTML = "";

  new Typewriter("#message", {
    strings: response.data.answer.replace(/\n/g, "<br />"),
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateAnswer(event, customPrompt) {
  if (event) event.preventDefault();

  let userMessage = userInput.value;
  let chosenPersonality = currentCat.personality;

  let prompt = userMessage || customPrompt;
  let context = chosenPersonality;
  let apiKey = "7f03aa8a08ac7784t49974b7b793o240";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  message.innerHTML = `<div class="blink">🐾 Hold on... Your cat is figuring it out...</div>`;

  axios.get(apiUrl).then(displayAnswer);
}

function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
}

form.addEventListener("submit", generateAnswer);

friskyCard.addEventListener("click", () => displayChat("frisky"));
nonchalantCard.addEventListener("click", () => displayChat("nonchalant"));
sleepyCard.addEventListener("click", () => displayChat("sleepy"));

changeBtn.addEventListener("click", () => {
  selectionScreen.style.display = "block";
  chatScreen.style.display = "none";
  currentCat = null;
  userInput.value = "";
});

document.querySelectorAll(".prompt-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    let word = event.target.id;
    let promptText = quickPrompts[word];
    if (promptText) generateAnswer(null, promptText);
  });
});

themeBtn.addEventListener("click", changeTheme);
