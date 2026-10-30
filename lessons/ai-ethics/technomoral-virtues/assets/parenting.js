/* =====================================================================
   <phil-parent> — "Parenting in Oak Hollow"

   In virtue ethics, character is not formed by reciting rules. It is
   shaped by habit, by surroundings, and by guided feedback. The learner
   steps into Dev or Tasha Kapoor's shoes for three modern dilemmas with
   their children: Marcus (10), Zoe (13), and baby Rosie.

   Teaching goal: harsh bans and lazy permissiveness both fail, while
   guidance that builds technomoral virtues (self-control, honesty,
   perspective) prepares kids for a world no rulebook covers.

   Teaching widget: ungraded, no completion hook, no persistence.
   ===================================================================== */

const CASES = [
  {
    id: "marcus",
    title: "1. Marcus & AI",
    subtitle: "Generative AI & Intellectual Honesty",
    kidAvatar: "./assets/marcus.png",
    kidName: "Marcus",
    situation: "Marcus had a chatbot write his whole book report on Holes in twenty seconds, fake quotes and all. Then he made a deepfake video roasting Principal Delgado, and it's all over school.",
    prompt: "How do you respond to Marcus's AI shortcuts?",
    choices: [
      {
        text: "You're grounded for life, every device goes in the trash, and you'll rewrite that report by hand. Twice.",
        type: "flaw",
        tag: "Punitive Overkill",
        isConstructive: false,
        reaction: "Marcus shrugs: 'Go ahead. My friend already saved the video to three cloud accounts.'",
        analysis: "Extreme punishment treats technology as contraband. It invites sneaking around and turns rebellion into a badge of honor."
      },
      {
        text: "The chatbot wrote a slick report, Marcus, but it isn't you. If a machine does your thinking, you lose the wit that makes you you.",
        type: "constructive",
        tag: "Reflective Mentorship",
        isConstructive: true,
        reaction: "Marcus looks at the report with a sheepish grin: 'You really think my jokes are better than the bot's?'",
        analysis: "Constructive: this appeals to Marcus's own voice, and shows how handing off his thinking would weaken a real talent."
      },
      {
        text: "Honestly, that video is hilarious. Can you show me how to get the bot to write my reports at work?",
        type: "flaw",
        tag: "Cynical Surrender",
        isConstructive: false,
        reaction: "Marcus high-fives his dad: 'Done! Then you can nap all afternoon.'",
        analysis: "Celebrating the shortcut confuses dodging the work with being smart, and gives up on guiding him."
      },
      {
        text: "You'll write your own thesis by hand first. Then we can use the chatbot together to find counterarguments and test your ideas.",
        type: "constructive",
        tag: "Structured Scaffolding",
        isConstructive: true,
        reaction: "Marcus groans but grabs a pen: 'Fine. But if my thesis beats the bot's, you have to read the whole thing.'",
        analysis: "Constructive: a boundary makes sure his own thinking comes first, and then AI becomes a partner for testing it."
      }
    ]
  },
  {
    id: "zoe",
    title: "2. Zoe & Feeds",
    subtitle: "Social Media & Technomoral Perspective",
    kidAvatar: "./assets/zoe.png",
    kidName: "Zoe",
    situation: "It's 2:30 a.m. Zoe is lit by her phone, crying quietly. Her feed serves endless clips of teenage artists with millions of followers, then one climate disaster after another.",
    prompt: "How do you help Zoe with the comparison and the despair?",
    choices: [
      {
        text: "Turn that thing off right now! You're crying over strangers who fake their videos with filters anyway.",
        type: "flaw",
        tag: "Harsh Dismissal",
        isConstructive: false,
        reaction: "Zoe slams the phone face down: 'You don't get it, Dad! It's not just a screen, it's the whole world!'",
        analysis: "Dismissing a teen's distress as silly shuts down the conversation, and she will stop bringing it to you."
      },
      {
        text: "This feed shows you whatever keeps you watching, even when it scares you. Come draw with me at the kitchen table instead.",
        type: "constructive",
        tag: "Embodied Grounding",
        isConstructive: true,
        reaction: "Zoe takes a slow breath and sets the phone down: 'I forgot I used to draw for fun, not for likes.'",
        analysis: "Constructive: this explains how engagement feeds work, and gives her back something she does for its own sake."
      },
      {
        text: "If those videos make you sad, honey, just switch to funny cat clips until you fall asleep.",
        type: "flaw",
        tag: "Algorithmic Numbing",
        isConstructive: false,
        reaction: "Zoe sighs: 'Burying it under cat videos doesn't fix anything, Mom.'",
        analysis: "Using the feed as a pacifier feeds the scrolling habit instead of helping her face what hurts."
      },
      {
        text: "No phones in bedrooms after ten, starting with mine. They all charge in the kitchen basket, so your brain gets quiet time to rest.",
        type: "constructive",
        tag: "Protective Boundary",
        isConstructive: true,
        reaction: "Zoe looks relieved as she drops the phone in the basket: 'Honestly, my eyes hurt, and I didn't know how to stop.'",
        analysis: "Constructive: a clear house-wide boundary, which the parents keep too, protects her sleep and focus."
      }
    ]
  },
  {
    id: "rosie",
    title: "3. Rosie & the Tablet",
    subtitle: "Early Attention & Technomoral Self-Control",
    kidAvatar: "./assets/rosie.png",
    kidName: "Rosie",
    situation: "Dev propped a tablet in Rosie's playpen, playing bright, fast videos on endless autoplay, so the living room stays quiet during Sunday football.",
    prompt: "How do you judge using autoplay videos to soothe a one-year-old?",
    choices: [
      {
        text: "Health experts advise no screen time for babies her age, Dev. She needs slow, quiet play, and nonstop autoplay crowds it out.",
        type: "constructive",
        tag: "Attentional Habituation",
        isConstructive: true,
        reaction: "Dev looks at Rosie, who stares wide-eyed at the flashing screen: 'Wait. Is that why she cries every time it stops?'",
        analysis: "Constructive: early surroundings shape her habits long before she can reflect on them."
      },
      {
        text: "Screens rot the brain! We're smashing every tablet, phone, and TV in this house tonight!",
        type: "flaw",
        tag: "Moral Panic",
        isConstructive: false,
        reaction: "Dev hugs the TV: 'Not during the playoffs!'",
        analysis: "Panic is brittle. It alienates the family instead of building balanced habits."
      },
      {
        text: "It keeps her quiet, it lets us watch the game, and every kid uses screens anyway. Who cares if she starts early?",
        type: "flaw",
        tag: "Passive Surrender",
        isConstructive: false,
        reaction: "Dev kicks back on the couch: 'Exactly. That tablet is the best babysitter in this house.'",
        analysis: "Handing her attention to autoplay lets an engagement algorithm shape her earliest habits."
      },
      {
        text: "Turn off the tablet and give her blocks on the rug. If we want her to learn focus and patience, she needs hands-on play.",
        type: "constructive",
        tag: "Tactile Environmental Design",
        isConstructive: true,
        reaction: "Dev switches off the tablet and hands Rosie a stack of blocks. She starts tapping them together, completely absorbed.",
        analysis: "Constructive: active, hands-on play replaces passive stimulation and supports her growing attention."
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
  font-size: 15px;
  line-height: 1.35;
  margin: 0;
  color: var(--ink, #eef1ff);
  font-style: italic;
}

.mnt-prompt {
  font-size: 15px;
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
  font-size: 15px;
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
  font-size: 15px;
  line-height: 1.35;
  margin: 0 0 4px;
  color: var(--ink, #eef1ff);
}

.mnt-feedback-analysis {
  font-size: 15px;
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
  font-size: 15px;
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
        <div class="mnt-tabs" role="tablist" aria-label="Oak Hollow parenting dilemmas">
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
