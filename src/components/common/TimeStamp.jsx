import moment from "moment/moment";

export const getTimeStamp=(timestamp)=>{

    return moment().format(timestamp);
}