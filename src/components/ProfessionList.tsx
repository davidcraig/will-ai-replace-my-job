import { createSignal } from 'solid-js';
import professionData from '../professions.json';
import Profession from './Profession.tsx';
import type { ProfessionData } from '../types/Profession';

export default function ProfessionList() {
    // Filter professions based on the input value
    const [filterText, setFilterText] = createSignal('');
    let filteredProfessions = () => {
        return professionData.filter((profession: ProfessionData) =>
            profession.name.toLowerCase().includes(filterText().toLowerCase())
        ).sort((a: ProfessionData, b: ProfessionData) => a.name.localeCompare(b.name));
    };

    return (
        <div class="profession-list">
            <input type="text"
                placeholder="Search..."
                onInput={(e) => setFilterText(e.currentTarget.value)}
                value={filterText()} />

            <div class="grid">
                {filteredProfessions().map((profession) => (
                    <div>
                        <Profession {...profession} />
                    </div>
                ))}
            </div>
        </div>
    );
}