import type { ProfessionData } from '../types/Profession';

export default function Profession({ name, description, risk }: ProfessionData) {
  return (
    <details class="profession">
      <summary>
          {name}<span style="margin-left: auto;">Risk: <span class={risk.toLocaleLowerCase()}>{risk}</span></span>
      </summary>
        <p class="description">{description}</p>
    </details>
  );
}
      