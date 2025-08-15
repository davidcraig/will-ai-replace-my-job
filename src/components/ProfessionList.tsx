import { createSignal } from 'solid-js';
import professionData from '../professions.json';
import Profession from './Profession.tsx';
import type { ProfessionData } from '../types/Profession';

export default function ProfessionList() {

    const [filterText, setFilterText] = createSignal('');
    const [sortBy, setSortBy] = createSignal('name');

    const resultingProfessions = () => {
        const filtered = professionData.filter((profession: ProfessionData) =>
            profession.name.toLowerCase().includes(filterText().toLowerCase())
        );
        
        if (sortBy() === 'risk') {
            const riskOrder = ['High', 'Medium', 'Low', 'Very Low'];
            return filtered.sort((a: ProfessionData, b: ProfessionData) => {
                return riskOrder.indexOf(a.risk) - riskOrder.indexOf(b.risk);
            });
        }

        if (sortBy() === 'name') {
            return filtered.sort((a: ProfessionData, b: ProfessionData) => a.name.localeCompare(b.name));
        }

        // Default: return filtered if sortBy is neither 'risk' nor 'name'
        return filtered;
    };

    return (
        <div class="profession-list">
            <input type="text"
                placeholder="Search..."
                onInput={(e) => setFilterText(e.currentTarget.value)}
                value={filterText()} />
            
            <select onChange={(e) => setSortBy(e.currentTarget.value)} value={sortBy()}>
                <option value="name">Sort by Name</option>
                <option value="risk">Sort by Risk</option>
            </select>

            <span style="margin-left: 1rem;">Results: {resultingProfessions().length}</span>

            <div class="grid">
                {resultingProfessions().map((profession) => (
                    <div>
                        <Profession {...profession} />
                    </div>
                ))}
            </div>
        </div>
    );
}