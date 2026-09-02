/* =====================================================================
   <phil-parent> — "Parenting in Springfield: Technomoral Mentorship"

   In virtue ethics, moral character is not formed by reciting rules;
   it is shaped by habituation, environmental design, and guided feedback.
   The learner steps into Marge or Homer Simpson's shoes navigating
   three modern digital dilemmas with their children.

   Pedagogical goal:
   Demonstrate that rigid bans and lazy permissiveness both fail,
   and that cultivating technomoral virtues (self-control, honesty,
   perspective) equips young people to navigate an uncharted digital world.
   ===================================================================== */

const CASES = [
  {
    id: "bart",
    title: "1. Bart & AI",
    subtitle: "Generative AI & Intellectual Honesty",
    kidAvatar: "./assets/bart.png",
    kidName: "Bart",
    situation: "Bart used an uncensored AI chatbot to write his entire book report on To Kill a Mockingbird in twenty seconds, complete with synthetic quotes, and generated a viral deepfake video roasting Principal Skinner.",
    prompt: "How do you respond to Bart's generative AI shortcuts?",
    choices: [
      {
        text: "You are grounded for life, all electronics in this house are going into the fireplace, and you will rewrite that report in calligraphy.",
        type: "flaw",
        tag: "Punitive Overkill",
        isConstructive: false,
        reaction: "Bart laughs: 'Go ahead, Dad! Milhouse already backed up my Skinner deepfakes to three cloud servers and a thumb drive.'",
        analysis: "Extreme punitive overreaction treats technology as contraband, instantly triggering evasion and turning digital rebellion into a badge of honor."
      },
      {
        text: "The chatbot wrote a slick paper, Bart, but it took your voice. If an algorithm does your thinking, you lose the wit that makes you you.",
        type: "constructive",
        tag: "Reflective Mentorship",
        isConstructive: true,
        reaction: "Bart pauses, glancing at his paper with a sheepish grin: 'You really think my own jokes are sharper than the bot's?'",
        analysis: "Constructive strategy (Internal Motivation): appeals to Bart's authentic voice, showing that outsourcing cognition atrophies his real talent."
      },
      {
        text: "Honestly, that Skinner deepfake is comedy gold. Can you show me how to use this bot to automate my safety reports at the nuclear plant?",
        type: "flaw",
        tag: "Cynical Surrender",
        isConstructive: false,
        reaction: "Bart grins and slaps Homer five: 'Done! Let's automate your job so you can take four-hour donut breaks every afternoon!'",
        analysis: "Celebrating shortcuts confuses lazy evasion with intelligence, completely abandoning parental guidance and intellectual discipline."
      },
      {
        text: "You're writing your own thesis by hand first, Bart. Then we can use the chatbot together to find counterarguments and test your ideas.",
        type: "constructive",
        tag: "Structured Scaffolding",
        isConstructive: true,
        reaction: "Bart grumbles but pulls out a pen: 'Fine. But if my thesis roasts Atticus Finch's courtroom strategy, you have to read it.'",
        analysis: "Constructive strategy (Developmental Scaffolding): uses boundaries to guarantee independent thinking before introducing AI as an analytical partner."
      }
    ]
  },
  {
    id: "lisa",
    title: "2. Lisa & Algorithmic Feeds",
    subtitle: "Social Media & Technomoral Perspective",
    kidAvatar: "./assets/lisa.png",
    kidName: "Lisa",
    situation: "It is 2:30 AM. Lisa is illuminated by her smartphone screen, crying quietly as an algorithmic video feed serves her endless clips of seven-year-old saxophone prodigies followed by catastrophic climate warnings.",
    prompt: "How do you help Lisa navigate algorithmic comparison and digital despair?",
    choices: [
      {
        text: "Turn off that glowing rectangle right now! You are crying over strangers who probably fake their videos with filters and autotune anyway.",
        type: "flaw",
        tag: "Harsh Dismissal",
        isConstructive: false,
        reaction: "Lisa snaps her phone face-down in tears: 'You don't understand, Dad! It's not just a screen, it's the state of the world!'",
        analysis: "Dismissing youth digital anxiety as trivial alienates the teenager and shuts down future communication about mediated distress."
      },
      {
        text: "These algorithms feed you whatever keeps you anxious, Lisa. Let's play your sax together on the porch and ground ourselves in real music.",
        type: "constructive",
        tag: "Embodied Grounding",
        isConstructive: true,
        reaction: "Lisa takes a slow breath and sets the phone on her desk: 'I forgot that music is supposed to be felt, not ranked by engagement algorithms.'",
        analysis: "Constructive strategy (Perspective & Embodied Art): demystifies engagement algorithms while restoring human presence and musical joy."
      },
      {
        text: "If prodigies and climate change make you sad, honey, just switch over to funny panda reels or shopping hauls until you fall asleep.",
        type: "flaw",
        tag: "Algorithmic Numbing",
        isConstructive: false,
        reaction: "Lisa sighs wearily: 'Distracting my brain with consumer junk doesn't solve the climate crisis or my insecurities, Mom.'",
        analysis: "Treating social feeds as an emotional pacifier reinforces compulsive scrolling rather than helping the child confront vulnerability."
      },
      {
        text: "No phones in bedrooms after ten, starting with mine. We leave devices in the kitchen basket so your brain has protected quiet to rest.",
        type: "constructive",
        tag: "Protective Boundary",
        isConstructive: true,
        reaction: "Lisa looks relieved as she places the phone in the basket: 'Honestly... my eyes hurt, and I didn't know how to stop scrolling.'",
        analysis: "Constructive strategy (Environmental Scaffolding): provides a clear, household-wide boundary modeled by parents to safeguard sleep and focus."
      }
    ]
  },
  {
    id: "maggie",
    title: "3. Maggie & Screen Habituation",
    subtitle: "Early Attention & Technomoral Self-Control",
    kidAvatar: "./assets/maggie.png",
    kidName: "Maggie",
    situation: "Homer placed a tablet in Maggie's crib playing hyperactive animated sensory videos on continuous auto-play so the living room stays quiet during Sunday football.",
    prompt: "How do you evaluate using high-stimulus autoplay screens to soothe a toddler?",
    choices: [
      {
        text: "High-stimulus autoplay trains her brain to crave nonstop sensory surges, Homer. A quiet toddler today means an attention span broken tomorrow.",
        type: "constructive",
        tag: "Attentional Habituation",
        isConstructive: true,
        reaction: "Homer blinks at Maggie, who is staring wide-eyed at the flashing screen: 'Wait... is that why she cries whenever the video stops?'",
        analysis: "Constructive strategy (Developmental Awareness): highlights how early sensory environments shape baseline habits before conscious reflection develops."
      },
      {
        text: "Screens are digital radiation that rot human souls! We must smash every television, phone, and microwave in Springfield this instant!",
        type: "flaw",
        tag: "Hysterical Moral Panic",
        isConstructive: false,
        reaction: "Homer shrieks and hugs the microwave: 'Not the microwave! How will I heat my frozen burritos?!'",
        analysis: "Hysterical moral panic is brittle and unsustainable, alienating family members instead of cultivating balanced, healthy habits."
      },
      {
        text: "It keeps her completely silent, it lets us watch the game, and all modern kids use screens anyway, so who cares if she starts early?",
        type: "flaw",
        tag: "Passive Surrender",
        isConstructive: false,
        reaction: "Homer kicks back on the couch and opens a soda: 'Exactly! That glowing plastic rectangle is the best parent in this house.'",
        analysis: "Surrendering parental presence to commercial auto-play outsources infant sensory habituation to engagement algorithms."
      },
      {
        text: "Turn off the screen and give her wooden blocks on the rug. If we want her to learn focus and patience, she needs tactile play, not pixels.",
        type: "constructive",
        tag: "Tactile Environmental Design",
        isConstructive: true,
        reaction: "Homer turns off the tablet and hands Maggie a stack of blocks; she begins tapping them together with focused curiosity.",
        analysis: "Constructive strategy (Environmental Substitution): replaces passive sensory saturation with active tactile exploration to support natural cognitive growth."
      }
    ]
  }
];

