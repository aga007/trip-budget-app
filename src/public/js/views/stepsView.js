import { elements } from './base';


export const toggleNavigation = () => {
    elements.sidebar.classList.toggle('steps__hidden');
    elements.steps.classList.toggle('steps__animated');
    elements.sidebar.classList.toggle('steps__active');
    elements.icon.classList.toggle('steps__icon--rotated');
}