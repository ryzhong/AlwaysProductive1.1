import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.io) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status != "granted") {
                alert("We need permission to use your camera roll to set your profile picture");
            }
        }
    }
}

export default new UserPermissions();