const STYLE = `
:host {
  display: block;
  margin: 0;
  font-family: var(--body);
  color: var(--ink);
}

.mnt-box {
  background: var(--panel-2, #1d2235);
  border: 3px solid var(--border, #2d354d);
  box-shadow: 0 4px 0 var(--shadow, #090a10);
  padding: 10px 14px;
}

.mnt-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  border-bottom: 2px solid var(--border, #2d354d);
  padding-bottom: 6px;
  overflow-x: auto;
}

.mnt-tab {
  background: var(--panel, #161a26);
  color: var(--muted, #94a1c2);
  border: 2px solid var(--border, #2d354d);
  font-family: var(--pixel, monospace);
  font-size: 10.5px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.mnt-tab:hover {
  background: #252c42;
  color: var(--ink, #eef1ff);
}

.mnt-tab[aria-selected="true"] {
  background: var(--accent-3, #4cc2ff);
  color: #0b0f19;
  border-color: var(--accent-3, #4cc2ff);
  font-weight: bold;
}

.mnt-tab.completed {
  border-left: 4px solid var(--good, #46e07a);
}

.mnt-case-header {
  display: flex;
  gap: 10px;
  background: var(--panel, #161a26);
  border: 2px solid var(--border, #2d354d);
  padding: 7px 10px;
  margin-bottom: 8px;
  align-items: flex-start;
}

.mnt-avatar {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  border: 2px solid var(--accent-3, #4cc2ff);
  flex-shrink: 0;
  image-rendering: pixelated;
  background: #11131f;
  object-fit: contain;
}

.mnt-case-content {
  flex: 1;
}

.mnt-case-title {
  font-family: var(--pixel, monospace);
  font-size: 11px;
  color: var(--accent-3, #4cc2ff);
  margin: 0 0 2px;
}

.mnt-quote {
  font-size: 13.5px;
  line-height: 1.35;
  margin: 0;
  color: var(--ink, #eef1ff);
  font-style: italic;
}

.mnt-prompt {
  font-size: 14px;
  font-weight: 600;
  margin: 4px 0 7px;
  color: var(--ink, #eef1ff);
}

.mnt-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 6px;
}

@media (max-width: 720px) {
  .mnt-options {
    grid-template-columns: 1fr;
  }
}

.mnt-opt-btn {
  background: var(--panel, #161a26);
  color: var(--ink, #eef1ff);
  border: 2px solid var(--border, #2d354d);
  padding: 7px 10px;
  text-align: left;
  font-family: var(--body);
  font-size: 13px;
  line-height: 1.3;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.mnt-opt-btn:hover:not(:disabled) {
  background: #252c42;
  border-color: var(--accent-3, #4cc2ff);
}

.mnt-opt-btn.selected {
  border-color: var(--accent-3, #4cc2ff);
  background: #212940;
}

.mnt-opt-btn.is-constructive {
  border-color: var(--good, #46e07a);
  background: rgba(70, 224, 122, 0.12);
}

.mnt-opt-btn.is-flaw {
  border-color: var(--bad, #ff6a6a);
  opacity: 0.85;
}

.mnt-feedback {
  background: var(--panel, #161a26);
  border: 2px solid var(--border, #2d354d);
  border-left: 4px solid var(--accent-3, #4cc2ff);
  padding: 7px 10px;
  margin-top: 6px;
  animation: fadeIn 0.2s ease;
}

.mnt-feedback.constructive {
  border-left-color: var(--good, #46e07a);
}

.mnt-feedback.flaw {
  border-left-color: var(--bad, #ff6a6a);
}

.mnt-feedback-badge {
  font-family: var(--pixel, monospace);
  font-size: 10px;
  margin-bottom: 3px;
  color: var(--accent-3, #4cc2ff);
}

.mnt-feedback.constructive .mnt-feedback-badge {
  color: var(--good, #46e07a);
}

.mnt-feedback.flaw .mnt-feedback-badge {
  color: var(--bad, #ff6a6a);
}

.mnt-feedback-rx {
  font-size: 13px;
  line-height: 1.35;
  margin: 0 0 4px;
  color: var(--ink, #eef1ff);
}

.mnt-feedback-analysis {
  font-size: 12.5px;
  line-height: 1.35;
  margin: 0;
  color: var(--muted, #94a1c2);
}

.mnt-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  padding-top: 4px;
  border-top: 1px solid var(--border, #2d354d);
}

.mnt-summary {
  font-size: 12px;
  color: var(--muted, #94a1c2);
}

.mnt-next-btn {
  background: var(--good, #46e07a);
  color: #0b0f19;
  border: none;
  font-family: var(--pixel, monospace);
  font-size: 10.5px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: bold;
}

.mnt-next-btn:hover {
  filter: brightness(1.1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

class PhilParent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentCaseIndex = 0;
    this.results = {}; // { caseId: selectedChoiceIndex }
  }

  connectedCallback() {
    this.render();
  }

  selectCase(index) {
    this.currentCaseIndex = index;
    this.render();
  }

  chooseOption(choiceIndex) {
    const c = CASES[this.currentCaseIndex];
    this.results[c.id] = choiceIndex;
    this.render();
  }

  nextCase() {
    if (this.currentCaseIndex < CASES.length - 1) {
      this.currentCaseIndex++;
      this.render();
    }
  }

  render() {
    const c = CASES[this.currentCaseIndex];
    const selectedIdx = this.results[c.id];
    const selectedChoice = selectedIdx !== undefined ? c.choices[selectedIdx] : null;
    const completedCount = Object.keys(this.results).filter(
      id => {
        const cObj = CASES.find(item => item.id === id);
        return cObj && cObj.choices[this.results[id]]?.isConstructive;
      }
    ).length;

    const tabsHtml = CASES.map((item, idx) => {
      const isCurrent = idx === this.currentCaseIndex;
      const isDone = this.results[item.id] !== undefined && item.choices[this.results[item.id]].isConstructive;
      return `
        <button role="tab" class="mnt-tab ${isDone ? 'completed' : ''}" 
                aria-selected="${isCurrent ? 'true' : 'false'}"
                data-idx="${idx}">
          ${item.title} ${isDone ? '✓' : ''}
        </button>
      `;
    }).join("");

    const choicesHtml = c.choices.map((choice, idx) => {
      let extraClass = "";
      if (selectedIdx !== undefined) {
        if (idx === selectedIdx) {
          extraClass = choice.isConstructive ? "is-constructive selected" : "is-flaw selected";
        }
      }
      return `
        <button class="mnt-opt-btn ${extraClass}" data-choice="${idx}">
          <span>${choice.text}</span>
        </button>
      `;
    }).join("");

    let feedbackHtml = "";
    if (selectedChoice) {
      const isConstructive = selectedChoice.isConstructive;
      feedbackHtml = `
        <div class="mnt-feedback ${isConstructive ? 'constructive' : 'flaw'}">
          <div class="mnt-feedback-badge">${isConstructive ? '✓ Constructive Approach' : '⚠ Parental Blunder'}: ${selectedChoice.tag}</div>
          <p class="mnt-feedback-rx">${selectedChoice.reaction}</p>
          <p class="mnt-feedback-analysis">${selectedChoice.analysis}</p>
        </div>
      `;
    }

    const hasNext = this.currentCaseIndex < CASES.length - 1;

    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <div class="mnt-box">
        <div class="mnt-tabs" role="tablist" aria-label="Springfield parenting dilemmas">
          ${tabsHtml}
        </div>

        <div class="mnt-case-header">
          <img class="mnt-avatar" src="${c.kidAvatar}" alt="${c.kidName}">
          <div class="mnt-case-content">
            <div class="mnt-case-title">${c.subtitle}</div>
            <p class="mnt-quote">${c.situation}</p>
          </div>
        </div>

        <p class="mnt-prompt">${c.prompt}</p>

        <div class="mnt-options">
          ${choicesHtml}
        </div>

        ${feedbackHtml}

        <div class="mnt-footer">
          <div class="mnt-summary">
            Completed: ${completedCount} / ${CASES.length} dilemmas resolved
          </div>
          ${selectedChoice && hasNext ? `
            <button class="mnt-next-btn" id="mnt-next">Next Dilemma →</button>
          ` : ''}
        </div>
      </div>
    `;

    // Attach listeners
    this.shadowRoot.querySelectorAll(".mnt-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.selectCase(Number(tab.dataset.idx));
      });
    });

    this.shadowRoot.querySelectorAll(".mnt-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.chooseOption(Number(btn.dataset.choice));
      });
    });

    const nextBtn = this.shadowRoot.getElementById("mnt-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextCase());
    }
  }
}

customElements.define("phil-parent", PhilParent);
