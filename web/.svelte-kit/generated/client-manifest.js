export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8')];

export const server_loads = [];

export const dictionary = {
	"/": [3],
	"/about": [4],
	"/topic": [5],
	"/topic/new": [6],
	"/topic/[id]": [7,[2]],
	"/topic/[id]/[discussion_id]": [8,[2]]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};