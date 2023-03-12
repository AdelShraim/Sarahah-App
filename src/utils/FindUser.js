

const findUser = (users,userID) => {
    const userIndex = users.findIndex( user => user._id === userID);
    if(userID == -1) return {};

    return users[userIndex];
}

export default findUser;


