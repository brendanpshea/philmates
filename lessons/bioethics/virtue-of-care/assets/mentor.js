/* =====================================================================
   <phil-mentor> — "Rounds with Amy: Mentoring Clinical Care"

   In virtue ethics, character is not transmitted via checklists; it is
   cultivated through habituation, modeling, and guided feedback.
   The learner plays Dr. Jo March debriefing resident Amy across three
   common clinical care dilemmas.

   The widget challenges the learner on two levels:
   1. Diagnosing what Amy missed in patient care (presence, responsiveness,
      or boundaries).
   2. Modeling the virtue of care in the feedback given to Amy herself
      (supportive, diagnostic, and constructive rather than punitive,
      cynical, or bureaucratic).
   ===================================================================== */

const CASES = [
  {
    id: "laurence",
    title: "1. Mr. Laurence",
    subtitle: "Presence vs. Screen",
    amyQuote: "I completed Mr. Laurence's medication reconciliation on the tablet, verified his lab panels, confirmed his beta-blocker dosage, and printed the five-page discharge packet. The attending approved the sign-out in eleven minutes. He seemed quiet, but every test was stable and he signed every form.",
    prompt: "How do you debrief Amy on Mr. Laurence's discharge?",
    choices: [
      {
        text: "Next time, ensure the electronic record documents that he had time for questions. If there is ever an audit, that note protects the hospital.",
        type: "procedural",
        tag: "Bureaucratic Risk Management",
        reaction: "Amy nods and jots a note on her stylus. 'Understood. I will add an addendum in Epic so our documentation is covered.'",
        analysis: "This reinforces Amy's misconception that patient care is merely liability management. It completely sidesteps the human relationship at the bedside."
      },
      {
        text: "Your reconciliation was accurate, Amy. But he is clutching his discharge papers in a tight fist. What did you notice about him before printing?",
        type: "target",
        tag: "Virtuous Mentorship",
        isTarget: true,
        reaction: "Amy pauses and looks through the window toward the snowy porch. 'He... he was staring away the whole time. I assumed he was just tired, but I never actually looked up from the screen to ask.'",
        analysis: "A caring mentor affirms the resident's technical competence while gently directing her attention toward presence and observation. It cultivates clinical attentiveness without humiliating the learner."
      },
      {
        text: "You completely failed him as a clinician. He left feeling processed like an assembly-line order. You need to review his chart and redo it.",
        type: "harsh",
        tag: "Harsh & Punitive",
        reaction: "Amy tenses defensively, holding her tablet tightly. 'I followed every hospital discharge protocol to the letter. If the chart is accurate, what did I do wrong?'",
        analysis: "Scolding a trainee models the very lack of care you are criticizing. Harsh correction triggers anxiety and defensiveness rather than helping the resident understand what Mr. Laurence experienced."
      },
      {
        text: "Mr. Laurence is lonely and struggling. You should call his home telephone tonight after your shift ends to check on his personal emotional state.",
        type: "paternalistic",
        tag: "Unbounded Over-involvement",
        reaction: "Amy looks overwhelmed and anxious. 'Am I expected to call all my discharged patients in the evenings from my personal phone?'",
        analysis: "Confusing care with limitless personal availability sets up unrealistic expectations, blurring healthy professional boundaries and accelerating burnout."
      }
    ]
  },
  {
    id: "beth",
    title: "2. Beth",
    subtitle: "Responsiveness vs. Schedule",
    amyQuote: "Beth had several questions about her fluid restriction and kept apologizing for taking up my time on a busy clinic morning. I smiled and told her: 'Don't worry at all, hospital scheduling allocates twenty minutes for follow-up visits anyway!'",
    prompt: "How do you help Amy hear what Beth was really saying?",
    choices: [
      {
        text: "Beth apologizes constantly because of her chronic cardiac illness. You will burn out quickly if you overthink every casual remark patients make.",
        type: "harsh",
        tag: "Cynical Dismissal",
        reaction: "Amy shrugs. 'Okay, so as long as her dosage instructions are correct, I shouldn't worry about her comments.'",
        analysis: "Dismissing a patient's vulnerability trains residents to become numb and cynical, eroding clinical empathy over time."
      },
      {
        text: "Remind her to direct routine follow-up questions to the clinic triage nurse so your morning rounds can stay on schedule for the remaining beds.",
        type: "procedural",
        tag: "Workflow Protection",
        reaction: "Amy nods. 'Good idea, that will prevent clinic flow from getting backed up on heavy days.'",
        analysis: "Treating patient anxiety as a workflow bottleneck ignores Joan Tronto's fourth phase of care: responsiveness to how care lands for the recipient."
      },
      {
        text: "You meant well, Amy, but Beth was not worried about our schedule. She feels guilty for needing help. How can we answer her fear rather than the clock?",
        type: "target",
        tag: "Virtuous Mentorship",
        isTarget: true,
        reaction: "Amy's eyes widen with realization. 'She wasn't worried about my schedule; she was worried about being a burden. I answered a logistical question she never asked.'",
        analysis: "This teaches responsiveness. It trains Amy to listen beneath the surface words to recognize the vulnerability and moral status of the patient."
      },
      {
        text: "Promise Beth she can reach out directly whenever she feels anxious, and reassure her that you will personally prevent her from ever feeling ignored.",
        type: "paternalistic",
        tag: "Unrealistic Promise",
        reaction: "Amy hesitates. 'I want to help, but with thirty patients on service, I don't know if I can promise that.'",
        analysis: "Offering unsustainable personal promises substitutes emotional reassurance for grounded, reliable care systems."
      }
    ]
  },
  {
    id: "laurie",
    title: "3. Laurie",
    subtitle: "Sustainable Care vs. Martyrdom",
    amyQuote: "I saw Laurie in the break room covering his tenth extra shift this month. He has a fever and dark circles under his eyes, but he's still smiling and making coffee for everyone. I felt guilty going home on time—should I volunteer for weekend shifts to prove I care?",
    prompt: "How do you advise Amy on professional dedication and limits?",
    choices: [
      {
        text: "Laurie's generosity is genuine, Amy, but working sick is not clinical virtue—it is exhaustion. Care that breaks the caregiver cannot sustain patients.",
        type: "target",
        tag: "Virtuous Mentorship",
        isTarget: true,
        reaction: "Amy nods slowly. 'So setting boundaries isn't a lack of caring—it is what allows us to keep caring safely tomorrow.'",
        analysis: "This frames boundaries as an essential part of the virtue of care. Sustainable care requires recognizing human limits and institutional responsibilities."
      },
      {
        text: "Laurie is behaving recklessly and ignoring shift guidelines. Do not let his poor boundaries convince you that working through fever is acceptable.",
        type: "harsh",
        tag: "Blaming & Critical",
        reaction: "Amy frowns. 'Laurie is beloved by every patient on the unit. It feels wrong to call his dedication foolish.'",
        analysis: "Attacking a respected colleague's dedication alienates the trainee and fails to explain why over-involvement is so common and tempting."
      },
      {
        text: "Clinical residency demands endurance. If you hope to earn a top fellowship, sacrificing personal rest is simply what dedicated clinicians must do.",
        type: "procedural",
        tag: "Exploitative Normalization",
        reaction: "Amy looks disheartened. 'I guess I just have to push through exhaustion like everyone else.'",
        analysis: "Equating clinical dedication with endless self-sacrifice reinforces institutional exploitation and drives clinician burnout and moral injury."
      },
      {
        text: "Log out the minute your assigned shift ends and detach entirely. You are paid for specific hours, not for worrying about the ward after you leave.",
        type: "paternalistic",
        tag: "Cold Detachment",
        reaction: "Amy looks unsettled. 'That feels cold. Isn't medicine supposed to be a caring profession?'",
        analysis: "Pushing a resident toward rigid self-preservation strips away clinical vocation, replacing exhaustion with cynicism."
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

class PhilMentor extends HTMLElement {
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

    const isAllComplete = completedCount === CASES.length;
    const hasNext = this.currentCaseIndex < CASES.length - 1;

    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <div class="mnt-box">
        <div class="mnt-tabs" role="tablist" aria-label="Clinical case debriefs">
          ${tabsHtml}
        </div>

        <div class="mnt-case-header">
          <img class="mnt-avatar" src="./assets/amy.png" alt="Dr. Amy">
          <div class="mnt-case-content">
            <div class="mnt-case-title">${c.subtitle} — Case Debrief</div>
            <p class="mnt-quote">"${c.amyQuote}"</p>
          </div>
        </div>

        <p class="mnt-prompt">${c.prompt}</p>

        <div class="mnt-options">
          ${choicesHtml}
        </div>

        ${feedbackHtml}

        <div class="mnt-footer">
          <div class="mnt-summary">
            Completed: ${completedCount} / ${CASES.length} debriefs mastered
          </div>
          ${selectedChoice && hasNext ? `
            <button class="mnt-next-btn" id="mnt-next">Next Case →</button>
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

customElements.define("phil-mentor", PhilMentor);
