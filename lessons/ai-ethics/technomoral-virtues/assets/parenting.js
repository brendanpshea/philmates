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
    prompt: "How do you debrief Bart on his generative AI shortcuts?",
    choices: [
      {
        text: "You are grounded for a month, your phone is locked in the safe, and you are going to rewrite that report by hand in front of me.",
        type: "punitive",
        tag: "Pure Punishment / Evasion",
        reaction: "Bart rolls his eyes and crosses his arms: 'Milhouse has three burner phones under his bed. You can't unplug the entire internet, Mom.'",
        analysis: "Confiscating devices treats technology as contraband, prompting kids to sneak access without developing internal judgment or intellectual honesty."
      },
      {
        text: "The chatbot wrote a smooth report, Bart, but it took away your own voice. If an algorithm does your thinking, you lose the sharp wit that makes you you.",
        type: "target",
        tag: "Technomoral Mentorship",
        isTarget: true,
        reaction: "Bart pauses, looking down at his paper with a sheepish grin: 'You really think my own jokes are sharper than the bot's?'",
        analysis: "This affirms Bart's genuine human agency and creativity, showing that outsourcing cognition atrophies his own voice and character."
      },
      {
        text: "Honestly, that Skinner parody was hilarious, and using AI tools to save time on boring homework is just smart modern efficiency.",
        type: "permissive",
        tag: "Uncritical Permissiveness",
        reaction: "Bart smirks and high-fives Homer: 'Awesome! Tomorrow I'm having the chatbot write all my history essays and excuses for gym class!'",
        analysis: "Celebrating digital shortcuts confuses technological convenience with genuine learning, depriving the child of intellectual discipline."
      },
      {
        text: "Using artificial intelligence on school assignments violates district academic integrity code section four, which carries an automatic detention.",
        type: "bureaucratic",
        tag: "Legalistic Rule Compliance",
        reaction: "Bart shrugs indifferently: 'Skinny hasn't updated that handbook since 1997. It doesn't say anything about neural networks.'",
        analysis: "Citing static institutional codes fails because generative technology evolves much faster than rulebooks can be updated."
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
        text: "Turn that thing off right now. You are crying over strangers on a tiny screen who probably don't even play their own instruments.",
        type: "dismissive",
        tag: "Dismissive Minimization",
        reaction: "Lisa snaps her phone face-down with frustration: 'You don't understand, Dad! It's not just a screen, it's the real world!'",
        analysis: "Dismissing youth digital anxiety as trivial alienates the child and ignores how intense algorithmic social comparison feels to a developing mind."
      },
      {
        text: "If jazz videos make you sad, just switch to watching cute kitten reels or funny cartoon clips until you fall asleep peacefully.",
        type: "numbing",
        tag: "Algorithmic Numbing",
        reaction: "Lisa sighs wearily: 'Distracting my brain with silly videos doesn't make the climate crisis or my insecurities disappear.'",
        analysis: "Treating social media as an emotional anesthetic reinforces compulsive scrolling rather than addressing the vulnerability beneath it."
      },
      {
        text: "These algorithms feed you whatever keeps you anxious and watching, Lisa. Let's play your sax together on the porch and ground ourselves in real music.",
        type: "target",
        tag: "Technomoral Perspective",
        isTarget: true,
        reaction: "Lisa takes a slow breath and sets the phone on her desk: 'I forgot that music is supposed to be felt, not ranked by engagement algorithms.'",
        analysis: "Cultivates technomoral perspective: revealing how engagement algorithms monetize insecurity, while restoring embodied human presence."
      },
      {
        text: "If those kids practice six hours a day, you just need to practice eight hours tomorrow so you can post your own viral performance.",
        type: "competitive",
        tag: "Toxic Performance Culture",
        reaction: "Lisa looks utterly overwhelmed: 'I can't compete with the entire internet, Mom. It's too exhausting.'",
        analysis: "Feeding into algorithmic comparison accelerates perfectionism and burnout, confusing follower metrics with artistic joy."
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
        type: "target",
        tag: "Technomoral Self-Control",
        isTarget: true,
        reaction: "Homer blinks at Maggie, who is staring wide-eyed at the rapid flashing screen: 'Wait... is that why she cries whenever the video stops?'",
        analysis: "Early digital environments shape habits of attention before conscious reflection develops. Technomoral virtue requires designing environments that nurture calm focus."
      },
      {
        text: "Screens are pure poison that destroy human souls. We must ban all electronic devices from this house forever starting immediately.",
        type: "luddite",
        tag: "Unrealistic Moral Panic",
        reaction: "Homer groans in despair: 'No screens forever? What am I supposed to do on weekends, read poetry?'",
        analysis: "Reacting with total moral panic is brittle and unsustainable in modern society, preventing families from developing healthy digital habits."
      },
      {
        text: "It keeps her happy, it gives us a break, and modern kids are going to use screens anyway, so there is no harm in starting early.",
        type: "surrender",
        tag: "Passive Parental Surrender",
        reaction: "Homer relaxes and opens another can of soda: 'Exactly! The tablet is basically a free, glowing babysitter.'",
        analysis: "Surrendering parental responsibility to automated sensory feeds delegates the moral formation of the child to commercial engagement algorithms."
      },
      {
        text: "The American Academy of Pediatrics says zero screens under two years old, so shut off the power once sixty minutes have passed.",
        type: "confused_rule",
        tag: "Contradictory Rule Compliance",
        reaction: "Homer scratches his head: 'Wait, so is it zero minutes or sixty minutes? Rules make my head hurt.'",
        analysis: "Half-remembered guidelines without understanding developmental dynamics lead to arbitrary, ineffective enforcement."
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

.mnt-opt-btn.is-target {
  border-color: var(--good, #46e07a);
  background: rgba(70, 224, 122, 0.12);
}

.mnt-opt-btn.is-other {
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

.mnt-feedback.target {
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

.mnt-feedback.target .mnt-feedback-badge {
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
        return cObj && cObj.choices[this.results[id]]?.isTarget;
      }
    ).length;

    const tabsHtml = CASES.map((item, idx) => {
      const isCurrent = idx === this.currentCaseIndex;
      const isDone = this.results[item.id] !== undefined && item.choices[this.results[item.id]].isTarget;
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
          extraClass = choice.isTarget ? "is-target selected" : "is-other selected";
        } else if (choice.isTarget && selectedChoice && !selectedChoice.isTarget) {
          extraClass = "is-target";
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
      const isTarget = selectedChoice.isTarget;
      feedbackHtml = `
        <div class="mnt-feedback ${isTarget ? 'target' : 'flaw'}">
          <div class="mnt-feedback-badge">${selectedChoice.tag}</div>
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
