export const dateConverter = eventDate => {
    if (eventDate) {
        const date = new Date(eventDate);
        const dateDay =
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const dateMonth =
            date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
        const dateYear = date.getFullYear();
        return `${dateDay}.${dateMonth}.${dateYear}`;
    }
};
