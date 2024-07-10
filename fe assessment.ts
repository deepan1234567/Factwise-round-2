// script.ts
import { calculateAge, isAdult } from './utils.js';

interface Celebrity {
    id: number;
    first: string;
    last: string;
    dob: string;
    gender: string;
    email: string;
    picture: string;
    country: string;
    description: string;
}

const celebrities: Celebrity[] = await fetch('path/to/your/json/file.json')
    .then(response => response.json());

const searchBar = document.getElementById('searchBar') as HTMLInputElement;
const celebrityList = document.getElementById('celebrityList') as HTMLElement;

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredCelebrities = celebrities.filter(celebrity => 
        `${celebrity.first} ${celebrity.last}`.toLowerCase().includes(query)
    );
    renderCelebrities(filteredCelebrities);
});

function renderCelebrities(celebrities: Celebrity[]) {
    celebrityList.innerHTML = '';
    celebrities.forEach(celebrity => {
        const celebrityItem = document.createElement('div');
        celebrityItem.classList.add('accordion-item');
        celebrityItem.innerHTML = `
            <div class="accordion-header">
                <img src="${celebrity.picture}" alt="${celebrity.first}">
                <h2>${celebrity.first} ${celebrity.last}</h2>
                <span class="toggle-icon">+</span>
            </div>
            <div class="accordion-content">
                <input type="text" value="${calculateAge(celebrity.dob)}" disabled>
                <select>
                    <option ${celebrity.gender === 'male' ? 'selected' : ''}>Male</option>
                    <option ${celebrity.gender === 'female' ? 'selected' : ''}>Female</option>
                    <option ${celebrity.gender === 'transgender' ? 'selected' : ''}>Transgender</option>
                    <option ${celebrity.gender === 'rather not say' ? 'selected' : ''}>Rather not say</option>
                    <option ${celebrity.gender === 'other' ? 'selected' : ''}>Other</option>
                </select>
                <input type="text" value="${celebrity.country}">
                <textarea>${celebrity.description}</textarea>
                <button class="save" disabled>Save</button>
                <button class="cancel">Cancel</button>
                <button class="delete">Delete</button>
            </div>
        `;

        celebrityItem.querySelector('.accordion-header')?.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== celebrityItem) {
                currentlyActive.classList.remove('active');
                (currentlyActive.querySelector('.accordion-content') as HTMLElement).style.display = 'none';
                (currentlyActive.querySelector('.toggle-icon') as HTMLElement).textContent = '+';
            }
            if (currentlyActive === celebrityItem) {
                celebrityItem.classList.toggle('active');
                const content = celebrityItem.querySelector('.accordion-content') as HTMLElement;
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
                (celebrityItem.querySelector('.toggle-icon') as HTMLElement).textContent = content.style.display === 'none' ? '+' : '-';
            } else {
                celebrityItem.classList.add('active');
                const content = celebrityItem.querySelector('.accordion-content') as HTMLElement;
                content.style.display = 'block';
                (celebrityItem.querySelector('.toggle-icon') as HTMLElement).textContent = '-';
            }
        });

        // Handle edit/save/cancel/delete logic here...

        celebrityList.appendChild(celebrityItem);
    });
}

function calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function isAdult(dob: string): boolean {
    return calculateAge(dob) >= 18;
}

renderCelebrities(celebrities);
