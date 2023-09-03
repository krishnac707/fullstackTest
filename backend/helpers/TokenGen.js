import { v4 as uuidv4 } from 'uuid';
import UserTokenModal from '../modal/UserToken.modal.js';

export const HelperToken = async (next) => {
    // setInterval(async () => {
        var tempToken = uuidv4();
        console.log(tempToken);
        const generateToken = await UserTokenModal.findOneAndReplace({ token: tempToken })
        // generateToken.save();
        next;
    // }, 40000)
}