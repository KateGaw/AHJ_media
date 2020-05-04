const checkValidation = (arr) => {
    const regex = /^(\[?-?)(\d+\.\d+), ?(-|−)?(\d+\.\d+)(\]?)$/;
    return (regex.test(arr));
};

export default checkValidation;