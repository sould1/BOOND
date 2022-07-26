export default class PhoneNumberTool {

    public hasCountryKey = (phoneNumber: string): boolean => {
        if (phoneNumber.substring(0, 3) === "+33") {
            return true;
        }
        else {
            return false;
        }
    }



    /* phone number is 0601076390
    if it starts by + 33 601076390 then keep only 601076390 */
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getPhoneNumberVariant = (phoneNumber: string): string => {
        const updated = phoneNumber.substring(3);
        return updated
    }
}