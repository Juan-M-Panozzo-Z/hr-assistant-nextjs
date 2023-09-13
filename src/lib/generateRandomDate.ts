export const getRandomDate = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        0
    );
    const randomDay =
        Math.floor(
            Math.random() *
                (lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1)
        ) + firstDayOfMonth.getDate();

    const randomDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        randomDay
    );

    return randomDate.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};
