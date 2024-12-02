export const getTrainUrl = (number: string) => `/train/${number}`;
export const getRouteUrl = (string: string) => `/route/${string}`;

export const getAdminUrl = (url: string) => `/${url}`;
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1);
