const bcrypt = require('bcrypt');
const saltRounds = 10;

export const HashPassWord = async (plainPassWord: string) => {
  try {
    const resultPassword = await bcrypt.hash(plainPassWord, saltRounds);
    return resultPassword;
  } catch (error) {
    console.log(error);
  }
};
