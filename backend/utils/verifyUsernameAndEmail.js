const { CheckUsernameAndEmail } = require("../repository/user.repository");

const verifyUsernameAndEmail = async (username, email) => {
  const data = await CheckUsernameAndEmail(username, email);
  if (data?.data?.length > 0) {
    return true;
  } else if (data?.data?.length === 0) {
    return false;
  } else {
    return { error: data.error };
  }
};
module.exports = verifyUsernameAndEmail;
