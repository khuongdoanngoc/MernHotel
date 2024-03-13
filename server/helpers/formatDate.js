const formatDate = (createdValue) => {
    const createdDate = new Date(createdValue);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return createdDate.toLocaleDateString("en-US", options);
};

module.exports = {
    formatDate
}